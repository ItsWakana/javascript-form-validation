import { inputElements } from "./Elements.js";

const elements = inputElements();

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
            element.setCustomValidity('This is not a valid UK postcode');
            element.reportValidity();
            element.classList.add('inval');
            return;
        }
        element.classList.add('validate');
        element.setCustomValidity('');
    },
    checkPasswordMatch(pass1, pass2) {
        if (pass1.value !== pass2.value) {
            pass1.setCustomValidity('Passwords do not match');
            pass2.setCustomValidity('Passwords do not match');
            pass1.reportValidity();
            pass2.reportValidity();
            pass1.classList.add('inval');
            pass2.classList.add('inval');
            return;
        }
        pass1.classList.add('validate');
        pass2.classList.add('validate');
        pass1.setCustomValidity('');
        pass2.setCustomValidity('');
    },

    email(element) {
        element.addEventListener('input', () => {
            this.checkEmptyInput(element);
            this.checkTypeMismatch(element);
        });
    },
    postcode(element) {
        element.addEventListener('input', () => {
            this.checkEmptyInput(element);
            this.checkPatternMismatch(element);
        });
    },
    country(element) {
        element.addEventListener('input', () => {
            this.checkEmptyInput(element);
        });
    },
    passwords(pass1, pass2) {
        pass1.addEventListener('input', () => {
            this.checkEmptyInput(pass1);
            this.checkPasswordMatch(pass1, pass2);
        });
        pass2.addEventListener('input', () => {
            this.checkEmptyInput(pass1);
            this.checkPasswordMatch(pass1, pass2);
        });
    }
}

checkValidation.email(elements.email);
checkValidation.postcode(elements.postcode);
checkValidation.country(elements.country);
checkValidation.passwords(elements.password, elements.confirmPassword);
