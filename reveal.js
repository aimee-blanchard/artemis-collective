// When the page opens, every text block fades in and drifts up into place,
// one after another from top to bottom (no waiting for scroll).
// Blocks start hidden from the first paint (via the `js` class set in <head> and the
// .js rule in style.css); this script only adds `.in` to bring each one up.
window.__reveal = true; // tells the safety net in <head> this script ran
(function () {
  var SEL = '.lede > :not(.lede-end), .lede-end > *, .aside > *, .offer details, .inquiry > *, .band';
  var items = Array.prototype.slice.call(document.querySelectorAll(SEL));
  items.forEach(function (el, i) {
    setTimeout(function () { el.classList.add('in'); }, 150 + i * 110);
  });
})();
