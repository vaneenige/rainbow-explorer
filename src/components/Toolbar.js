import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { bindActions } from './../util';
import reduce from './../reducers';
import * as actions from './../actions';

@connect(reduce, bindActions(actions))
export default class Toolbar extends Component {
  shouldComponentUpdate({ collection, colors }) {
    return collection !== this.props.collection || colors !== this.props.colors;
  }

  toggleCollection = () => {
    this.props.setCollection(!this.props.collection);
  }

  render({ collection, colors }) {
    const lastColor = colors[colors.length - 1];
    const defaultColor = (lastColor === undefined) ? '#A069FF' : lastColor.color;
    document.querySelector('[name=theme-color]').setAttribute('content', defaultColor);
    const style = {
      color: collection ? 'black' : 'white',
      background: collection ? 'white' : defaultColor,
    };
    const openStyle = {
      display: collection ? 'none' : 'block',
    };
    const closeStyle = {
      display: collection ? 'block' : 'none',
    };
    const countStyle = {
      display: collection ? 'none' : 'block',
      opacity: colors.length ? 1 : 0,
    };
    return (
      <div id="toolbar" style={style}>
        <span>{collection ? 'Collection' : 'Rainbow Explorer'}</span>
        <svg onClick={this.toggleCollection} fill={collection ? '#000000' : '#FFFFFF'} height="24" width="24" viewBox="0 0 24 24">
          <path style={openStyle} d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z" />
          <path style={closeStyle} d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
        <div className="count" style={countStyle}>{colors.length}</div>
      </div >
    );
  }
}
