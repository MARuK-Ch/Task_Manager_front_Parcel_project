export interface LoaderServiceInterface {
    isLoading: boolean
    show(): void
    hide(): void
    render(): void
}

export default class LoaderService implements LoaderServiceInterface {
    isLoading: boolean = false

    constructor(private loadingComponent: HTMLDivElement) {}

    show() {
        this.loadingComponent.classList.remove('hidden')
        this.isLoading = true
    }
    hide() {
        this.loadingComponent.classList.add('hidden')
        this.isLoading = false
    }
    render() {
        document.body.appendChild(this.loadingComponent)
    }
}