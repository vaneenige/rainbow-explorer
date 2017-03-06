import { h, Component } from 'preact';

export default class CollectionItem extends Component {
  shouldComponentUpdate({ color, onRemove }) {
    return color !== this.props.color || onRemove !== this.props.onRemove;
  }

  remove = () => {
    const { onRemove, color } = this.props;
    onRemove(color);
  };

  render({ color }) {
    const style = {
      background: color.color,
    };
    return (
      <li style={style}>
        {color.color}
        <svg onClick={this.remove} fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
      </li >
    );
  }
}
