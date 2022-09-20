export const inputElements = () => {
    const email = document.getElementById('email');
    const postcode = document.getElementById('postcode');
    const country = document.getElementById('country');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('password-confirm');    

    return { email, postcode, country, password, confirmPassword }
}

export const elements = inputElements();