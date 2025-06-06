import { CONFIG } from '@/app/config'
import DiceRoller from './DiceRoller/DiceRoller'
import DicesLoader from './DiceRoller/DicesLoader'
import InteractiveMap from './InteractiveMap/InteractiveMap'
import { InteractiveMapData } from './InteractiveMap/Types/InteractiveMapData'
import Logger from './Logger/Logger'
import TutorialSystem from './TutorialSystem/TutorialSystem'
import { TutorialStep } from './TutorialSystem/Types/TutorialStep'
import { Game } from './Types/Game'

type TutorialFileFormat =
	| {
			completionTestLink?: string
			steps: TutorialStep[]
	  }
	| TutorialStep[]

export default class InteractiveLesson {
	private _interactiveMap!: InteractiveMap
	private _diceRoller!: DiceRoller
	private _tutorialSystem!: TutorialSystem
	private _logger!: Logger
	private _completionTestLink?: string

	constructor() {}

	public async init(
		game: Game,
		tutorialDataFilePath: string,
		interactiveMapDataFilePath: string,
		dicesModelsFilePath: string,
		playerVisualFilePath: string,
		enemiesVisualFilePath: string[]
	): Promise<void> {
		// Logger
		this._logger = new Logger()

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
		const tutorialRawData: TutorialFileFormat =
			await tutorialDataResponse.json()
		let steps: TutorialStep[]
		if (Array.isArray(tutorialRawData)) {
			steps = tutorialRawData
			this._completionTestLink = undefined
		} else {
			steps = tutorialRawData.steps
			this._completionTestLink = tutorialRawData.completionTestLink
		}
		this._tutorialSystem = new TutorialSystem(game)
		await this._tutorialSystem.init(
			steps,
			this._logger,
			this.diceRoller,
			this._interactiveMap.actionsManager,
			this._interactiveMap.view.visualEngine.player,
			this._interactiveMap.view.visualEngine.areaHighlighter
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

	public get logger(): Logger {
		return this._logger
	}

	public get completionTestLink(): string | undefined {
		return this._completionTestLink
	}
}
