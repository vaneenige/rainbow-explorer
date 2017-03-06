import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { bindActions } from './../util';
import reduce from './../reducers';
import * as actions from './../actions';

import CollectionItem from './CollectionItem';

@connect(reduce, bindActions(actions))
export default class CollectionModal extends Component {
  shouldComponentUpdate({ collection, colors }) {
    return collection !== this.props.collection || colors !== this.props.colors;
  }

  removeColor = (color) => {
    this.props.removeColor(color);
  }

  render({ collection, colors }) {
    return (
      <ul id="modal" className={collection ? 'opened' : ''}>
        {colors.map(color => (
          <CollectionItem key={color.id} color={color} onRemove={this.removeColor} />
        ))}
      </ul>
    );
  }
}
