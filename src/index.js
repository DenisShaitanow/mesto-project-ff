

export {template, buttonRedaction, popupTypeEdit, page, buttonAdd, popupNewCard, popuptypeImage, imageOfpopuptypeImage, placesList};

import { initialCards, makeCard, putLikeCard} from './components/cards.js';

import { popupImage, handleFormSubmit, funcAffNewCardInForm, funcProfileEditView, funcProfileAddView } from './components/modules.js';
import '../pages/index.css';

// @todo: Темплейт карточки

const template=document.querySelector('#card-template').content;

// @todo: DOM узлы

const page=document.querySelector('.page');
const placesList=document.querySelector('.places__list');
const buttonRedaction=document.querySelector('.profile__edit-button');
const popupTypeEdit=document.querySelector('.popup_type_edit');
const buttonAdd=document.querySelector('.profile__add-button');
const popupNewCard=document.querySelector('.popup_type_new-card');
const popuptypeImage=document.querySelector('.popup_type_image');
const imageOfpopuptypeImage=popuptypeImage.querySelector('.popup__image');
const formElement = document.querySelector('.popup_type_edit .popup__form');
const formElementAdd= document.querySelector('.popup_type_new-card .popup__form');

// @todo: Вывести карточки на страницу

initialCards.forEach(function(item) {
  const c=makeCard(item['name'], item['link'], popupImage, putLikeCard);
  placesList.append(c);
});

buttonRedaction.addEventListener('click', funcProfileEditView); // функция вывода Попап редактирования по кнопке редактировать

formElement.addEventListener('submit', handleFormSubmit);  // Функционал редактирования профайла с помощью формы

buttonAdd.addEventListener('click', funcProfileAddView);  // функция вывода Попап добавления по кнопке добавить
    
formElementAdd.addEventListener('submit', funcAffNewCardInForm);  // Функция добавление новой карточки с помощью формы.




  


  

 






 

  




