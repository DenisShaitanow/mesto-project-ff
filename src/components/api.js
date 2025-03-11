
import { makeCard } from './card.js';




const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-33',
    headers: {
      authorization: 'dd20b3a2-cbfb-4a98-bf25-02ef0e1d0d29',
      'Content-Type': 'application/json'
    }
  }
  
  export const getInitialCards = () => {
      return Promise.all([
        fetch(`${config.baseUrl}/cards`, {
          headers: {
            authorization: `${config.headers.authorization}`
          }
        }),
        fetch(`${config.baseUrl}/users/me`, {
          headers: {
            authorization: `${config.headers.authorization}`
          }
        })
      ])
  }

  export const fetchRedProfile = () => {
    const nameInput = document.querySelector('.popup__input_type_name');
    const jobInput = document.querySelector('.popup__input_type_description');
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: `${config.headers.authorization}`,
          'Content-Type': `${config.headers['Content-Type']}`
        },
        body: JSON.stringify({
          name: `${nameInput.value}`,
          about: `${jobInput.value}`
        })
      })
  }

  export const fetchAddNewCard = () => {
    const placeName=document.querySelector('.popup__input_type_card-name');
    const linkCard=document.querySelector('.popup__input_type_url');
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: `${config.headers.authorization}`,
          'Content-Type': `${config.headers['Content-Type']}`
        },
        body: JSON.stringify({
          name: `${placeName.value}`,
          link: `${linkCard.value}`
        })
      })
  }

  export const fetchRedAvatar = () => {
    const inputAvatarLink=document.querySelector('.popup_type_new-avatar .popup__input_type_url');
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: `${config.headers.authorization}`,
          'Content-Type': `${config.headers['Content-Type']}`
        },
        body: JSON.stringify({
          avatar: `${inputAvatarLink.value}`,
        })
      })
  }