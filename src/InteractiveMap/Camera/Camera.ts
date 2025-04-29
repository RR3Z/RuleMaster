import { Viewport } from 'pixi-viewport'
import { Renderer } from 'pixi.js'

export default abstract class Camera extends Viewport {
	constructor(renderer: Renderer) {
		super({
			screenHeight: window.innerHeight,
			screenWidth: window.innerWidth,
			events: renderer.events,
			disableOnContextMenu: true,
		})

		window.addEventListener('resize', () => this.onResize())
	}

	private onResize() {
		this.resize(
			window.innerWidth,
			window.innerHeight,
			this.worldWidth,
			this.worldHeight
		)
	}
}
