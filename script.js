import { inputElements } from "./Elements.js";

const elements = inputElements();

submit.addEventListener('click', (event) => {
    event.preventDefault();
    checkValidation.email(elements.email);
});

const checkValidation = {

    checkEmptyInput(element) {
        if (element.validity.valueMissing) {
            element.setCustomValidity('You must enter something');
            element.reportValidity();
            element.classList.add('inval');
            return;
        }
        element.classList.add('validate');
        element.setCustomValidity('');

    },
    checkTypeMismatch(element) {
        if (element.validity.typeMismatch) {
            element.setCustomValidity('Please enter a valid email address');
            element.reportValidity();
            element.classList.add('inval');
            return;
        }
        element.classList.add('validate');
        element.setCustomValidity('');
    },
    checkPatternMismatch(element) {
        if (element.validity.patternMismatch) {
            element.setCustomValidity('Please enter a valid postcode');
            element.reportvalidity();
            element.classList.add('inval');
            return;
        }
        element.classList.add('validate');
        element.setCustomValidity('');
    },

    email(element) {
        this.checkEmptyInput(element);
        this.checkTypeMismatch(element);
    }
}