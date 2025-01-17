// @todo: Темплейт карточки

const template=document.querySelector('#card-template').content;

// @todo: DOM узлы

const delBut=document.querySelectorAll('.card__delete-button');
const placesList=document.querySelector('.places__list');

// @todo: Функция создания карточки

function makeCard (name, link) {
    const newCard=template.cloneNode(true);
    const cardImage=newCard.querySelector('.card__image');
    cardImage.alt=name;
    cardImage.src=link;
    const cardTitle=newCard.querySelector('.card__title');
    cardTitle.textContent=name;
    const deleteButton=newCard.querySelector('.card__delete-button');
    const cardItem=deleteButton.closest('.places__item');
    deleteButton.addEventListener('click', () => funcDelBut(cardItem));
    return newCard;
};

// @todo: Функция удаления карточки 

function funcDelBut(cardItem) {
    cardItem.remove();
}

// @todo: Вывести карточки на страницу

 
 initialCards.forEach(function(item) {
    const c=makeCard(item['name'], item['link']);
    placesList.append(c);
 });




