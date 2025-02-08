

export { openModalWindow, closeModalWindow, addListener }


const profileTitle=document.querySelector('.profile__title');
const profileJob=document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// Функция открытия модального окна

function openModalWindow(arg) {
    nameInput.value=profileTitle.textContent;
    jobInput.value=profileJob.textContent;
    arg.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscKeyUp);
}

// Функция закрытия модального окна

function closeModalWindow(arg) {
    arg.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscKeyUp);
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




