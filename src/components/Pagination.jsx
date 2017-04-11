import React, { PropTypes, Component } from 'react';

const cancelEvent = e => e.preventDefault();

export default class Pagination extends Component {
  static defaultProps = {
    showPages: 5,
    perPage: 10,
    currentPage: 0,
    className: '',
    btnClassName: '',
    btnActiveClassName: '',
    prevBtnComponent: <span className="fa fa-angle-left" />,
    nextBtnComponent: <span className="fa fa-angle-right" />,
  }

  static propTypes = {
    onChangePage: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    showPages: PropTypes.number,
    className: PropTypes.string,
    btnClassName: PropTypes.string,
    btnActiveClassName: PropTypes.string,
    prevBtnComponent: PropTypes.element,
    nextBtnComponent: PropTypes.element,
  }

  shouldComponentUpdate(nextProps) {
    return this.props.total !== nextProps.total ||
      this.props.perPage !== nextProps.perPage ||
      this.props.currentPage !== nextProps.currentPage ||
      this.props.showPages !== nextProps.showPages;
  }

  onChangePage = (pageNumber, e) => {
    e.preventDefault();

    this.props.onChangePage(pageNumber);
  }

  render() {
    const {
      total, perPage, showPages, currentPage,
      btnClassName, btnActiveClassName, prevBtnComponent, nextBtnComponent,
    } = this.props;

    if (total === 0) {
      return null;
    }

    const totalPages = Math.ceil(total / perPage);
    const diff = Math.floor(showPages / 2);
    let start = Math.max(currentPage - diff, 0);
    const end = Math.min(start + showPages, totalPages);
    let buttons = [];
    let btnEvent;
    let isCurrent;
    let btnClass;

    if (totalPages >= showPages && end >= totalPages) {
      start = totalPages - showPages;
    }

    for (let i = start; i < end; i++) {
      isCurrent = currentPage === i;
      if (isCurrent) {
        btnEvent = cancelEvent;
      } else {
        btnEvent = e => this.onChangePage(i, e);
      }

      btnClass = btnClassName || '';

      if (isCurrent) {
        btnClass += ` ${btnActiveClassName}`;
        btnClass = btnClass.trim();
      }

      buttons.push(
        <li key={i} className={isCurrent ? 'active' : null}>
          <a
            href={undefined}
            onClick={btnEvent}
            className={btnClass || null}
            tabIndex="0"
          >
            <span>{i + 1}</span>
            {isCurrent ? <span className="sr-only">(current)</span> : null}
          </a>
        </li>,
      );
    }

    const isNotFirst = currentPage > 0;
    const isNotLast = currentPage < totalPages - 1;
    const firstHandler = isNotFirst ? e => this.onChangePage(0, e) : cancelEvent;
    const prevHandler = isNotFirst ? e => this.onChangePage(currentPage - 1, e) : cancelEvent;
    const nextHandler = isNotLast ? e => this.onChangePage(currentPage + 1, e) : cancelEvent;
    const lastHandler = isNotLast ? e => this.onChangePage(totalPages - 1, e) : cancelEvent;

    if (start >= diff) {
      buttons = [
        <li key="dotsFirst" className={!isNotFirst ? 'disabled' : null}>
          <a
            href={undefined}
            onClick={prevHandler}
            className={btnClassName || null}
            tabIndex="0"
          >
            ...
          </a>
        </li>,
      ].concat(buttons);
    }

    if (end > showPages) {
      buttons = [
        <li key="first" className={!isNotFirst ? 'disabled' : null}>
          <a
            href={undefined}
            onClick={firstHandler}
            className={btnClassName || null}
            tabIndex="0"
          >
            1
          </a>
        </li>,
      ].concat(buttons);
    }

    buttons = [
      <li key="prev" className={!isNotFirst ? 'disabled' : null}>
        <a
          href={undefined}
          onClick={prevHandler}
          className={btnClassName || null}
          tabIndex="0"
        >
          {prevBtnComponent}
        </a>
      </li>,
    ].concat(buttons);

    if (end <= totalPages - diff) {
      buttons = buttons.concat([
        <li key="dotsLast" className={!isNotLast ? 'disabled' : null}>
          <a
            href={undefined}
            onClick={nextHandler}
            className={btnClassName || null}
            tabIndex="0"
          >
            ...
          </a>
        </li>,
      ]);
    }

    if (end !== totalPages) {
      buttons = buttons.concat([
        <li key="last" className={!isNotLast ? 'disabled' : null}>
          <a
            href={undefined}
            onClick={lastHandler}
            className={btnClassName || null}
            tabIndex="0"
          >
            {totalPages}
          </a>
        </li>,
      ]);
    }

    buttons = buttons.concat([
      <li key="next" className={!isNotLast ? 'disabled' : null}>
        <a
          href={undefined}
          onClick={nextHandler}
          className={btnClassName || null}
          tabIndex="0"
        >
          {nextBtnComponent}
        </a>
      </li>,
    ]);

    return (
      <ul className={this.props.className}>
        {buttons}
      </ul>
    );
  }
}
