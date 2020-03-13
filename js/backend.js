'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var STATUS_CODE_OK = 200;
  var TIMEOUT_IN_MS = 10000;

  var serverRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      if (STATUS_CODE_OK) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    return xhr;
  };

  var load = function (onLoad) {
    var xhr = serverRequest(onLoad);
    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = serverRequest(onLoad, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
