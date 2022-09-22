import { addIconToDOM, elements, removeIcon } from "./Elements.js";

const submit = document.getElementById('submit');

//for validating if the input is empty or the type of input is wrong
const emptyTypeChecker = () => {

    return {

        checkInputAndTypeMismatch: (element) => {
            removeIcon(element);
            addIconToDOM('tick', element);
            element.dataset.validated = 'true';
            if (element.validity.valueMissing) {
                removeIcon(element);
                addIconToDOM('cross', element);
                element.dataset.validated = 'false';
                element.setCustomValidity('You must enter something');
                element.reportValidity();
                element.classList.add('inval');
                return;
            }
            if (element.validity.typeMismatch) {
                removeIcon(element);
                addIconToDOM('cross', element);
                element.dataset.validated = 'false';
                element.setCustomValidity('Please enter a valid email address');
                element.reportValidity();
                element.classList.add('inval');
                return;
            }
            element.classList.add('validate');
            element.setCustomValidity('');
        }
    }
}
const patternChecker = () => {

    return {
        checkPatternMismatch: (element) => {
            element.dataset.validated = 'true';
            if (element.validity.patternMismatch) {
                removeIcon(element);
                addIconToDOM('cross', element);
                element.dataset.validated = 'false';
                element.setCustomValidity('This is not a valid UK postcode');
                element.reportValidity();
                element.classList.add('inval');
                return;
            }
            element.classList.add('validate');
            element.setCustomValidity('');
        },
    }
}
//spreading our pattern and type checker functionality to create this, for use with our postcode validation
const patternAndTypeChecker = () => {
    return {
        ...patternChecker(),
        ...emptyTypeChecker()
    }
}
///spreading out our type check and also password matching validator for both password fields
const typeAndPasswordMatch = () => {
    
    return {
        ...emptyTypeChecker(),
        checkPasswordMatch: (pass1, pass2) => {
            removeIcon(pass2);
            addIconToDOM('tick', pass2);
            pass2.dataset.validated = 'true';

            const arr = [pass1, pass2];

            if (pass1.value !== pass2.value) {

                arr.forEach(item => {
                    removeIcon(item);
                    item.setCustomValidity('Passwords do not match');
                    item.reportValidity();
                    item.classList.add('inval');
                    item.dataset.validated = 'false';
                });
                addIconToDOM('cross', pass2);
                return;
            }
            pass1.classList.add('validate');
            pass2.classList.add('validate');
            pass1.setCustomValidity('');
            pass2.setCustomValidity('');
        },
    }
}
//event listeners for our inputs which trigger when the user types, it activates the validation functionality
elements.email.addEventListener('input', () => {
    const val = emptyTypeChecker();
    val.checkInputAndTypeMismatch(elements.email);
});

elements.postcode.addEventListener('input', () => {
    const val = patternAndTypeChecker();
    val.checkInputAndTypeMismatch(elements.postcode);
    val.checkPatternMismatch(elements.postcode);
});

elements.country.addEventListener('input', () => {
    const val = emptyTypeChecker();
    val.checkInputAndTypeMismatch(elements.country);
});

elements.password.addEventListener('input', () => {
    const val = emptyTypeChecker();
    val.checkInputAndTypeMismatch(elements.password);
});

elements.confirmPassword.addEventListener('input', () => {
    const val = typeAndPasswordMatch();
    val.checkInputAndTypeMismatch(elements.password);
    val.checkPasswordMatch(elements.password, elements.confirmPassword);
});

submit.addEventListener('click', (e) => {
    e.preventDefault();
    elements.checkFullValidation();
});