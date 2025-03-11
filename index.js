

import { openModalWindow, closeModalWindow } from './components/modal.js';

import {  makeCard, putLikeCard, funcDelBut } from './components/card.js';

import { enableValidation, clearValidation } from './components/validation.js';

import { getInitialCards, fetchRedProfile, fetchAddNewCard, fetchRedAvatar } from './components/api.js';

import './pages/index.css';

// @todo: DOM узлы

const page=document.querySelector('.page');
const profileImage = document.querySelector('.profile__image');
const editAvatarIcon = document.querySelector('.edit__avatar');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const placesList = document.querySelector('.places__list');
const placeName = document.querySelector('.popup__input_type_card-name');
const linkCard = document.querySelector('.popup__input_type_url');
const buttonRedaction = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const buttonAdd = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewAvatar = document.querySelector('.popup_type_new-avatar');
const popuptypeImage = document.querySelector('.popup_type_image');
const imageOfpopuptypeImage = popuptypeImage.querySelector('.popup__image');
const captionPopupimage = popuptypeImage.querySelector('.popup__caption');
const formElementProfile = document.querySelector('.popup_type_edit .popup__form');
const formElementAdd = document.querySelector('.popup_type_new-card .popup__form');
const formElementAvatar = document.querySelector('.popup_type_new-avatar .popup__form');
const editAvatarPen = document.querySelector('.icon__edit');

// Настройки валидации

const settingsValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

getInitialCards()
.then((responses) => {
  return Promise.all(responses.map(response => {
    if (response.ok) {
      return response.json(); 
    } else {
      return Promise.reject(`Что-то пошло не так: ${response.status}`);
    }
  }));
})
.then(([cardsResponse, userResponse]) => {
  const cards = cardsResponse;
  const user = userResponse;

  // Сохраняем _id пользователя
  const userId = user._id;
  // Рендерим карточки с учетом состояния лайков и удаления
  cards.forEach(card => {
    let availabilityDelete=false;
    if (card.owner._id === userId) {
      availabilityDelete=true;
    }
    let likeIsLiked=false;
    if (card.likes.some((like) => like._id === userId)) {
      likeIsLiked=true;
    }
    const c = makeCard(
      card.name,
      card.link,
      showPopupImage,
      putLikeCard,
      funcDelBut,
      card.likes.length,
      availabilityDelete,
      card._id,
      userId,
      likeIsLiked
    );
    placesList.append(c);
  });

  // Настраиваем профиль пользователя
  profileTitle.textContent = user.name;
  profileJob.textContent = user.about;
  profileImage.setAttribute('style', `background-image: url(${user.avatar})`);
}).catch(err => {
  // Обрабатываем ошибку
  alert(err);
});




buttonRedaction.addEventListener('click', showProfileRed); // функция вывода Попап редактирования по кнопке редактировать

formElementProfile.addEventListener('submit', editFormSubmit);  // Функционал редактирования профайла с помощью формы

buttonAdd.addEventListener('click', showModalAdd);  // функция вывода Попап добавления по кнопке добавить
    
formElementAdd.addEventListener('submit', addNewCardInForm);  // Функция добавление новой карточки с помощью формы.

addListener(popupTypeEdit); 
addListener(popupNewCard);
addListener(popuptypeImage);
addListener(popupNewAvatar);

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(settingsValidation); 

function showProfileRed() {
  nameInput.value=profileTitle.textContent;
  jobInput.value=profileJob.textContent;
  openModalWindow(popupTypeEdit);
  clearValidation(formElementProfile, settingsValidation);
}

function showModalAdd() {
  openModalWindow(popupNewCard);
  clearValidation(formElementAdd, settingsValidation);
}

// функция вывода Попап картинки по клику картинки
function showPopupImage(src, alt, capt) {
  imageOfpopuptypeImage.src=src;
  imageOfpopuptypeImage.alt=alt;
  captionPopupimage.textContent=capt;
  openModalWindow(popuptypeImage);
}

// Функция редактирования профайла с помощью формы
function editFormSubmit(evt) {
  evt.preventDefault(); 
  const safeButton=popupTypeEdit.querySelector(`${settingsValidation.submitButtonSelector}`);
  safeButton.textContent='сохранение...';
  fetchRedProfile()
  .then((res) => {
    if (res.ok) {
      return res.json(); 
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  })
  .then((data) => {
    profileTitle.textContent=data.name;
    profileJob.textContent=data.about;
    safeButton.textContent='Сохранить';
    closeModalWindow(popupTypeEdit);
  }).catch(err => {
    // Обрабатываем ошибку
    alert(err);
    // Возвращаем первоначальный текст кнопки
    safeButton.textContent = 'Сохранить';
  });
  
}

// Функция добавление новой карточки с помощью формы.
function addNewCardInForm(evt) {
  evt.preventDefault();
  const safeButton=popupNewCard.querySelector(`${settingsValidation.submitButtonSelector}`);
  safeButton.textContent='сохранение...';
  fetchAddNewCard()
  .then((res) => {
    if (res.ok) {
      return res.json(); 
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  }).then((card) => {
    const cardId=card._id;
    const userId=card.owner._id;
    const amountLikes=card.likes.length;
    placesList.prepend(makeCard(placeName.value,
      linkCard.value,
      showPopupImage,
      putLikeCard,
      funcDelBut,
      amountLikes,
      true,
      cardId,
      userId,
      false));
    safeButton.textContent='Сохранить';
    closeModalWindow(popupNewCard);
    formElementAdd.reset();
  }).catch(err => {
    // Обрабатываем ошибку
    alert(err);
    // Возвращаем первоначальный текст кнопки
    safeButton.textContent = 'Сохранить';
  });
}

// Функция, чтобы повесить слушатели
  
function addListener(arg) {
  const closeButton=arg.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    closeModalWindow(arg);
  });
  arg.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModalWindow(arg);
    }
  })
}

// редактирование аватара

editAvatarIcon.addEventListener('mouseover', viewEditAvatar);
editAvatarIcon.addEventListener('mouseout', hideEditAvatar);
editAvatarIcon.addEventListener('click', openPopupAvatar);



function viewEditAvatar() {
  editAvatarPen.classList.add('icon__edit__active');
  profileImage.classList.add('profile__image__hover'); 
}

function hideEditAvatar() {
  editAvatarPen.classList.remove('icon__edit__active');
  profileImage.classList.remove('profile__image__hover');
}

function openPopupAvatar() {
  openModalWindow(popupNewAvatar);
  clearValidation(formElementAvatar, settingsValidation);
}


// Функция редактирования аватара с помощью формы
formElementAvatar.addEventListener('submit', makeNewAvatarInForm);

function makeNewAvatarInForm(evt) {
  evt.preventDefault();
  const safeButton=popupNewAvatar.querySelector(`${settingsValidation.submitButtonSelector}`);
  safeButton.textContent='сохранение...';
  fetchRedAvatar()
  .then((res) => {
    if (res.ok) {
      return res.json(); 
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  }).then((user) => {
    profileImage.setAttribute('style', `background-image: url(${user.avatar})`);
    safeButton.textContent='Сохранить';
    closeModalWindow(popupNewAvatar);
    formElementAvatar.reset();
  }).catch(err => {
    // Обрабатываем ошибку
    alert(err);
    // Возвращаем первоначальный текст кнопки
    safeButton.textContent = 'Сохранить';
  });
}





  

 






 

  




