
import { popupTypeEdit, page, popupNewCard, popuptypeImage, imageOfpopuptypeImage, placesList } from '../index.js';
import { makeCard, putLikeCard } from './cards.js';

export { popupImage, handleFormSubmit, funcAffNewCardInForm, funcProfileEditView, funcProfileAddView };


// Функция открытия модального окна

function openModalWindow(arg) {
    arg.classList.add('popup_is-opened');
    page.addEventListener('keydown', handleEscKeyUp);
}

// Функция закрытия модального окна

function closeModalWindow(arg) {
    arg.classList.remove('popup_is-opened');
    page.removeEventListener('keydown', handleEscKeyUp);
}

// Функция срабатывания на ESC
const handleEscKeyUp = (evt) => {
    if (evt.key === "Escape") {
      const popup = document.querySelector(".popup_is-opened"); // находим открытый попап
      closeModalWindow(popup);
    }
  };

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

function funcProfileEditView() {
    openModalWindow(popupTypeEdit);
    addListener(popupTypeEdit);  
}

function funcProfileAddView() {
    openModalWindow(popupNewCard);
    addListener(popupNewCard);
}

// функция вывода Попап картинки по клику картинки
function popupImage(evt) {
    imageOfpopuptypeImage.src=evt.target.src;
    imageOfpopuptypeImage.alt=evt.target.alt;
    openModalWindow(popuptypeImage);
    addListener(popuptypeImage);
}

// Функция редактирования профайла с помощью формы

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    const nameInput = document.querySelector('.popup__input_type_name');
    const jobInput = document.querySelector('.popup__input_type_description');
    const profileTitle=document.querySelector('.profile__title');
    const profileJob=document.querySelector('.profile__description');
    profileTitle.textContent=nameInput.value;
    profileJob.textContent=jobInput.value;
    closeModalWindow(popupTypeEdit);
}

// Функция добавление новой карточки с помощью формы.
function funcAffNewCardInForm(evt) {
    evt.preventDefault(); 
    const placeName=document.querySelector('.popup__input_type_card-name');
    const linkCard=document.querySelector('.popup__input_type_url');
    placesList.prepend(makeCard(placeName.value, linkCard.value,  popupImage, putLikeCard));
    closeModalWindow(popupNewCard);
    placeName.value = null;
    linkCard.value = null;
  }



