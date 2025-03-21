import { Container, Graphics } from 'pixi.js'
import { CellSettings, GridSettings } from '../MapEditor.ts'
import MapEditorGUI from '../MapEditorGUI.ts'
import CellVisual from './CellVisual.ts'

export default class GridVisual extends Container {
	constructor(
		editor: MapEditorGUI,
		gridSettings: GridSettings,
		cellsSettings: CellSettings[][]
	) {
		super()

		this.drawGrid(gridSettings)
		this.createCells(editor, gridSettings, cellsSettings)
	}

	private drawGrid(grid: GridSettings): void {
		// Vertical lines
		for (let i = 0; i < grid.width + 1; i++) {
			const line = new Graphics()
				.moveTo(i * grid.cellSize, 0)
				.lineTo(i * grid.cellSize, grid.cellSize * grid.height)
				.stroke({ color: grid.cellColor, pixelLine: true })
			this.addChild(line)
		}

		// Horizontal lines
		for (let i = 0; i < grid.height + 1; i++) {
			const line = new Graphics()
				.moveTo(0, i * grid.cellSize)
				.lineTo(grid.cellSize * grid.width, i * grid.cellSize)
				.stroke({ color: grid.cellColor, pixelLine: true })
			this.addChild(line)
		}
	}

	private createCells(
		editor: MapEditorGUI,
		grid: GridSettings,
		cells: CellSettings[][]
	): void {
		for (let x = 0; x < grid.width; x++) {
			for (let y = 0; y < grid.height; y++) {
				this.addChild(new CellVisual(editor, cells[x][y], grid.cellSize))
			}
		}
	}
}
