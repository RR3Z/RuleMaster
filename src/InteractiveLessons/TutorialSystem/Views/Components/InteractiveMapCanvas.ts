export default class InteractiveMapCanvas {
	private _htmlElement: HTMLCanvasElement

	constructor() {
		this._htmlElement = document.getElementById(
			'interactiveMap'
		) as HTMLCanvasElement
	}

	public enable(): void {
		this._htmlElement.style.pointerEvents = 'auto'
	}

	public disable(): void {
		this._htmlElement.style.pointerEvents = 'none'
	}
}
