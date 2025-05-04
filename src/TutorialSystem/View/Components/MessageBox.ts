export default class MessageBox {
	private _element: HTMLDivElement
	private _text: HTMLSpanElement
	private _closeButton: HTMLButtonElement
	private _nextButton: HTMLButtonElement

	constructor() {
		this._element = document.getElementById(
			'tutorialMessageBox'
		) as HTMLDivElement

		this._text = this._element.querySelector('#tutorialText') as HTMLSpanElement

		this._closeButton = this._element.querySelector(
			'#messageBoxCloseBtn'
		) as HTMLButtonElement

		this._nextButton = this._element.querySelector(
			'#messageBoxNextBtn'
		) as HTMLButtonElement
	}

	public enable(): void {
		this._element.style.visibility = 'visible'
	}

	public disable(): void {
		this._element.style.visibility = 'hidden'
	}

	public showMessages(messages: string[]): void {
		if (messages.length === 0) {
			this.disable()
			return
		}
		console.log('MessageBox -> showMessages(): ' + messages.length)

		if (messages.length > 1) {
			this._nextButton.style.display = 'flex'
			this._closeButton.style.display = 'none'
		} else {
			this._nextButton.style.display = 'none'
			this._closeButton.style.display = 'flex'
		}

		let messageIndex = 0
		this._text.textContent = messages[messageIndex]
		messageIndex++

		this._closeButton.onclick = () => {
			this.disable()
		}

		this._nextButton.onclick = () => {
			this._text.textContent = messages[messageIndex]
			messageIndex++
			if (messages.length - 1 <= messageIndex) {
				this._nextButton.style.display = 'none'
				this._closeButton.style.display = 'flex'
			}
		}

		this.enable()
	}
}
