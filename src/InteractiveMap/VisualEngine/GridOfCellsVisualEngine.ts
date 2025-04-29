import { GridOfCellsVisualData } from '../_Types/GridOfCellsVisualData'
import DraggableToken from '../Entities/Tokens/DraggableToken'
import Grid from '../Grid/Grid'
import GridVisual from '../Grid/GridVisual'
import MapVisualEngine from './MapVisualEngine'

export default class GridOfCellsVisualEngine extends MapVisualEngine {
	private _grid: GridVisual
	private _player: DraggableToken

	constructor(data: GridOfCellsVisualData, grid: Grid) {
		super()

		// TODO: сделать и добавить камеру
		// this._camera = new Camera(this.renderer)
		// this.stage.addChild(this._camera)
		// this._camera.addChild(this._sceneObjects)
		this.stage.addChild(this._sceneObjects) // TODO: убрать после добавления камеры

		this._grid = new GridVisual(data, {
			width: grid.width,
			height: grid.height,
		})
		this._sceneObjects.addChild(this._grid)

		this._player = new DraggableToken({
			visualData: data.player,
			startPos: grid.playerPos(),
			radius: data.cell.size / 2,
			worldSpaceContainer: this._sceneObjects, // TODO: здесь должна быть камера, чтобы корректно работал Drag
		})
		this._sceneObjects.addChild(this._player)
	}
}
