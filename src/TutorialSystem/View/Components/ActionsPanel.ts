export default class ActionsPanel {
	private _element: HTMLDivElement

	constructor() {
		this._element = document.getElementById('actionsPanel') as HTMLDivElement
	}

	public enable(): void {
		this._element.style.pointerEvents = 'auto'
	}

	public disable(): void {
		this._element.style.pointerEvents = 'none'
	}
}
