'use strict';

(function () {
  var ROOMS_VALUES = ['1', '2', '3', '100'];
  var GUESTS_VALUES = ['1', '2', '3', '0'];

  var PinMainStartCoordinate = {
    LEFT: '570px',
    TOP: '375px'
  };

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
    ONE: '1',
    TWO: '2',
    THREE: '3',
    HUNDRED: '100'
  };

  var guestsAmount = {
    ZERO: '0',
    ONE: '1',
    TWO: '2',
    THREE: '3'
  };

  var mainTag = document.querySelector('main');
  var selectTags = mainTag.querySelectorAll('select');
  var inputTags = mainTag.querySelectorAll('input');
  var mapBlock = mainTag.querySelector('.map');
  var pinsBlock = mapBlock.querySelector('.map__pins');
  var pinMain = mapBlock.querySelector('.map__pin--main');
  var formAdvert = mainTag.querySelector('.ad-form');
  var numberRoomsSelect = formAdvert.querySelector('#room_number');
  var numberSeatsSelect = formAdvert.querySelector('#capacity');
  var typeHousingInput = formAdvert.querySelector('#type');
  var priceInput = formAdvert.querySelector('#price');
  var timeInSelect = formAdvert.querySelector('#timein');
  var timeOutSelect = formAdvert.querySelector('#timeout');
  var titleAdvert = formAdvert.querySelector('#title');
  var priceAdvert = formAdvert.querySelector('#price');
  var descriptionAdvert = formAdvert.querySelector('#description');
  var addressInput = formAdvert.querySelector('#address');
  var featureInputs = formAdvert.querySelectorAll('.feature');

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
    } else if (numberRoomsSelect.value !== roomsAmount.HUNDRED && numberSeatsSelect.value === guestsAmount.ZERO) {
      numberSeatsSelect.setCustomValidity('Выбирите допустимое количество гостей');
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
    formAdvert.classList.add('ad-formAdvert--disabled');
    var pins = pinsBlock.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      if (pin.classList.length === 1) {
        pinsBlock.removeChild(pin);
      }
    });
    var cardAdvert = document.querySelector('.map__card');
    if (cardAdvert) {
      cardAdvert.remove();
    }
    window.map.setAttribute(selectTags);
    window.map.setAttribute(inputTags);
    pinMain.style.top = PinMainStartCoordinate.TOP;
    pinMain.style.left = PinMainStartCoordinate.LEFT;
    addressInput.value = window.map.coordinateMainPin.x + ', ' + window.map.coordinateMainPin.y;
    titleAdvert.value = '';
    priceAdvert.value = '';
    typeHousingInput.value = HouseType.FLAT;
    numberRoomsSelect.value = roomsAmount.ONE;
    numberSeatsSelect.value = guestsAmount.THREE;
    timeInSelect.value = Time.TWELVE;
    timeOutSelect.value = Time.TWELVE;
    featureInputs.forEach(function (input) {
      input.control.checked = false;
    });
    descriptionAdvert.value = '';
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
    window.backend.save(new FormData(formAdvert), showSuccessMessage, showErrorMessage);
    evt.preventDefault();
  };

  formAdvert.addEventListener('change', function () {
    checkValidityGuests();
    checkValidityTime();
  });

  formAdvert.addEventListener('submit', onFormSubmit);

})();
