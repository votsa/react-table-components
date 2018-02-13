import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { showDeprecatedMessage } from '../utils';
import { CLASS_NAMES } from '../constants';

export default class PageSizeSelector extends Component {
  static defaultProps = {
    className: '',
    labelClassName: '',
    label: 'records per page',
    perPage: 10,
    controlClassName: '',
    pageSizeOptions: [5, 10, 50],
    onPageSizeChange: null,
    onChangePageSize: null,
  }

  static propTypes = {
    className: PropTypes.string,
    labelClassName: PropTypes.string,
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

  handleChangePageSize = (e) => {
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
      className,
      labelClassName,
      controlClassName,
      label,
      pageSizeOptions,
      perPage,
    } = this.props;

    return (
      <div className={`${CLASS_NAMES.PAGE_SIZE_SELECTOR} ${className}`}>
        <select
          id="page-size-selector"
          className={`${CLASS_NAMES.PAGE_SIZE_SELECTOR_CONTROL} ${controlClassName}`}
          onChange={this.handleChangePageSize}
          value={perPage}
        >
          {pageSizeOptions.map((item) =>
            <option key={item.toString()} value={item}>{item}</option>)
          }
        </select>
        <label
          htmlFor="page-size-selector"
          className={`${CLASS_NAMES.PAGE_SIZE_SELECTOR_LABEL} ${labelClassName}`}
        >
          {label}
        </label>
      </div>
    );
  }
}
