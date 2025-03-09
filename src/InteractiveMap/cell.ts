import { Container, Graphics } from "pixi.js"
import config from "./config"

export default class Cell extends Container {
	private _x: number
	private _y: number

	constructor(x: number, y: number) {
		super()

		this._x = x
		this._y = y

		this.draw()
	}

	public get x(): number {
		return this._x
	}

	public get y(): number {
		return this._y
	}

	public get coordinates(): { x: number; y: number } {
		return { x: this._x, y: this._y }
	}

	private draw() {
		const cellVisual = new Graphics()
			.rect(
				this.x * config.grid.cellSize,
				this.y * config.grid.cellSize,
				config.grid.cellSize,
				config.grid.cellSize
			)
			.fill(0xff0000)
		cellVisual.alpha = 0

		cellVisual.eventMode = "static"
		cellVisual.on("pointerdown", () => {
			this.onClick()
		})

		this.addChild(cellVisual)
	}

	private onClick() {
		console.log(this.x, this.y)
	}
}
