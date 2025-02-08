

export { buttonRedaction, popupTypeEdit, page, buttonAdd, popupNewCard, popuptypeImage, imageOfpopuptypeImage, placesList, profileTitle, profileJob, nameInput, jobInput };

import { initialCards } from './components/cards.js';

import { openModalWindow, closeModalWindow, addListener } from './components/modal.js';

import {  makeCard, putLikeCard, funcDelBut } from './components/card.js';

/*import '../pages/index.css';*/

// @todo: DOM узлы

const page=document.querySelector('.page');
const profileTitle=document.querySelector('.profile__title');
const profileJob=document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const placesList=document.querySelector('.places__list');
const buttonRedaction=document.querySelector('.profile__edit-button');
const popupTypeEdit=document.querySelector('.popup_type_edit');
const buttonAdd=document.querySelector('.profile__add-button');
const popupNewCard=document.querySelector('.popup_type_new-card');
const popuptypeImage=document.querySelector('.popup_type_image');
const imageOfpopuptypeImage=popuptypeImage.querySelector('.popup__image');
const formElementProfile = document.querySelector('.popup_type_edit .popup__form');
const formElementAdd= document.querySelector('.popup_type_new-card .popup__form');

// @todo: Вывести карточки на страницу

initialCards.forEach(function(item) {
  const c=makeCard(item['name'], item['link'], showPopupImage, putLikeCard, funcDelBut);
  placesList.append(c);
});
addListener();

buttonRedaction.addEventListener('click', showProfileRed); // функция вывода Попап редактирования по кнопке редактировать

formElementProfile.addEventListener('submit', handleFormSubmit);  // Функционал редактирования профайла с помощью формы

buttonAdd.addEventListener('click', showModalAdd);  // функция вывода Попап добавления по кнопке добавить
    
formElementAdd.addEventListener('submit', addNewCardInForm);  // Функция добавление новой карточки с помощью формы.

addListener(popupTypeEdit); 
addListener(popupNewCard);
addListener(popuptypeImage);


function showProfileRed() {
  openModalWindow(popupTypeEdit);
}

function showModalAdd() {
  openModalWindow(popupNewCard);
}

// функция вывода Попап картинки по клику картинки

function showPopupImage(src, alt) {
  imageOfpopuptypeImage.src=src;
  imageOfpopuptypeImage.alt=alt;
  openModalWindow(popuptypeImage);
}


// Функция редактирования профайла с помощью формы

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  profileTitle.textContent=nameInput.value;
  profileJob.textContent=jobInput.value;
  closeModalWindow(popupTypeEdit);
}

// Функция добавление новой карточки с помощью формы.
function addNewCardInForm(arg) {
  evt.preventDefault(); 
  const placeName=document.querySelector('.popup__input_type_card-name');
  const linkCard=document.querySelector('.popup__input_type_url');
  placesList.prepend(makeCard(placeName.value, linkCard.value,  showPopupImage, putLikeCard, funcDelBut));
  closeModalWindow(popupNewCard);
  placeName.value = null;
  linkCard.value = null;
}



  


  

 






 

  




