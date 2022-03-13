import { openForm, buttons } from "./modal.js";

buttons.forEach(element => {
    element.addEventListener('click', openForm);
});


