import { elements } from "./Elements.js";


const emptyTypeChecker = () => {
    return {
        checkEmptyInput: (element) => {
            if (element.validity.valueMissing) {
                element.setCustomValidity('You must enter something');
                element.reportValidity();
                element.classList.add('inval');
                return;
            }
            element.classList.add('validate');
            element.setCustomValidity('');
        },
        checkTypeMismatch: (element) => {
            if (element.validity.typeMismatch) {
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
            if (element.validity.patternMismatch) {
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

const patternAndTypeChecker = () => {
    return {
        ...patternChecker(),
        ...emptyTypeChecker()
    }
}

const typeAndPasswordMatch = () => {
    return {
        ...emptyTypeChecker(),
        checkPasswordMatch: (pass1, pass2) => {
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
    }
}

elements.email.addEventListener('input', () => {
    const val = emptyTypeChecker();
    val.checkEmptyInput(elements.email);
    val.checkTypeMismatch(elements.email);
});

elements.postcode.addEventListener('input', () => {
    const val = patternAndTypeChecker();
    val.checkEmptyInput(elements.postcode);
    val.checkTypeMismatch(elements.postcode);
    val.checkPatternMismatch(elements.postcode);
});

elements.country.addEventListener('input', () => {
    const val = emptyTypeChecker();
    val.checkEmptyInput(elements.country);
    val.checkTypeMismatch(elements.country);

});

elements.password.addEventListener('input', () => {
    const val = emptyTypeChecker();
    val.checkEmptyInput(elements.password);
    val.checkTypeMismatch(elements.password);

});

elements.confirmPassword.addEventListener('input', () => {
    const val = typeAndPasswordMatch();
    val.checkEmptyInput(elements.password);
    val.checkTypeMismatch(elements.password);
    val.checkPasswordMatch(elements.password, elements.confirmPassword);

});
