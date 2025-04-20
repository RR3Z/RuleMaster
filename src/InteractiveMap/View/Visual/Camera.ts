import { Viewport } from 'pixi-viewport'
import { Renderer } from 'pixi.js'

export default class Camera extends Viewport {
	constructor(renderer: Renderer) {
		super({
			screenHeight: window.innerHeight,
			screenWidth: window.innerWidth,
			events: renderer.events,
			disableOnContextMenu: true,
		})

		this.onResize = this.onResize.bind(this)
		window.addEventListener('resize', this.onResize)
	}

	private onResize(): void {
		this.resize(
			window.innerWidth,
			window.innerHeight,
			this.worldWidth,
			this.worldHeight
		)
	}
}
