/* eslint-disable */

// Closest polyfil
if (Element && !Element.prototype.closest) {
  Element.prototype.closest = function closest(s) {
    const matches = (this.document || this.ownerDocument).querySelectorAll(s);
    let i;
    let el = this;

    do {
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== el) {}
    } while ((i < 0) && (el = el.parentElement));

    return el;
  };
}

// Ignore case and trim whitespaces
export const ignoreCase = value => value.toUpperCase().trim();
