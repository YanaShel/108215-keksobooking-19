'use strict';

(function () {

  var ROOMS_VALUES = ['1', '2', '3', '100'];
  var GUESTS_VALUES = ['1', '2', '3', '0'];

  var numberRoomsInput = document.querySelector('#room_number');
  var numberSeatsInput = document.querySelector('#capacity');

  numberRoomsInput.addEventListener('change', function () {
    var currentValueIndex = ROOMS_VALUES.indexOf(numberRoomsInput.value);
    var dependFieldValue = GUESTS_VALUES[currentValueIndex];
    numberSeatsInput.value = dependFieldValue;
  });

})();
