import React, { PropTypes, Component } from 'react';
import debounce from 'lodash/debounce';

const fireEvent = debounce(callback => callback(), 200);

export default class SearchField extends Component {
  static defaultProps = {
    label: 'Search:',
    value: '',
    className: '',
    controlClassName: '',
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    filterKey: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    controlClassName: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  onChange = (e) => {
    const { onChange, filterKey } = this.props;
    const value = e.target.value;

    this.setState({
      value,
    });

    fireEvent(() => onChange(filterKey, value));
  }

  render() {
    const { label, className, controlClassName } = this.props;

    return (
      <div className={`rtc-search-field ${className}`}>
        {label &&
          <label htmlFor="search-field" className="rtc-search-field-label">{label}</label>
        }
        <input
          id="search-field"
          type="search"
          className={`rtc-search-field-label ${controlClassName}`}
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
