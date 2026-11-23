// Site-styled dropdowns. Phones and Macs draw a native <select> list in their own
// system font, so each .field select gets a look-alike menu in Cormorant Garamond.
// The real <select> stays in the form (hidden) so the value submits and the
// "required" check still works.
(function () {
  document.querySelectorAll('.field select').forEach(function (select, n) {
    var wrap = document.createElement('div');
    wrap.className = 'dd';
    select.parentNode.insertBefore(wrap, select);
    wrap.appendChild(select);
    select.tabIndex = -1;
    select.setAttribute('aria-hidden', 'true');

    var label = document.querySelector('label[for="' + select.id + '"]');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'dd-btn';
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    var listId = 'dd-list-' + n;
    btn.setAttribute('aria-controls', listId);
    if (label) { label.htmlFor = ''; label.addEventListener('click', function () { btn.focus(); }); btn.setAttribute('aria-label', label.textContent.replace('*', '').trim()); }

    var list = document.createElement('ul');
    list.className = 'dd-list';
    list.id = listId;
    list.setAttribute('role', 'listbox');
    var opts = Array.prototype.filter.call(select.options, function (o) { return o.value !== ''; });
    opts.forEach(function (o) {
      var li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.textContent = o.text;
      li.addEventListener('click', function () { choose(o); close(); btn.focus(); });
      li.addEventListener('mousemove', function () { setActive(opts.indexOf(o)); });
      list.appendChild(li);
    });
    wrap.appendChild(btn);
    wrap.appendChild(list);

    var active = -1;
    function render() {
      var sel = select.options[select.selectedIndex];
      btn.textContent = sel ? sel.text : '';
      btn.classList.toggle('placeholder', !select.value);
      Array.prototype.forEach.call(list.children, function (li, i) {
        li.setAttribute('aria-selected', String(opts[i].selected && !!select.value));
      });
    }
    function setActive(i) {
      active = i;
      Array.prototype.forEach.call(list.children, function (li, j) { li.classList.toggle('active', j === i); });
    }
    function choose(o) {
      select.value = o.value || o.text;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      render();
    }
    function open() {
      wrap.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      setActive(Math.max(0, opts.findIndex(function (o) { return o.selected && select.value; })));
    }
    function close() {
      wrap.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', function () { wrap.classList.contains('open') ? close() : open(); });
    btn.addEventListener('keydown', function (e) {
      var isOpen = wrap.classList.contains('open');
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen) return open();
        var d = e.key === 'ArrowDown' ? 1 : -1;
        setActive((active + d + opts.length) % opts.length);
      } else if ((e.key === 'Enter' || e.key === ' ') && isOpen) {
        e.preventDefault();
        if (active > -1) choose(opts[active]);
        close();
      } else if (e.key === 'Escape' || e.key === 'Tab') {
        close();
      }
    });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) close(); });
    // the browser's "please choose" bubble targets the hidden select; send focus to the button
    select.addEventListener('invalid', function () { setTimeout(function () { btn.focus(); }, 0); });
    select.addEventListener('focus', function () { btn.focus(); });
    render();
  });
})();
