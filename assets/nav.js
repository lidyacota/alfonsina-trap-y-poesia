(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var body = document.body;
  var burger = header.querySelector('.nav-toggle');
  var closeBtn = header.querySelector('.nav-close');
  var scrim = header.querySelector('.nav-scrim');
  var menu = header.querySelector('.tracks-menu');
  var toggle = header.querySelector('.tracks-toggle');
  var desktop = window.matchMedia('(min-width: 768px)');

  function setDrawer(open) {
    body.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', String(open));
    if (open) closeBtn.focus();
  }
  function syncToggle() {
    var expanded = desktop.matches ? menu.classList.contains('open') : !menu.classList.contains('collapsed');
    toggle.setAttribute('aria-expanded', String(expanded));
  }
  function closeDropdown() {
    if (menu.classList.contains('open')) { menu.classList.remove('open'); syncToggle(); }
  }

  burger.addEventListener('click', function () { setDrawer(true); });
  closeBtn.addEventListener('click', function () { setDrawer(false); burger.focus(); });
  scrim.addEventListener('click', function () { setDrawer(false); });
  toggle.addEventListener('click', function () {
    menu.classList.toggle(desktop.matches ? 'open' : 'collapsed');
    syncToggle();
  });
  menu.addEventListener('mouseleave', function () { if (desktop.matches) closeDropdown(); });
  document.addEventListener('click', function (e) { if (desktop.matches && !menu.contains(e.target)) closeDropdown(); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (body.classList.contains('nav-open')) { setDrawer(false); burger.focus(); }
    if (menu.classList.contains('open')) { closeDropdown(); toggle.focus(); }
  });
  var onChange = function () { setDrawer(false); menu.classList.remove('open'); syncToggle(); };
  if (desktop.addEventListener) desktop.addEventListener('change', onChange); else desktop.addListener(onChange);
  syncToggle();
})();

/* Video de Alfonsina antes de los créditos: se carga solo cuando está por aparecer en pantalla */
(function () {
  var videos = document.querySelectorAll('video[data-lazy-video]');
  if (!videos.length) return;
  function load(v) {
    if (v.dataset.loaded) return;
    v.dataset.loaded = '1';
    if (v.dataset.poster) v.poster = v.dataset.poster;
    v.querySelectorAll('source[data-src]').forEach(function (s) { s.src = s.dataset.src; });
    v.load();
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }
  if (!('IntersectionObserver' in window)) { videos.forEach(load); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { load(e.target); io.unobserve(e.target); } });
  }, { rootMargin: '400px 0px' });
  videos.forEach(function (v) { io.observe(v); });
})();
