import GridOfCellsVisualUtils from '../../Utils/GridOfCellsVisualUtils'
import { GridOfCellsVisualData } from '../_Types/GridOfCellsVisualData'
import PlayerTrackingCamera from '../Camera/PlayerTrackingCamera'
import DraggableToken from '../Entities/Tokens/DraggableToken'
import GridOfCells from '../Grid/GridOfCells'
import GridOfCellsVisual from '../Grid/GridOfCellsVisual'
import MapVisualEngine from './MapVisualEngine'

export default class GridOfCellsVisualEngine extends MapVisualEngine {
	private readonly _data: GridOfCellsVisualData
	private readonly _gridLogic: GridOfCells

	private _player!: DraggableToken
	private _visualUtils: GridOfCellsVisualUtils

	constructor(data: GridOfCellsVisualData, grid: GridOfCells) {
		super()

		this._data = data
		this._gridLogic = grid
		this._visualUtils = new GridOfCellsVisualUtils(grid.width, grid.height)
	}

	public override async init(): Promise<void> {
		await super.init()

		const camera = new PlayerTrackingCamera(this.renderer)
		this.stage.addChild(camera)
		camera.addChild(this._sceneObjects)

		const gridVisual = new GridOfCellsVisual(this._data, {
			width: this._gridLogic.width,
			height: this._gridLogic.height,
		})
		this._sceneObjects.addChild(gridVisual)

		this._player = new DraggableToken({
			visualData: this._data.player,
			startPos: this._gridLogic.playerPos(),
			radius: this._data.cell.size / 2,
			worldSpaceContainer: camera,
			visualUtils: this._visualUtils,
		})
		camera.target = this._player
		this._sceneObjects.addChild(this._player)
	}
}
