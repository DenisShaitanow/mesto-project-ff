
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


// я не понимаю, где она(handleEscKeyUp) должна находиться. Из index нельзя экспортировать, там нельзя, в cards только массив, в modal только две функции открытия и закрытия попапов, в card только создание, удаление карточки плюс лайк. Больше не остается js файлов. 
// я понял, как экспортировать и импортировать. И могу ее поместить в любое место. Но я правда не понимаю, куда. Поэтому решил оставить ее здесь.
