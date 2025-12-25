import ToastService from "./service/ToastService";
import MongoDBAuthRepository from "./repositories/MongoDBAuthRepository";
import AuthService from "./service/AuthService";

const loginEmailInput = document.getElementById('loginEmailInput') as HTMLInputElement;
const loginPasswordInput = document.getElementById('loginPasswordInput') as HTMLInputElement;
const loginSubmitBtn = document.getElementById('loginSubmitBtn') as HTMLButtonElement;

const toastService = new ToastService()
const authRepository = new MongoDBAuthRepository()
const authService = new AuthService(authRepository, toastService)

const params = new URLSearchParams(window.location.search);
const fromRegister = params.get('fromRegister') === 'true'
const registerEmail = params.get('registerEmail')

if (fromRegister) {
    toastService.showSuccess("Successful registration! Please login with new account!")

    if (registerEmail) {
        loginEmailInput.value = registerEmail
    }
}

loginEmailInput.addEventListener('keyup', () => {
    if (loginEmailInput.classList.contains('is-invalid')) {
        loginEmailInput.classList.remove('is-invalid')
    }
})

loginPasswordInput.addEventListener('keyup', () => {
    if (loginPasswordInput.classList.contains('is-invalid')) {
        loginPasswordInput.classList.remove('is-invalid')
    }
})

if (loginSubmitBtn) {
    loginSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault()

        const email = loginEmailInput.value.trim()
        const password = loginPasswordInput.value.trim()

        if (!email) {
            alert('email address is required')
            return
        }

        if (!password) {
            loginPasswordInput.classList.add('is-invalid')
            return
        }

        void authService.login({ email, password })
    })
}