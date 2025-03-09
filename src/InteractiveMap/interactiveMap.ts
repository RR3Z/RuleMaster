import * as PIXI from "pixi.js"
import config from "./config"
import Grid from "./grid"

export default class InteractiveMap {
	private app: PIXI.Application
	private callbackUpdate!: () => void

	constructor() {
		this.app = new PIXI.Application()
	}

	public async init() {
		await this.app.init({ resizeTo: window })
		this.app.canvas.id = "interactiveMap"
		document.body.appendChild(this.app.canvas)

		this.addGrid(7, 7)

		this.startLoop()
	}

	public onUpdate(callback: () => void): void {
		this.callbackUpdate = callback
	}

	private startLoop() {
		this.app.ticker.add(() => {
			if (this.callbackUpdate) this.callbackUpdate()
		})
	}

	private addGrid(width: number, height: number) {
		const grid = new Grid(width, height)
		// TODO: temp fix for centering grid
		grid.pivot.set(
			(grid.width * config.grid.cellSize) / 2,
			(grid.height * config.grid.cellSize) / 2
		)
		grid.position.set(this.app.screen.width / 2, this.app.screen.height / 2)
		this.app.stage.addChild(grid)
	}
}
