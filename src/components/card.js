export { makeCard, putLikeCard, funcDelBut };

import { DeleteCard,  removeLike, addLike } from "./api.js";

// @todo: Функция создания карточки

function makeCard(
  name,
  link,
  funcImg,
  funcLike,
  funcDelCard,
  amountLike,
  availabilityDelete,
  cardId,
  userId,
  likeIsLiked
) {
  const template = document.querySelector("#card-template").content;
  const newCard = template.cloneNode(true);
  const cardElement = newCard.querySelector(".places__item");
  const cardImage = newCard.querySelector(".card__image");
  const amountLikes = newCard.querySelector(".amount__likes");
  amountLikes.textContent = amountLike;
  cardImage.alt = name;
  cardImage.src = link;
  const cardTitle = newCard.querySelector(".card__title");
  cardTitle.textContent = name;
  const deleteButton = newCard.querySelector(".card__delete-button");
  if (availabilityDelete) {
    deleteButton.addEventListener("click", () =>
      funcDelCard(cardId, cardElement)
    );
  } else {
    deleteButton.setAttribute("style", "display: none;");
  }
  cardImage.addEventListener("click", () =>
    funcImg(cardImage.src, cardImage.alt, cardImage.alt)
  );
  const buttonLike = newCard.querySelector(".card__like-button");
  if (likeIsLiked) {
    buttonLike.classList.add("card__like-button_is-active");
  }
  buttonLike.addEventListener("click", () =>
    funcLike(cardId, buttonLike, amountLikes, userId)
  );
  return newCard;
}

// @todo: Функция удаления карточки

function funcDelBut(cardId, сardElement) {
  DeleteCard(cardId);
  сardElement.remove();
}

// Функция обработки лайка.

function putLikeCard(cardId, buttonLike, amountLikes) {
  if (buttonLike.classList.contains("card__like-button_is-active")) {
    removeLike(cardId)
      .then((card) => {
        const amountLikeServer = card.likes.length;
        amountLikes.textContent = amountLikeServer;
        buttonLike.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        // Обрабатываем ошибку
        alert(err);
      });
  } else {
    addLike(cardId).then((card) => {
      const amountLikeServer = card.likes.length;
      amountLikes.textContent = amountLikeServer;
      buttonLike.classList.add("card__like-button_is-active");
    })
    .catch((err) => {
      // Обрабатываем ошибку
      alert(err);
    });
  }
}
