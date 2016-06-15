
'use strict';
// 函数封装
export  function handleAjax() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0],
  opt = {
    url: options.url || '',
    data: options.data || 't=' + new Date().getTime(),
    type: options.type || 'get',
    dataType: options.dataType || 'json',
    cache: options.cache || false,
    async: options.async || true,
    context: options.context || document.body,
    beforeSend: options.beforeSend || undefined
  };
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    if (typeof opt.beforeSend === 'function') {
      opt.beforeSend();
    }
    req.open(opt.type, opt.url, opt.async);
    req.onload = function () {
      if (req.status === 200) {
        var data = req.responseText;
        if (opt.dataType === 'json') {
          data = JSON.parse(data);
        }
        resolve(data);
      } else {
        reject(new Error(req.statusText || 'You can\'t do this.'));
      }
    };
    req.onerror = function () {
      reject(new Error(req.statusText || 'Server is down.'));
    };
    req.send();
  });
};
