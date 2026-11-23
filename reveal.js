// Text blocks fade in and drift up into place as they scroll into view.
// They start hidden from the first paint (via the `js` class set in <head> and the
// .js rule in style.css); this script only adds `.in` to bring each one up.
// Blocks already on screen when the page opens rise in one after another.
window.__reveal = true; // tells the safety net in <head> this script ran
(function () {
  var SEL = '.lede > :not(.lede-end), .lede-end > *, .aside > *, .offer details, .inquiry > *, .band';
  var items = document.querySelectorAll(SEL);
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var queue = [], timer = null;
  function flush() {
    var el = queue.shift();
    if (el) el.classList.add('in');
    timer = queue.length ? setTimeout(flush, 130) : null; // gentle stagger
  }
  var io = new IntersectionObserver(function (entries) {
    entries
      .filter(function (e) { return e.isIntersecting; })
      .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left; })
      .forEach(function (e) { io.unobserve(e.target); queue.push(e.target); });
    if (!timer && queue.length) timer = setTimeout(flush, 150);
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 });
  items.forEach(function (el) { io.observe(el); });
  // anything that can never scroll into view (hidden fields) should not stay invisible
  setTimeout(function () { items.forEach(function (el) { if (!el.offsetParent) el.classList.add('in'); }); }, 0);
})();
