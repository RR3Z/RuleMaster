import { MessageBoxData } from '../../../_Types/Tutorials.ts'

export default class MessageBox {
	private _container: HTMLDivElement
	private _message: HTMLSpanElement
	private _closeButton: HTMLButtonElement
	private _nextButton: HTMLButtonElement
	private _overlay: HTMLDivElement

	constructor() {
		this._container = document.body.querySelector(
			'#tutorialMessageBox'
		) as HTMLDivElement
		this._message = this._container.querySelector(
			'#tutorialText'
		) as HTMLSpanElement
		this._closeButton = this._container.querySelector(
			'#messageBoxCloseBtn'
		) as HTMLButtonElement
		this._nextButton = this._container.querySelector(
			'#messageBoxNextBtn'
		) as HTMLButtonElement
		this._overlay = document.body.querySelector('#overlay') as HTMLDivElement

		// Style Elements
		this._container.style.display = 'none'
		this._overlay.style.display = 'none'

		// Events
		this._closeButton.addEventListener('click', () => {
			this.switchVisibility()
		})
		this._nextButton.addEventListener('click', () => {
			this.switchVisibility()
		})
	}

	public get closeButton(): Readonly<HTMLButtonElement> {
		return this._closeButton
	}

	public get nextButton(): Readonly<HTMLButtonElement> {
		return this._nextButton
	}

	public updateData(data: MessageBoxData): void {
		if (data === undefined) return

		this._message.textContent = data.message
		if (data.needNext) {
			this._closeButton.style.display = 'none'
			this._nextButton.style.display = 'flex'
		} else {
			this._closeButton.style.display = 'flex'
			this._nextButton.style.display = 'none'
		}

		this.switchVisibility()
	}

	private switchVisibility(): void {
		if (this._container.style.display === 'none') {
			this._container.style.display = 'flex'
			this._overlay.style.display = 'flex'
		} else {
			this._container.style.display = 'none'
			this._overlay.style.display = 'none'
		}
	}
}
