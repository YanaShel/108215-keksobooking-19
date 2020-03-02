'use strict';

(function () {
  var TypeOfHousing = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);

  var createFeatures = function (card) {
    var featuresBlock = cardElement.querySelector('.popup__features');
    var features = featuresBlock.querySelectorAll('.popup__feature');
    features.forEach(function (featuresItem) {
      featuresItem.style.display = 'none';
    });
    card.offer.features.forEach(function (feature) {
      featuresBlock.querySelector('.popup__feature--' + feature).style.display = 'inline-block';
    });
  };

  var createPhotos = function (card) {
    var photosBlock = cardElement.querySelector('.popup__photos');
    var photosElement = cardElement.querySelector('.popup__photo');
    if (card.offer.photos.length) {
      photosBlock.textContent = '';
      photosElement.classList.remove('hidden');
      for (var i = 0; i < card.offer.photos.length; i++) {
        var photo = photosElement.cloneNode(true);
        photo.src = card.offer.photos[i];
        photosBlock.appendChild(photo);
      }
    } else {
      var photos = photosBlock.children;
      for (var j = 0; j < photos.length; j++) {
        photos[j].classList.add('hidden');
      }
    }
  };

  var createCard = function (card) {

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TypeOfHousing[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    createFeatures(card);
    createPhotos(card);
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    return cardElement;
  };

  window.card = {
    createCard: createCard
  };
})();