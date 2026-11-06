(function () {
  'use strict';

  var measurementId = 'G-L5J8YSY7TC';
  var project = 'alfonsina-trap-y-poesia';
  var cookiePrefix = 'alfonsina';
  var cookiePath = '/' + project + '/';
  var storageKey = project + ':analytics-consent:v1';
  var disableKey = 'ga-disable-' + measurementId;
  var loaded = false;
  var denied = hasStoredDenial();

  window[disableKey] = denied;

  function readStoredChoice(storageName) {
    try { return window[storageName].getItem(storageKey); }
    catch (error) { return null; }
  }

  function hasStoredDenial() {
    // Preserve an earlier rejection, including a newer tab fallback after a failed local write.
    return readStoredChoice('sessionStorage') === 'denied' ||
      readStoredChoice('localStorage') === 'denied';
  }

  function startAnalytics() {
    if (denied || loaded || !/^G-[A-Z0-9]{6,15}$/.test(measurementId) ||
        window.location.hostname !== 'lidyacota.github.io') return;
    loaded = true;
    window[disableKey] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    // Automatic statistics; advertising stays disabled. This does not save a consent choice.
    window.gtag('consent', 'default', {
      analytics_storage: 'granted', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
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
        } catch (error) { /* Cookie access can be blocked by the browser. */ }
      });
    });
  }

  function stopAnalytics() {
    denied = true;
    window[disableKey] = true;
    clearAnalyticsCookies();
    // Remove an already loaded Google library only when the rejection will survive the reload.
    if (loaded && hasStoredDenial()) window.location.reload();
  }

  window.addEventListener('storage', function (event) {
    if (event.key !== storageKey) return;
    if (event.newValue === 'denied' || hasStoredDenial()) {
      stopAnalytics();
    } else if (event.newValue === 'granted' || event.newValue === null) {
      denied = false;
      window[disableKey] = false;
      startAnalytics();
    }
  });

  if (denied) stopAnalytics();
  else startAnalytics();
}());
