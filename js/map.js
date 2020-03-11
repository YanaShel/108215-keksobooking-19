'use strict';

(function () {
  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 65,
    TAIL_LENGTH: 22
  };
  var pins;
  var mapBlock = document.querySelector('.map');
  var pinMain = mapBlock.querySelector('.map__pin--main');
  var formAdvert = document.querySelector('.ad-form');
  var addressInput = formAdvert.querySelector('#address');

  var coordinateMainPin = {
    x: Math.round(pinMain.offsetLeft + (MainPinSize.WIDTH / 2)),
    y: Math.round(pinMain.offsetTop + MainPinSize.HEIGHT + MainPinSize.TAIL_LENGTH)
  };

  addressInput.value = coordinateMainPin.x + ', ' + coordinateMainPin.y;

  var loadDate = function (data) {
    pins = data;
  };

  pinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      activateMap();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };


      var onMouseMove = function (moveEvt) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };


        var newCoordinate = {
          x: pinMain.offsetLeft - shift.x,
          y: pinMain.offsetTop - shift.y
        };

        if ((newCoordinate.x + MainPinSize.WIDTH / 2) >= 0 && newCoordinate.x <= mapBlock.offsetWidth - MainPinSize.WIDTH / 2) {
          pinMain.style.left = newCoordinate.x + 'px';
        }

        if (newCoordinate.y >= 130 && newCoordinate <= 630) {
          pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        }

        addressInput.value = Math.round(newCoordinate.x + MainPinSize.WIDTH / 2) + ', ' + newCoordinate.y;

      };

      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);

      };

      document.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.Key.ENTER) {
      activateMap();
    }
  });

  var activateMap = function () {
    mapBlock.classList.remove('map--faded');
    formAdvert.classList.remove('ad-form--disabled');
    window.pins.renderPins(pins);
  };

  var showAdvert = function (altImg) {
    pins.forEach(function (pin) {
      if (altImg === pin.offer.title) {
        window.card.insertCard(pin);
      }
    });
  };

  mapBlock.addEventListener('click', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      var altImgActivePin = evt.target.attributes.alt.value;
      showAdvert(altImgActivePin);
    }
  });

  mapBlock.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.Key.ENTER) {
      var altImgActivePin = evt.target.children[0].attributes.alt.value;
      showAdvert(altImgActivePin);
    }
  });

  window.backend.load(loadDate);

})();
