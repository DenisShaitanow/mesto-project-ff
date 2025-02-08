

export {  makeCard, putLikeCard, funcDelBut }

// @todo: Функция создания карточки

function makeCard (name, link, funcImg, funcLike, funcDelCard) {
    const template=document.querySelector('#card-template').content;
    const newCard=template.cloneNode(true);
    const cardImage=newCard.querySelector('.card__image');
    cardImage.alt=name;
    cardImage.src=link;
    const cardTitle=newCard.querySelector('.card__title');
    cardTitle.textContent=name;
    const deleteButton=newCard.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', funcDelCard);
    cardImage.addEventListener('click', () => funcImg(cardImage.src, cardImage.alt));                         // функция вывода Попап картинки по клику картинки
    const buttonLike=newCard.querySelector('.card__like-button');
    buttonLike.addEventListener('click', funcLike);
    return newCard;
};

// @todo: Функция удаления карточки 

function funcDelBut(evt) {
    const cardItem=evt.target.closest('.places__item');
    cardItem.remove();
}

 // Функция обработки лайка.

 function putLikeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}