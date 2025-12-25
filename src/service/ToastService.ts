import Toastify from 'toastify-js'

export interface ToastServiceInterface {
    showError(message: string): void
    showSuccess(message: string): void
}

export default class ToastService implements ToastServiceInterface {
    showError(message: string) {
        Toastify({
            text: message || "Server error",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "red",
                color: "white",
            },
        }).showToast();
    }

    showSuccess(message: string) {
        Toastify({
            text: message || "Success",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "green",
                color: "white",
            },
        }).showToast();
    }
}