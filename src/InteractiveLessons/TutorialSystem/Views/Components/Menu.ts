export default class Menu {
	private _element: HTMLDivElement
	// private _diceRollerTab: HTMLDivElement

	constructor() {
		this._element = document.getElementById('rightSideMenu') as HTMLDivElement

		// this._diceRollerTab = this._element.querySelector(
		// 	'#diceRollerTab'
		// ) as HTMLDivElement
	}

	public enableMenu(): void {
		this._element.style.pointerEvents = 'auto'
	}

	public disableMenu(): void {
		this._element.style.pointerEvents = 'none'
	}

	public enableDiceRollerTab(): void {
		this._diceRollerTab.style.pointerEvents = 'auto'
	}

	public disableDiceRollerTab(): void {
		this._diceRollerTab.style.pointerEvents = 'none'
	}
}
