const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-33",
  headers: {
    authorization: "dd20b3a2-cbfb-4a98-bf25-02ef0e1d0d29",
    "Content-Type": "application/json",
  },
};

export const getInfo = () => {
  return Promise.all([getInitialCards(), getUserInfo()]);
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: `${config.headers.authorization}`,
    },
  }).then(checkResponseStatus);
};

const checkResponseStatus = (response) => {
  if (response.status === 200) {
    return response.json();
  } else {
    return Promise.reject(`Что-то пошло не так: ${response.status}`);
  }
}

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: `${config.headers.authorization}`,
    },
  }).then(checkResponseStatus);
};

export const updateUserInfo = (nameInput, jobInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `${config.headers.authorization}`,
      "Content-Type": `${config.headers["Content-Type"]}`,
    },
    body: JSON.stringify({
      name: `${nameInput.value}`,
      about: `${jobInput.value}`,
    }),
  }).then(checkResponseStatus);
};

export const createNewCard = (placeName, linkCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: `${config.headers.authorization}`,
      "Content-Type": `${config.headers["Content-Type"]}`,
    },
    body: JSON.stringify({
      name: `${placeName.value}`,
      link: `${linkCard.value}`,
    }),
  }).then(checkResponseStatus);
};

export const updateUserAvatar = (inputAvatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: `${config.headers.authorization}`,
      "Content-Type": `${config.headers["Content-Type"]}`,
    },
    body: JSON.stringify({
      avatar: `${inputAvatarLink.value}`,
    }),
  }).then(checkResponseStatus);
};

export const DeleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: `${config.headers.authorization}`,
    },
  }).then(checkResponseStatus);
};

export const  removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: `${config.headers.authorization}`,
    },
  }).then(checkResponseStatus);
};

export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: `${config.headers.authorization}`,
    },
  }).then(checkResponseStatus);
};


