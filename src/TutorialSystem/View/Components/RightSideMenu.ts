export default class RightSideMenu {
	private _element: HTMLDivElement
	private _controlMenu: HTMLDivElement
	private _diceRollerTab: HTMLDivElement
	// private _logsTab:HTMLDivElement

	constructor() {
		this._element = document.getElementById('rightSideMenu') as HTMLDivElement

		this._controlMenu = this._element.querySelector(
			'#menuControl'
		) as HTMLDivElement

		this._diceRollerTab = this._element.querySelector(
			'#diceRollerTab'
		) as HTMLDivElement
	}

	public enableMenu(): void {
		this._element.style.pointerEvents = 'auto'
	}

	public disableMenu(): void {
		this._element.style.pointerEvents = 'none'
	}

	public enableControlMenu(): void {
		this._controlMenu.style.pointerEvents = 'all'
	}

	public disableControlMenu(): void {
		this._controlMenu.style.pointerEvents = 'none'
	}

	public enableDiceRollerTab(): void {
		this._diceRollerTab.style.pointerEvents = 'all'
	}

	public disableDiceRollerTab(): void {
		this._diceRollerTab.style.pointerEvents = 'none'
	}
}
