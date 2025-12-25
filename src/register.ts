import AuthService from "./service/AuthService";
import MongoDBAuthRepository from "./repositories/MongoDBAuthRepository";
import ToastService from "./service/ToastService";

const registerNameInput = document.getElementById('registerNameInput') as HTMLInputElement;
const registerEmailInput = document.getElementById('registerEmailInput') as HTMLInputElement;
const registerPasswordInput = document.getElementById('registerPasswordInput') as HTMLInputElement;
const registerSubmitBtn = document.getElementById('registerSubmitBtn') as HTMLButtonElement;
const registerEmailInvalidFeedback = document.getElementById('registerEmailInvalidFeedback') as HTMLDivElement;
const registerPasswordInvalidFeedback = document.getElementById('registerPasswordInvalidFeedback') as HTMLDivElement;

const toastService = new ToastService()
const authRepository = new MongoDBAuthRepository()
const authService = new AuthService(authRepository, toastService)

function isEmailValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function checkMinLength(str: string, minLength: number) {
    return str.length >= minLength
}

registerEmailInput.addEventListener('keyup', () => {
    if (registerEmailInput.classList.contains('is-invalid')) {
        registerEmailInput.classList.remove('is-invalid')
    }
})

registerPasswordInput.addEventListener('keyup', () => {
    if (registerPasswordInput.classList.contains('is-invalid')) {
        registerPasswordInput.classList.remove('is-invalid')
    }
})

if (registerSubmitBtn) {
    registerSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault()

        const name = registerNameInput.value.trim()
        const email = registerEmailInput.value.trim()
        const password = registerPasswordInput.value.trim()

        if (!email) {
            registerEmailInput.classList.add('is-invalid')
            registerEmailInvalidFeedback.innerText = 'Email is required!'
            return
        }

        if (!isEmailValid(email)) {
            registerEmailInput.classList.add('is-invalid')
            registerEmailInvalidFeedback.innerText = 'Invalid email!'
            return
        }

        if (!password) {
            registerPasswordInput.classList.add('is-invalid')
            registerPasswordInvalidFeedback.innerText = 'Password is required!'
            return
        }

        if (!checkMinLength(password, 8)) {
            registerPasswordInput.classList.add('is-invalid')
            registerPasswordInvalidFeedback.innerText = 'Password must be at least 8 characters long!'
            return
        }

        void authService.register({ name, email, password })
    })
}
