
export { openModalWindow, closeModalWindow }


// Функция открытия модального окна

function openModalWindow(arg) {
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
    const popup = document.querySelector(".popup_is-opened"); // находим открытый попап
    if (evt.key === "Escape") {
      closeModalWindow(popup);
    }
  };


