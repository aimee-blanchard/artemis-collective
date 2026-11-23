// Text blocks fade in and drift up into place as they scroll into view.
// Blocks already on screen when the page opens rise in one after another.
(function () {
  var items = document.querySelectorAll('.lede, .aside, .offer details, .inquiry > *, .band');
  if (!('IntersectionObserver' in window)) return;
  items.forEach(function (el) { el.classList.add('reveal'); });

  var queue = [], timer = null;
  function flush() {
    var el = queue.shift();
    if (el) el.classList.add('in');
    timer = queue.length ? setTimeout(flush, 140) : null; // gentle stagger
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      queue.push(e.target);
    });
    if (!timer) flush();
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();
