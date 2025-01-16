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
    deleteButton.addEventListener('click', funcDelBut);
    return newCard;

};

// @todo: Функция удаления карточки 

function funcDelBut() {
    
    const cardItem=delBut.closest('.places__item');
    console.log(del);
    cardItem.remove();
    
}



// @todo: Вывести карточки на страницу


for (let i=0; i <= initialCards.length;  i+=1) {
    const c=makeCard(initialCards[i]['name'], initialCards[i]['link']);
    placesList.append(c);
 };
 




