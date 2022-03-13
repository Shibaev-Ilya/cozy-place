export let buttons = document.querySelectorAll('[data-modal="modal"]');
export let buttonClose = document.querySelector('.close');

let modalContainer = document.querySelector('.modal-container');

const isEscapeKey = (evt) => {
    return evt.key === 'Escape';
  };
const onPopupEscKeydown = (evt) => {
if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
}
};

let scrollWidth = window.innerWidth - document.body.clientWidth;

export let openForm = () => {

    modalContainer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollWidth}px`;

    document.addEventListener('keydown', onPopupEscKeydown);
    buttonClose.addEventListener('click', closeForm);

}
export let closeForm = () => {

    modalContainer.classList.add('hidden');
    document.body.style.overflow = 'visible';
    document.body.style.paddingRight = `0px`;

    document.removeEventListener('keydown', onPopupEscKeydown);
    buttonClose.removeEventListener('click', closeForm);

}