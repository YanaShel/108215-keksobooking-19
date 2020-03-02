'use strict';

(function () {
  var pins;
  var mapBlock = document.querySelector('.map');
  var filters = mapBlock.querySelector('.map__filters-container');
  var pinMain = mapBlock.querySelector('.map__pin--main');

  var loadDate = function (data) {
    pins = data;
    pinMain.addEventListener('click', function () {
      mapBlock.classList.remove('map--faded');
      window.pins.renderPins(pins);
    });
  };

  var showAdvert = function (src) {
    pins.forEach(function (pin) {
      if (src === pin.author.avatar) {
        mapBlock.insertBefore(window.card.createCard(pin), filters);
      }
    });
  };

  mapBlock.addEventListener('click', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      var srcActivePin = evt.target.attributes.src.value;
      showAdvert(srcActivePin);
    }
  });


  window.backend.load(loadDate);

})();
