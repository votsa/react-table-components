import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { CLASS_NAMES } from '../constants';

const debouncedEvent = debounce((callback) => callback(), 200);

export default class SearchField extends Component {
  static defaultProps = {
    label: 'Search:',
    value: '',
    className: '',
    controlClassName: '',
    labelClassName: '',
    activeClassName: 'active',
    filterKey: 'globalSearch',
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    filterKey: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    controlClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    activeClassName: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  handleChange = (e) => {
    const {
      onChange,
      filterKey,
    } = this.props;

    const value = e.target.value;

    this.setState({
      value,
    });

    debouncedEvent(() => onChange(filterKey, value));
  }

  render() {
    const {
      label,
      className,
      controlClassName,
      labelClassName,
      activeClassName,
    } = this.props;

    const { value } = this.state;

    return (
      <div className={`${CLASS_NAMES.SEARCH_FIELD} ${className} ${value ? activeClassName : ''}`}>
        {label &&
          <label
            htmlFor="search-field"
            className={`${CLASS_NAMES.SEARCH_FIELD_LABEL} ${labelClassName}`}
          >
            {label}
          </label>
        }
        <input
          id="search-field"
          type="search"
          className={`${CLASS_NAMES.SEARCH_FIELD_CONTROL} ${controlClassName}`}
          value={value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
