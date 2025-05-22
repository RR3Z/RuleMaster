import DiceRoller from './DiceRoller/DiceRoller'
import DicesLoader from './DiceRoller/DicesLoader'
import InteractiveMap from './InteractiveMap/InteractiveMap'
import { InteractiveMapData } from './InteractiveMap/Types/InteractiveMapData'
import { Game } from './Types/Game'

export default class InteractiveLesson {
	private _interactiveMap!: InteractiveMap
	private _diceRoller!: DiceRoller

	constructor() {}

	public async init(
		game: Game,
		interactiveMapDataFilePath: string,
		dicesModelsFilePath: string,
		playerVisualFilePath: string,
		enemiesVisualFilePath: string[]
	): Promise<void> {
		// Dice Loader
		const dicesLoader = new DicesLoader()
		const dicesModels = await dicesLoader.loadModels(dicesModelsFilePath)
		this._diceRoller = new DiceRoller(dicesModels)

		// Interactive Map
		const interactiveMapDataResponse = await fetch(
			`http://localhost:3000${interactiveMapDataFilePath}`
		)
		const interactiveMapData: InteractiveMapData =
			await interactiveMapDataResponse.json()
		this._interactiveMap = new InteractiveMap(game, interactiveMapData)
		await this._interactiveMap.init(playerVisualFilePath, enemiesVisualFilePath)
	}

	public get diceRoller(): DiceRoller {
		return this._diceRoller
	}

	public get interactiveMap(): InteractiveMap {
		return this._interactiveMap
	}
}
