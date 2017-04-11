/* eslint-disable */

// Closest polyfil
(function(root) {
  if (root.Element && !root.Element.prototype.closest) {
    root.Element.prototype.closest = function closest(s) {
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
})(window);

// Ignore case and trim whitespaces
export const ignoreCase = value => value.toUpperCase().trim();
