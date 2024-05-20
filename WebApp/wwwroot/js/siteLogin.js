const togglePassword = document.querySelector('#togglePassword');
const togglePasswordNew = document.querySelector('#togglePasswordNew');

const password = document.querySelector('#id_password');
const passwordNew = document.querySelector('#id_passwordNew');

if (togglePassword) {
    togglePassword.addEventListener('click', function (e) {
        // toggle the type attribute
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        // toggle the eye slash icon
        this.classList.toggle('fa-eye-slash');
    });
}

if (togglePasswordNew) {
    togglePasswordNew.addEventListener('click', function (e) {
        // toggle the type attribute
        const type = passwordNew.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordNew.setAttribute('type', type);
        // toggle the eye slash icon
        this.classList.toggle('fa-eye-slash');
    });
}