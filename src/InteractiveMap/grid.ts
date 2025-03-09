import { Container, Graphics } from "pixi.js"
import Cell from "./cell.ts"
import config from "./config.ts"

export default class Grid extends Container {
	// Grid Settings
	public isBoundariesEnabled: boolean
	// Grid Sizes
	private _gridWidth: number
	private _gridHeight: number
	// Cells
	private _cells: Cell[]

	constructor(
		width: number,
		height: number,
		isBoundariesEnabled: boolean = false
	) {
		super()

		this._gridWidth = width
		this._gridHeight = height
		this._cells = []
		this.isBoundariesEnabled = isBoundariesEnabled

		this.init()
	}

	public get width(): number {
		return this._gridWidth
	}

	public get height(): number {
		return this._gridHeight
	}

	public cellByCoordinates(x: number, y: number): Cell | undefined {
		return this._cells.find(cell => cell.x === x && cell.y === y)
	}

	private init() {
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				const cell = new Cell(x, y)
				this.addChild(cell)
				this._cells.push(cell)
			}
		}

		this.draw()
	}

	private draw() {
		// Vertical lines
		for (
			let i = this.isBoundariesEnabled ? 0 : 1;
			i < this.width + (this.isBoundariesEnabled ? 1 : 0);
			i++
		) {
			const line = new Graphics()
				.moveTo(i * config.grid.cellSize, 0)
				.lineTo(i * config.grid.cellSize, config.grid.cellSize * this.height)
				.stroke({ color: 0xffffff, pixelLine: true, width: 15 })
			this.addChild(line)
		}

		// Horizontal lines
		for (
			let i = this.isBoundariesEnabled ? 0 : 1;
			i < this.height + (this.isBoundariesEnabled ? 1 : 0);
			i++
		) {
			const line = new Graphics()
				.moveTo(0, i * config.grid.cellSize)
				.lineTo(config.grid.cellSize * this.width, i * config.grid.cellSize)
				.stroke({ color: 0xffffff, pixelLine: true, width: 100 })
			this.addChild(line)
		}
	}
}
