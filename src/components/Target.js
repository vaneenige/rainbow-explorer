import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { bindActions } from './../util';
import reduce from './../reducers';
import * as actions from './../actions';

@connect(reduce, bindActions(actions))
export default class Target extends Component {
  shouldComponentUpdate({ current }) {
    return current !== this.props.current;
  }

  render({ current }) {
    const style = {
      backgroundColor: current,
    };
    return (
      <div id="dot" style={style} />
    );
  }
}
