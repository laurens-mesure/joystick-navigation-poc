/* eslint-disable */
// @ts-ignore
export function debounce(func, wait, immediate = undefined) {
  // @ts-ignore
  var timeout;

  return function executedFunction() {
    // @ts-ignore
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    // @ts-ignore
    var callNow = immediate && !timeout;

    // @ts-ignore
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
