import { Container, Graphics } from 'pixi.js'
import { CellSettings, GridSettings } from '../MapEditor.ts'
import MapEditorGUI from '../MapEditorGUI.ts'
import CellVisual from './CellVisual.ts'

export default class GridVisual extends Container {
	private _gridSettings: GridSettings
	private _cellSettings: CellSettings[][]

	constructor(
		editor: MapEditorGUI,
		gridSettings: GridSettings,
		cellsSettings: CellSettings[][]
	) {
		super()

		this._gridSettings = gridSettings
		this._cellSettings = cellsSettings

		this.drawGrid()

		for (let x = 0; x < this._gridSettings.width; x++) {
			for (let y = 0; y < this._gridSettings.height; y++) {
				this.addChild(
					new CellVisual(
						editor,
						this._cellSettings[x][y],
						this._gridSettings.cellSize
					)
				)
			}
		}
	}

	private drawGrid(): void {
		// Vertical lines
		for (let i = 0; i < this._gridSettings.width + 1; i++) {
			const line = new Graphics()
				.moveTo(i * this._gridSettings.cellSize, 0)
				.lineTo(
					i * this._gridSettings.cellSize,
					this._gridSettings.cellSize * this._gridSettings.height
				)
				.stroke({ color: this._gridSettings.cellColor, pixelLine: true })
			this.addChild(line)
		}

		// Horizontal lines
		for (let i = 0; i < this._gridSettings.height + 1; i++) {
			const line = new Graphics()
				.moveTo(0, i * this._gridSettings.cellSize)
				.lineTo(
					this._gridSettings.cellSize * this._gridSettings.width,
					i * this._gridSettings.cellSize
				)
				.stroke({ color: this._gridSettings.cellColor, pixelLine: true })
			this.addChild(line)
		}
	}
}
