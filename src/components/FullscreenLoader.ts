export function FullscreenLoader() {
    const loaderDiv = document.createElement('div')
    loaderDiv.className = 'fullscreen-loader hidden'

    const spinnerDiv = document.createElement('div')
    spinnerDiv.className = 'spinner-border text-info'
    spinnerDiv.role = 'status'

    const spinnerSpan = document.createElement('span')
    spinnerSpan.className = 'visually-hidden'
    spinnerSpan.innerText = 'Loading...'

    spinnerDiv.appendChild(spinnerSpan)
    loaderDiv.appendChild(spinnerDiv)

    return loaderDiv
}