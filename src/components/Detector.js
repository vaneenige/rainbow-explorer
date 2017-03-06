import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import polyfill from './../polyfill/adapter-latest';

import { bindActions } from './../util';
import reduce from './../reducers';
import * as actions from './../actions';

@connect(reduce, bindActions(actions))
export default class Detector extends Component {
  static rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  componentDidMount() {
    this.getUserMedia();
  }

  shouldComponentUpdate = ({ collection }) => {
    if (collection) {
      this.video.pause();
    } else {
      this.video.play();
    }
    return false;
  };

  getUserMedia() {
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }

    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = (constraints) => {
        const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        return new Promise((resolve, reject) => {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1200 },
        height: { ideal: 1920 },
        facingMode: { exact: 'environment' },
        frameRate: { ideal: 60, max: 60 },
      },
    }).then((stream) => {
      if ('srcObject' in this.video) {
        this.video.srcObject = stream;
      } else {
        this.video.src = window.URL.createObjectURL(stream);
      }
      this.video.onloadedmetadata = (e) => {
        this.video.play();
        this.userMediaLoaded();
      };
    });
  }

  userMediaLoaded() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.video.clientWidth;
    this.canvas.height = this.video.clientHeight;
    this.canvasContext = this.canvas.getContext('2d');
    this.video.onprogress = () => {
      this.detect();
    };
  }

  detect() {
    this.canvasContext.drawImage(this.video, 0, 0, this.video.clientWidth, this.video.clientHeight);
    const data = this.canvasContext.getImageData(this.video.clientWidth / 2, this.video.clientHeight / 2, 1, 1);
    const hex = Detector.rgbToHex(data.data[0], data.data[1], data.data[2]);
    this.props.currentColor(hex);
  }

  snap = () => {
    this.props.addColor(this.props.current);
  }

  render({ current }) {
    return (
      <div id="detector">
        <button onClick={this.snap}>Button</button>
        <span>Tap to save</span>
        <video ref={(video) => { this.video = video; }} />
      </div>
    );
  }
}
