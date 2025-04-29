import { GridOfCellsVisualData } from '../_Types/GridOfCellsVisualData'
import PlayerTrackingCamera from '../Camera/PlayerTrackingCamera'
import DraggableToken from '../Entities/Tokens/DraggableToken'
import Grid from '../Grid/Grid'
import GridVisual from '../Grid/GridVisual'
import MapVisualEngine from './MapVisualEngine'

export default class GridOfCellsVisualEngine extends MapVisualEngine {
	private readonly _data: GridOfCellsVisualData
	private readonly _gridLogic: Grid

	private _player!: DraggableToken

	constructor(data: GridOfCellsVisualData, grid: Grid) {
		super()

		this._data = data
		this._gridLogic = grid
	}

	public override async init(): Promise<void> {
		await super.init()

		const camera = new PlayerTrackingCamera(this.renderer)
		this.stage.addChild(camera)
		camera.addChild(this._sceneObjects)

		const gridVisual = new GridVisual(this._data, {
			width: this._gridLogic.width,
			height: this._gridLogic.height,
		})
		this._sceneObjects.addChild(gridVisual)

		this._player = new DraggableToken({
			visualData: this._data.player,
			startPos: this._gridLogic.playerPos(),
			radius: this._data.cell.size / 2,
			worldSpaceContainer: camera,
		})
		camera.target = this._player
		this._sceneObjects.addChild(this._player)
	}
}
