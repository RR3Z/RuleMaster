import React from 'react'
import { createRoot } from 'react-dom/client'
import DiceRoller from '../DiceRoller/DiceRoller'
import { Game } from '../InteractiveMap/_Types/GameType'
import InteractiveMap from '../InteractiveMap/InteractiveMap'
import App from '../React/App'
import { loadFileData } from '../Utils/FileUtils'

export default class InteractiveLesson {
	private _interactiveMap!: InteractiveMap
	private _diceRoller!: DiceRoller
	// private _tutorialSystem!: TutorialSystem
	// private _loggingSystem:LoggingSystem

	constructor() {}

	public async init(
		game: Game,
		mapDataFilePath: string,
		dicesModelFilePath: string
	): Promise<void> {
		const mapData = await loadFileData(mapDataFilePath)
		this._interactiveMap = new InteractiveMap(game, mapData)
		await this._interactiveMap.init()

		this._diceRoller = new DiceRoller()
		await this._diceRoller.init(dicesModelFilePath)

		await this.renderUI()

		// TODO: add tutorialSystem
		// TODO: add logging system
	}

	private async renderUI(): Promise<void> {
		const rootElement = document.getElementById('UI')
		if (!rootElement) {
			const UIElement = document.createElement('div')
			UIElement.id = 'UI'
			document.body.appendChild(UIElement)
		}

		return new Promise<void>(resolve => {
			createRoot(rootElement as HTMLDivElement).render(
				<App onMount={resolve} diceRollerModule={this._diceRoller} />
			)
		})
	}
}
