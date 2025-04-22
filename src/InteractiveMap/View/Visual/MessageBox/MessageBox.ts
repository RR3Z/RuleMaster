import { MessageBoxData } from '../../../_Types/Tutorials.ts'

export default class MessageBox {
	private _container: HTMLDivElement
	private _message: HTMLSpanElement
	private _closeButton: HTMLButtonElement
	private _nextButton: HTMLButtonElement

	constructor() {
		// Create Elements
		this._container = document.body.appendChild(document.createElement('div'))
		this._container.id = 'tutorialMessageBox'

		this._message = document.createElement('span')
		this._container.appendChild(this._message)
		this._message.id = 'tutorialText'

		this._closeButton = document.createElement('button')
		this._container.appendChild(this._closeButton)
		this._closeButton.id = 'messageBoxCloseBtn'

		this._nextButton = document.createElement('button')
		this._container.appendChild(this._nextButton)
		this._nextButton.id = 'messageBoxNextBtn'

		// Style Elements
		this._container.style.visibility = 'hidden'
		this._container.style.backgroundColor = '#ffffff'

		// Events
		this._closeButton.addEventListener('click', this.switchVisibility)
		this._nextButton.addEventListener('click', this.switchVisibility)
	}

	public get closeButton(): Readonly<HTMLButtonElement> {
		return this._closeButton
	}

	public get nextButton(): Readonly<HTMLButtonElement> {
		return this._nextButton
	}

	public updateData(data: MessageBoxData): void {
		console.log(data)
		if (data === undefined) return

		this._message.textContent = data.message
		if (data.needNext) {
			this._closeButton.style.visibility = 'hidden'
			this._nextButton.style.visibility = 'visible'
		} else {
			this._closeButton.style.visibility = 'visible'
			this._nextButton.style.visibility = 'hidden'
		}

		this.switchVisibility()
	}

	private switchVisibility(): void {
		if (this._container.style.visibility === 'hidden')
			this._container.style.visibility = 'visible'
		else this._container.style.visibility = 'hidden'
	}
}
