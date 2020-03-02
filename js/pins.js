'use strict';

(function () {
  var QUANTITY_PINS = 8;

  var pinsBlock = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinAvatar = pinElement.querySelector('img');

    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';
    pinAvatar.src = pin.author.avatar;
    pinAvatar.alt = pin.offer.title;

    return pinElement;
  };

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < QUANTITY_PINS; i++) {
      pinsBlock.appendChild(renderPin(pins[i]));
    }
    pinsBlock.appendChild(fragment);
  };

  window.pins = {
    renderPins: renderPins
  };
})();
