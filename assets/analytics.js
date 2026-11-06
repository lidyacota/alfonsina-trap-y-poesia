(function () {
  'use strict';

  var measurementId = 'G-L5J8YSY7TC';
  var project = 'alfonsina-trap-y-poesia';
  var cookiePrefix = 'alfonsina';
  var cookiePath = '/' + project + '/';
  var storageKey = project + ':analytics-consent:v1';
  var widgetId = project + '-analytics';
  var validId = /^G-[A-Z0-9]{6,15}$/.test(measurementId);
  var loaded = false;
  var panel;
  var launcher;
  var status;
  var choice = readChoice();
  var english = /^en(?:-|$)/i.test(document.documentElement.lang || '');
  var words = english ? {
    title: 'Visitor statistics',
    text: 'Google Analytics uses cookies to count visits to this work and understand which pages are viewed. You choose whether to allow these statistics.',
    change: 'You can change your choice using “Statistics”.',
    accept: 'Accept statistics', reject: 'Reject statistics',
    launcher: 'Statistics', close: 'Close preferences',
    privacy: 'Google privacy', optout: 'Google opt-out tool',
    granted: 'Statistics are currently enabled.', denied: 'Statistics are currently disabled.'
  } : {
    title: 'Estadísticas de visitas',
    text: 'Google Analytics usa cookies para contar visitas a esta obra y conocer qué páginas se consultan. Tú decides si permites estas estadísticas.',
    change: 'Puedes cambiar tu elección en «Estadísticas».',
    accept: 'Aceptar estadísticas', reject: 'Rechazar estadísticas',
    launcher: 'Estadísticas', close: 'Cerrar preferencias',
    privacy: 'Privacidad de Google', optout: 'Herramienta de inhabilitación de Google',
    granted: 'Las estadísticas están activadas.', denied: 'Las estadísticas están desactivadas.'
  };

  if (validId) window['ga-disable-' + measurementId] = choice !== 'granted';

  function readChoice() {
    var stored;
    // A tab-level fallback is newer than an older local choice when local writes failed.
    try { stored = window.sessionStorage.getItem(storageKey); } catch (error) { /* Storage may be blocked. */ }
    if (stored !== 'granted' && stored !== 'denied') {
      try { stored = window.localStorage.getItem(storageKey); } catch (error) { /* Use memory for this page. */ }
    }
    return stored === 'granted' || stored === 'denied' ? stored : null;
  }

  function saveChoice(value) {
    choice = value;
    try {
      window.localStorage.setItem(storageKey, value);
      try { window.sessionStorage.removeItem(storageKey); } catch (error) { /* Optional cleanup. */ }
      return;
    } catch (error) { /* Fall back to this tab's storage. */ }
    try { window.sessionStorage.setItem(storageKey, value); } catch (error) { /* The current page still respects the choice. */ }
  }

  function startAnalytics() {
    // Local previews and incomplete configurations never send visits to Google.
    if (loaded || !validId || window.location.hostname !== 'lidyacota.github.io') return;
    loaded = true;
    window['ga-disable-' + measurementId] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_domain: window.location.hostname,
      cookie_path: cookiePath,
      cookie_prefix: cookiePrefix,
      cookie_flags: 'SameSite=Lax;Secure'
    });
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(tag);
  }

  function clearAnalyticsCookies() {
    var names;
    try { names = document.cookie.split(';'); } catch (error) { return; }
    names.forEach(function (part) {
      var name = part.trim().split('=')[0];
      if (name !== cookiePrefix + '_ga' && name.indexOf(cookiePrefix + '_ga_') !== 0) return;
      ['', '; Domain=' + window.location.hostname].forEach(function (domain) {
        try {
          document.cookie = name + '=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=' + cookiePath + domain + '; SameSite=Lax; Secure';
        } catch (error) { /* Some browser privacy modes block cookie access. */ }
      });
    });
  }

  function stopAnalytics() {
    if (validId) window['ga-disable-' + measurementId] = true;
    clearAnalyticsCookies();
    // Reloading removes the previously loaded Google library after consent is withdrawn.
    if (loaded) window.location.reload();
  }

  function element(tag, text) {
    var node = document.createElement(tag);
    if (text) node.textContent = text;
    return node;
  }

  function updateStatus() {
    if (status) status.textContent = choice === 'granted' ? words.granted : choice === 'denied' ? words.denied : '';
  }

  function closePanel(returnFocus) {
    panel.hidden = true;
    launcher.hidden = false;
    launcher.setAttribute('aria-expanded', 'false');
    if (returnFocus) launcher.focus();
  }

  function mount() {
    if (document.getElementById(widgetId)) return;
    var style = element('style');
    style.textContent =
      '#' + widgetId + '{position:fixed;right:14px;bottom:14px;z-index:2147483000;max-width:calc(100vw - 28px);font:normal 14px/1.45 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;letter-spacing:normal;text-align:left;color:#202124;}' +
      '#' + widgetId + ' *{box-sizing:border-box;}' +
      '#' + widgetId + ' [hidden]{display:none!important;}' +
      '#' + widgetId + ' .lc-stats-panel{position:relative;width:370px;max-width:100%;max-height:calc(100dvh - 28px);overflow:auto;padding:18px;background:#fff;color:#202124;border:1px solid #c7cbd1;border-radius:10px;box-shadow:0 4px 22px #0003;}' +
      '#' + widgetId + ' h2{margin:0 26px 10px 0;font:700 16px/1.3 system-ui,sans-serif;text-transform:none;letter-spacing:normal;color:#202124;}' +
      '#' + widgetId + ' p{margin:0 0 10px;font:inherit;color:#202124;}' +
      '#' + widgetId + ' .lc-stats-links{font-size:12px;margin-bottom:12px;}' +
      '#' + widgetId + ' a{color:#174ea6;font:inherit;text-decoration:underline;letter-spacing:normal;text-transform:none;}' +
      '#' + widgetId + ' .lc-stats-actions{display:flex;gap:8px;}' +
      '#' + widgetId + ' button{appearance:none;margin:0;min-height:36px;padding:8px 11px;border:1px solid #6d7580;border-radius:6px;background:#fff;color:#202124;box-shadow:none;font:600 13px/1.25 system-ui,sans-serif;letter-spacing:normal;text-transform:none;cursor:pointer;}' +
      '#' + widgetId + ' .lc-stats-actions button{flex:1;}' +
      '#' + widgetId + ' button:hover{background:#eef2f7;}' +
      '#' + widgetId + ' button:focus-visible,#' + widgetId + ' a:focus-visible{outline:3px solid #1a73e8;outline-offset:3px;}' +
      '#' + widgetId + ' .lc-stats-close{position:absolute;top:8px;right:8px;width:30px;min-height:30px;padding:2px;border:0;font-size:22px;font-weight:400;}' +
      '#' + widgetId + ' .lc-stats-launcher{box-shadow:0 2px 10px #0002;font-size:12px;}' +
      '#' + widgetId + ' .lc-stats-status{font-size:12px;}' +
      '@media(max-width:420px){#' + widgetId + '{right:8px;bottom:8px;max-width:calc(100vw - 16px);}#' + widgetId + ' .lc-stats-panel{padding:15px;}}';
    document.head.appendChild(style);
    var host = element('div');
    host.id = widgetId;
    panel = element('section');
    panel.id = widgetId + '-panel';
    panel.className = 'lc-stats-panel';
    panel.setAttribute('aria-labelledby', widgetId + '-title');
    var title = element('h2', words.title);
    title.id = widgetId + '-title';
    title.tabIndex = -1;
    panel.appendChild(title);
    panel.appendChild(element('p', words.text));
    panel.appendChild(element('p', words.change));
    var links = element('p');
    links.className = 'lc-stats-links';
    [[words.privacy, 'https://policies.google.com/privacy'], [words.optout, 'https://tools.google.com/dlpage/gaoptout']].forEach(function (item, index) {
      if (index) links.appendChild(document.createTextNode(' · '));
      var link = element('a', item[0]);
      link.href = item[1];
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      links.appendChild(link);
    });
    panel.appendChild(links);
    status = element('p');
    status.className = 'lc-stats-status';
    panel.appendChild(status);
    updateStatus();
    var actions = element('div');
    actions.className = 'lc-stats-actions';
    var accept = element('button', words.accept);
    accept.type = 'button';
    accept.addEventListener('click', function () {
      saveChoice('granted');
      updateStatus();
      closePanel(true);
      startAnalytics();
    });
    var reject = element('button', words.reject);
    reject.type = 'button';
    reject.addEventListener('click', function () {
      saveChoice('denied');
      updateStatus();
      closePanel(true);
      stopAnalytics();
    });
    actions.appendChild(accept);
    actions.appendChild(reject);
    panel.appendChild(actions);
    var close = element('button', '×');
    close.type = 'button';
    close.className = 'lc-stats-close';
    close.setAttribute('aria-label', words.close);
    close.addEventListener('click', function () { closePanel(true); });
    panel.appendChild(close);
    panel.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') { event.preventDefault(); closePanel(true); }
    });
    launcher = element('button', words.launcher);
    launcher.type = 'button';
    launcher.className = 'lc-stats-launcher';
    launcher.setAttribute('aria-controls', panel.id);
    launcher.setAttribute('aria-expanded', choice ? 'false' : 'true');
    launcher.addEventListener('click', function () {
      updateStatus();
      panel.hidden = false;
      launcher.hidden = true;
      launcher.setAttribute('aria-expanded', 'true');
      title.focus();
    });
    panel.hidden = !!choice;
    launcher.hidden = !choice;
    host.appendChild(panel);
    host.appendChild(launcher);
    document.body.appendChild(host);
  }

  window.addEventListener('storage', function (event) {
    if (event.key !== storageKey || (event.newValue !== 'granted' && event.newValue !== 'denied')) return;
    // A newer choice made in another tab replaces any previous fallback here.
    try { window.sessionStorage.removeItem(storageKey); } catch (error) { /* Current page still respects the event. */ }
    choice = event.newValue;
    updateStatus();
    if (panel) closePanel(false);
    if (choice === 'granted') startAnalytics(); else stopAnalytics();
  });

  if (choice === 'granted') startAnalytics();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
}());
