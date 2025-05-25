import { CONFIG } from '@/app/config'
import DiceRoller from './DiceRoller/DiceRoller'
import DicesLoader from './DiceRoller/DicesLoader'
import InteractiveMap from './InteractiveMap/InteractiveMap'
import { InteractiveMapData } from './InteractiveMap/Types/InteractiveMapData'
import TutorialSystem from './TutorialSystem/TutorialSystem'
import { TutorialStep } from './TutorialSystem/Types/TutorialStep'
import { Game } from './Types/Game'

export default class InteractiveLesson {
	private _interactiveMap!: InteractiveMap
	private _diceRoller!: DiceRoller
	private _tutorialSystem!: TutorialSystem

	constructor() {}

	public async init(
		game: Game,
		tutorialDataFilePath: string,
		interactiveMapDataFilePath: string,
		dicesModelsFilePath: string,
		playerVisualFilePath: string,
		enemiesVisualFilePath: string[]
	): Promise<void> {
		// Dice Roller
		const dicesLoader = new DicesLoader()
		const dicesModels = await dicesLoader.loadModels(dicesModelsFilePath)
		this._diceRoller = new DiceRoller(dicesModels)

		// Interactive Map
		const interactiveMapDataResponse = await fetch(
			`${CONFIG.siteURL}${interactiveMapDataFilePath}`
		)
		const interactiveMapData: InteractiveMapData =
			await interactiveMapDataResponse.json()
		this._interactiveMap = new InteractiveMap(game, interactiveMapData)
		await this._interactiveMap.init(playerVisualFilePath, enemiesVisualFilePath)

		// Tutorial System
		const tutorialDataResponse = await fetch(
			`${CONFIG.siteURL}${tutorialDataFilePath}`
		)
		const tutorialData: TutorialStep[] = await tutorialDataResponse.json()
		this._tutorialSystem = new TutorialSystem(game)
		await this._tutorialSystem.init(
			tutorialData,
			this.diceRoller,
			this._interactiveMap.actionsManager
		)
	}

	public get diceRoller(): DiceRoller {
		return this._diceRoller
	}

	public get interactiveMap(): InteractiveMap {
		return this._interactiveMap
	}

	public get tutorialSystem(): TutorialSystem {
		return this._tutorialSystem
	}
}
