import React, { PropTypes, Component } from 'react';
import { showDeprecatedMessage } from '../utils';

export default class ColumnsVisibility extends Component {
  static defaultProps = {
    btnClassName: '',
    iconClassName: '',
    btnText: 'Columns',
    footer: null,
    useAlphabeticalOrder: false,
  }

  static propTypes = {
    btnClassName: PropTypes.string,
    btnText: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    iconClassName: PropTypes.string,
    footer: PropTypes.object,
    useAlphabeticalOrder: PropTypes.bool,
    onToggleColumnsVisibility: PropTypes.func,  // deprecated
    onToggleColumnVisibility: PropTypes.func, // TODO: use required
  }

  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    // TODO: cleanup
    if (typeof this.props.onToggleColumnsVisibility === 'function') {
      showDeprecatedMessage('onToggleColumnsVisibility is deprecated! Use onToggleColumnVisibility instead.');
    }
  }

  componentWillMount() {
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleOutsideClick = (e) => {
    if (!this.node.contains(e.target)) {
      this.toggleVisibility(false);
    }
  }

  handleClick = () => {
    this.toggleVisibility();
  }

  toggleVisibility = (flag) => {
    this.setState((state) => ({
      active: (typeof flag !== 'undefined') ? flag : !state.active,
    }));
  }

  toggleColumnVisibility = (colId) => () => {
    // TODO: cleanup
    if (typeof this.props.onToggleColumnsVisibility === 'function') {
      this.props.onToggleColumnsVisibility(colId);
    } else {
      this.props.onToggleColumnVisibility(colId);
    }
  }

  render() {
    const {
      columns,
      btnClassName,
      iconClassName,
      btnText,
      footer,
      useAlphabeticalOrder,
    } = this.props;

    const columnsArray = [].concat(columns);

    if (useAlphabeticalOrder) {
      columnsArray.sort((a, b) => a.title > b.title);
    }

    return (
      <div
        className={`rtc-columns-visibility-container ${this.state.active ? 'active' : ''}`}
        ref={(node) => { this.node = node; }}
      >
        <button
          className={`${btnClassName} ${this.state.active ? 'active' : ''}`}
          onClick={this.handleClick}
        >
          {iconClassName && <span className={iconClassName} />} {btnText}
        </button>
        <div className="rtc-columns-visibility-popup">
          {columnsArray.map((col) => {
            if (col.alwaysVisible) {
              return null;
            }

            return (
              <div className="checkbox" key={col.id}>
                <label htmlFor={`col-visibility-${col.id}`}>
                  <input
                    type="checkbox"
                    checked={col.visible}
                    onChange={this.toggleColumnVisibility(col.id)}
                    id={`col-visibility-${col.id}`}
                  /> {col.title}
                </label>
              </div>
            );
          })}

          {footer &&
            <div>{footer}</div>
          }
        </div>
      </div>
    );
  }
}
