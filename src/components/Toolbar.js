import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { bindActions } from './../util';
import reduce from './../reducers';
import * as actions from './../actions';

@connect(reduce, bindActions(actions))
export default class Toolbar extends Component {
  shouldComponentUpdate({ collection, colors, facingMode, multipleVideoSources }) {
    return collection !== this.props.collection
      || colors !== this.props.colors
      || facingMode !== this.props.facingMode
      || multipleVideoSources !== this.props.multipleVideoSources;
  }

  toggleCollection = () => {
    this.props.setCollection(!this.props.collection);
  }

  toggleFacingMode = () => {
    this.props.setFacingMode(!this.props.facingMode);
  }

  blockStyle = show => ({
    display: show ? 'block' : 'none',
  })

  render({ collection, colors, facingMode, multipleVideoSources }) {
    const lastColor = colors[colors.length - 1];
    const defaultColor = (lastColor === undefined) ? '#A069FF' : lastColor.color;
    document.querySelector('[name=theme-color]').setAttribute('content', defaultColor);
    const style = {
      color: collection ? 'black' : 'white',
      background: collection ? 'white' : defaultColor,
    };
    const countStyle = {
      display: collection ? 'none' : 'block',
      opacity: colors.length ? 1 : 0,
    };
    return (
      <div id="toolbar" style={style}>
        <span>{collection ? 'Collection' : 'Rainbow Explorer'}</span>
        <svg onClick={this.toggleCollection} fill={collection ? '#000000' : '#FFFFFF'} height="24" width="24" viewBox="0 0 24 24">
          <path style={this.blockStyle(!collection)} d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z" />
          <path style={this.blockStyle(collection)} d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
        <svg onClick={this.toggleFacingMode} style={this.blockStyle(multipleVideoSources)} fill="#FFFFFF" height="24" width="24" viewBox="0 0 24 24">
          <path style={this.blockStyle(facingMode)} d="M10 20H5v2h5v2l3-3-3-3v2zm4 0v2h5v-2h-5zM12 8c1.1 0 2-.9 2-2s-.9-2-2-2-1.99.9-1.99 2S10.9 8 12 8zm5-8H7C5.9 0 5 .9 5 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zM7 2h10v10.5c0-1.67-3.33-2.5-5-2.5s-5 .83-5 2.5V2z" />
          <path style={this.blockStyle(!facingMode)} d="M10 20H5v2h5v2l3-3-3-3v2zm4 0v2h5v-2h-5zm3-20H7C5.9 0 5 .9 5 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm-5 6c-1.11 0-2-.9-2-2s.89-2 1.99-2 2 .9 2 2C14 5.1 13.1 6 12 6z" />
        </svg>
        <div className="count" style={countStyle}>{colors.length}</div>
      </div >
    );
  }
}
