'use strict';

(function () {
  var ROOMS_VALUES = ['1', '2', '3', '100'];
  var GUESTS_VALUES = ['1', '2', '3', '0'];

  var Time = {
    TWELVE: '12:00',
    THIRTEEN: '13:00',
    FOURTEEN: '14:00'
  };

  var Price = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var HouseType = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace'
  };

  var roomsAmount = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    HUNDRED: 100
  };

  var guestsAmount = {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3
  };

  var form = document.querySelector('.ad-form');
  var numberRoomsSelect = form.querySelector('#room_number');
  var numberSeatsSelect = form.querySelector('#capacity');
  var typeHousingInput = form.querySelector('#type');
  var priceInput = form.querySelector('#price');
  var timeInSelect = form.querySelector('#timein');
  var timeOutSelect = form.querySelector('#timeout');
  var mapBlock = document.querySelector('.map');
  var formAdvert = document.querySelector('.ad-form');
  var mainTag = document.querySelector('main');
  var pinsBlock = document.querySelector('.map__pins');

  numberRoomsSelect.addEventListener('change', function () {
    var currentValueIndex = ROOMS_VALUES.indexOf(numberRoomsSelect.value);
    var dependFieldValue = GUESTS_VALUES[currentValueIndex];
    numberSeatsSelect.value = dependFieldValue;
  });

  timeInSelect.addEventListener('change', function () {
    switch (timeInSelect.value) {
      case Time.TWELVE:
        timeOutSelect.value = Time.TWELVE;
        break;
      case Time.THIRTEEN:
        timeOutSelect.value = Time.THIRTEEN;
        break;
      case Time.FOURTEEN:
        timeOutSelect.value = Time.FOURTEEN;
        break;
    }
  });

  typeHousingInput.addEventListener('change', function () {
    switch (typeHousingInput.value) {
      case HouseType.BUNGALO:
        priceInput.setAttribute('placeholder', Price.BUNGALO);
        priceInput.setAttribute('min', Price.BUNGALO);
        break;
      case HouseType.FLAT:
        priceInput.setAttribute('placeholder', Price.FLAT);
        priceInput.setAttribute('min', Price.FLAT);
        break;
      case HouseType.HOUSE:
        priceInput.setAttribute('placeholder', Price.HOUSE);
        priceInput.setAttribute('min', Price.HOUSE);
        break;
      case HouseType.PALACE:
        priceInput.setAttribute('placeholder', Price.PALACE);
        priceInput.setAttribute('min', Price.PALACE);
    }
  });

  var checkValidityTime = function () {
    if (timeInSelect.value !== timeOutSelect.value) {
      timeOutSelect.setCustomValidity('Виберите одинаковое время заезда и выезда');
    } else {
      timeOutSelect.setCustomValidity('');
    }
  };

  var checkValidityGuests = function () {
    if (numberRoomsSelect.value === roomsAmount.HUNDRED && numberSeatsSelect.value !== guestsAmount.ZERO) {
      numberSeatsSelect.setCustomValidity('Выберите допустимый вариант "Не для гостей"');
    } else if (numberSeatsSelect.value > numberRoomsSelect.value && numberRoomsSelect.value !== roomsAmount.HUNDRED) {
      numberSeatsSelect.setCustomValidity('Слишком много гостей');
    } else {
      numberSeatsSelect.setCustomValidity('');
    }
  };

  var removeMessage = function () {
    var successMessage = document.querySelector('.success');
    var errorMessage = document.querySelector('.error');

    if (successMessage) {
      successMessage.remove();
    }
    if (errorMessage) {
      errorMessage.remove();
    }
  };

  var addMessage = function (template) {
    var messageElement = template.cloneNode(true);
    mainTag.appendChild(messageElement);
    document.addEventListener('click', removeMessage);
  };

  var inactivateMap = function () {
    mapBlock.classList.add('map--faded');
    formAdvert.classList.add('ad-form--disabled');
    var pins = pinsBlock.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      if (pin.classList.length === 1) {
        pinsBlock.removeChild(pin);
      }
    });
  };

  var showSuccessMessage = function () {
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    addMessage(successMessageTemplate);
    inactivateMap();
  };

  var showErrorMessage = function () {
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    addMessage(errorMessageTemplate);
    inactivateMap();
  };

  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(form), showSuccessMessage, showErrorMessage);
    evt.preventDefault();
  };

  form.addEventListener('change', function () {
    checkValidityGuests();
    checkValidityTime();
  });

  form.addEventListener('submit', onFormSubmit);

})();
