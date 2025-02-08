
import { initialCards } from './components/cards.js';

import { openModalWindow, closeModalWindow } from './components/modal.js';

import {  makeCard, putLikeCard, funcDelBut } from './components/card.js';

import './pages/index.css';

// @todo: DOM узлы

const page=document.querySelector('.page');
const profileTitle=document.querySelector('.profile__title');
const profileJob=document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const placesList=document.querySelector('.places__list');
const placeName=document.querySelector('.popup__input_type_card-name');
const linkCard=document.querySelector('.popup__input_type_url');
const buttonRedaction=document.querySelector('.profile__edit-button');
const popupTypeEdit=document.querySelector('.popup_type_edit');
const buttonAdd=document.querySelector('.profile__add-button');
const popupNewCard=document.querySelector('.popup_type_new-card');
const popuptypeImage=document.querySelector('.popup_type_image');
const imageOfpopuptypeImage=popuptypeImage.querySelector('.popup__image');
const captionPopupimage=popuptypeImage.querySelector('.popup__caption');
const formElementProfile = document.querySelector('.popup_type_edit .popup__form');
const formElementAdd= document.querySelector('.popup_type_new-card .popup__form');

// @todo: Вывести карточки на страницу

initialCards.forEach(function(item) {
  const c=makeCard(item['name'], item['link'], showPopupImage, putLikeCard, funcDelBut);
  placesList.append(c);
});

buttonRedaction.addEventListener('click', showProfileRed); // функция вывода Попап редактирования по кнопке редактировать

formElementProfile.addEventListener('submit', editFormSubmit);  // Функционал редактирования профайла с помощью формы

buttonAdd.addEventListener('click', showModalAdd);  // функция вывода Попап добавления по кнопке добавить
    
formElementAdd.addEventListener('submit', addNewCardInForm);  // Функция добавление новой карточки с помощью формы.

addListener(popupTypeEdit); 
addListener(popupNewCard);
addListener(popuptypeImage);

function showProfileRed() {
  nameInput.value=profileTitle.textContent;
  jobInput.value=profileJob.textContent;
  openModalWindow(popupTypeEdit);
}

function showModalAdd() {
  openModalWindow(popupNewCard);
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
  profileTitle.textContent=nameInput.value;
  profileJob.textContent=jobInput.value;
  closeModalWindow(popupTypeEdit);
}

// Функция добавление новой карточки с помощью формы.
function addNewCardInForm(evt) {
  evt.preventDefault(); 
  placesList.prepend(makeCard(placeName.value, linkCard.value,  showPopupImage, putLikeCard, funcDelBut));
  closeModalWindow(popupNewCard);
  formElementAdd.reset();
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


  


  

 






 

  




