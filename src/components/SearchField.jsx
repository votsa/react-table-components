import React, { PropTypes, Component } from 'react';
import debounce from 'lodash/debounce';

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
      <div className={`rtc-search-field ${className} ${value ? activeClassName : ''}`}>
        {label &&
          <label htmlFor="search-field" className={`rtc-search-field_label ${labelClassName}`}>
            {label}
          </label>
        }
        <input
          id="search-field"
          type="search"
          className={`rtc-search-field_control ${controlClassName}`}
          value={value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
