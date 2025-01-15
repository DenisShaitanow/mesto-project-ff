// @todo: Темплейт карточки

const template=document.querySelector('#card-template');

// @todo: DOM узлы

const deleteButton=document.querySelectorAll('.card__delete-button');
const placesList=document.querySelector('.places__list');

// @todo: Функция создания карточки

function makeCard (name, link, funcDelBut) {
    const cloneNode=template.cloneNode(true);
    const cardImage=cloneNode.querySelector('.card__image');
    cardImage.alt=name;
    cardImage.src=link;
    const cardTitle=cloneNode.querySelector('.card__title');
    cardTitle.textContent=name;
    
    
    deleteButton.add.EventListener('click', funcDelBut());
    return cloneNode;

};

// @todo: Функция удаления карточки

function funcDelBut() {
    
    const cardItem=deleteButton.closest('.places__item card');
    cardItem.remove();
    
}


// @todo: Вывести карточки на страницу


for (let i=0; i <=initialCards.length;  i+=1) {
    const c=makeCard(initialCards[i]['name'], initialCards[i]['link'], funcDelBut);
     console.log(c);
    placesList.append(c);
 };
 




