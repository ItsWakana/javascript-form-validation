export const inputElements = () => {
    const email = document.getElementById('email');
    const postcode = document.getElementById('postcode');
    const country = document.getElementById('country');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('password-confirm');  
    
    return { email, postcode, country, password, confirmPassword,
        checkFullValidation: () => {
            const elements = [...document.querySelectorAll('[data-validated]')];
            const validated = elements.every(element => {
                return element.dataset.validated === 'true';
            });

            if (validated === true) {
                alert('Submitted! High five!');
            }

        }
    }
}

export const elements = inputElements();

export const addIconToDOM = (tick, element) => {

    const inputParent = element.closest('.input-svg-container');
    if (tick === 'tick') {
        const tick = new Image();
        tick.src = './assets/tick.svg'; tick.className = 'icon-tick';
        inputParent.appendChild(tick);
    } else {
        const cross = new Image();
        cross.src = './assets/cross.svg'; cross.className = 'icon-cross';
        inputParent.appendChild(cross);
    }
}

export const removeIcon = (element) => {

    const parent = element.closest('.input-svg-container');
    const children = [...parent.children];
    children.forEach(child => {
        if (child.className === 'icon-cross' || child.className === 'icon-tick') {
            child.remove();
        }
    });
}