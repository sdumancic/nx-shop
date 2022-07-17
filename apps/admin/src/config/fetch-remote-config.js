(() => {
  function contentLoaded(win, fn) {

    var done = false, top = true,

      doc = win.document,
      root = doc.documentElement,
      modern = doc.addEventListener,

      add = modern ? 'addEventListener' : 'attachEvent',
      rem = modern ? 'removeEventListener' : 'detachEvent',
      pre = modern ? '' : 'on',

      init = function(e) {
        if (e.type === 'readystatechange' && doc.readyState != 'complete') return;
        (e.type === 'load' ? win : doc)[rem](pre + e.type, init, false);
        if (!done && (done = true)) fn.call(win, e.type || e);
      },

      poll = function() {
        try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
        init('poll');
      };

    if (doc.readyState === 'complete') fn.call(win, 'lazy');
    else {
      if (!modern && root.doScroll) {
        try { top = !win.frameElement; } catch(e) { }
        if (top) poll();
      }
      doc[add](pre + 'DOMContentLoaded', init, false);
      doc[add](pre + 'readystatechange', init, false);
      win[add](pre + 'load', init, false);
    }
  }

  function showUnderMaintenance () {
    document.getElementsByTagName('html')[0].classList.add('hydrated')
    var div = document.getElementById("page-maintenance");
    if (div) {
      div.style.display = 'block'
    }
    document.getElementById('home-loader').style.display = "none";
  }

  const fetchSync = url => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      // In local files, status is 0 upon success in Mozilla Firefox
      if(xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          // The request has been completed successfully
        } else {
          contentLoaded(window,function () {
            showUnderMaintenance(url)
          });
        }
      }
    };
    xhr.open('GET', url, false)

    xhr.send(null)
    return JSON.parse(xhr.responseText)
  }

  const version = '4.12.0'
  let url = window.location.protocol + '//' + window.location.host
  if (window.cordova) {
    url = window.location.protocol + '//localhost'
  }
  const meta = {...fetchSync(url + '/config/metadata.json?t=' + Date.now())}

  let baseUrl = meta.configUrl + '/' +
    meta.product + '/' +
    meta.type + '/' +
    meta.country + '/' +
    meta.brand + '/' +
    meta.environment + '/' +
    version + '/' +
    'env.json?t=' + Date.now()

  window.configuration = {...fetchSync(baseUrl)}
  window.environmentMeta = meta
})()


