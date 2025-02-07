

export {initialCards, makeCard, putLikeCard};

import { template } from '../index.js';

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


// @todo: Функция создания карточки

function makeCard (name, link, funcImg, funcLike) {
    const newCard=template.cloneNode(true);
    const cardImage=newCard.querySelector('.card__image');
    cardImage.alt=name;
    cardImage.src=link;
    const cardTitle=newCard.querySelector('.card__title');
    cardTitle.textContent=name;
    const deleteButton=newCard.querySelector('.card__delete-button');
    const cardItem=deleteButton.closest('.places__item');
    deleteButton.addEventListener('click', () => funcDelBut(cardItem));
    cardImage.addEventListener('click', funcImg);                         // функция вывода Попап картинки по клику картинки
    const buttonLike=newCard.querySelector('.card__like-button');
    buttonLike.addEventListener('click', funcLike);
    return newCard;
};

// @todo: Функция удаления карточки 

function funcDelBut(cardItem) {
    cardItem.remove();
}

 // Функция обработки лайка.

 function putLikeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}




/*console.log(initialCards[0]['name']+'....'+initialCards[0]['link']);*/