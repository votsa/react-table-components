import React, { PropTypes, Component } from 'react';
import { showDeprecatedMessage } from '../utils';

export default class PageSizeSelector extends Component {
  static defaultProps = {
    label: 'records per page',
    perPage: 10,
    controlClassName: '',
    pageSizeOptions: [5, 10, 50],
  }

  static propTypes = {
    onPageSizeChange: PropTypes.func, // deprecated
    onChangePageSize: PropTypes.func, // TODO: use required
    perPage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
    label: PropTypes.string,
    controlClassName: PropTypes.string,
  }

  constructor(props) {
    super(props);

    // TODO: cleanup
    if (typeof this.props.onPageSizeChange === 'function') {
      showDeprecatedMessage('onPageSizeChange is deprecated! Use onChangePageSize instead.');
    }
  }

  onChangePageSize = (e) => {
    const value = e.target.value;

    // TODO: cleanup
    if (typeof onPageSizeChange === 'function') {
      this.props.onPageSizeChange(value);
    } else {
      this.props.onChangePageSize(value);
    }
  }

  render() {
    const {
      controlClassName,
      label,
      pageSizeOptions,
      perPage,
    } = this.props;

    return (
      <div className="rtc-page-size-selector">
        <select
          id="page-size-selector"
          className={`rtc-page-size-selector-control ${controlClassName}`}
          onChange={this.onChangePageSize}
          value={perPage}
        >
          {pageSizeOptions.map((item) =>
            <option key={item.toString()} value={item}>{item}</option>)
          }
        </select>
        <label
          htmlFor="page-size-selector"
          className="rtc-page-size-selector-label"
        >
          {label}
        </label>
      </div>
    );
  }
}
