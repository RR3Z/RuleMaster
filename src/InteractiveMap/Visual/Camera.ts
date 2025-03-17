import { Viewport } from 'pixi-viewport'
import { Renderer } from 'pixi.js'

export default class Camera extends Viewport {
	// Zoom Settings
	public zoomMinScale: number = 0.5
	public zoomMaxScale: number = 1

	constructor(renderer: Renderer) {
		super({
			screenHeight: window.innerHeight,
			screenWidth: window.innerWidth,
			worldWidth: window.innerHeight,
			worldHeight: window.innerWidth,
			events: renderer.events,
			disableOnContextMenu: true,
		})

		// PLugins
		this.enablePlugins()

		// Events
		window.addEventListener('resize', this.onResize.bind(this))
	}

	public updateSettings(): void {
		this.updateWorldSizes()
		this.updateClamp()
		this.moveCenter(this.worldWidth / 2, this.worldHeight / 2)
	}

	private enablePlugins(): void {
		this.wheel()
		this.drag({ mouseButtons: 'right' })
		this.clamp({
			left: -this.screenWidth / 2,
			right: this.screenWidth / 2,
			top: -this.screenHeight / 2,
			bottom: this.screenHeight / 2,
			direction: 'all',
		})
		this.clampZoom({
			minScale: this.zoomMinScale,
			maxScale: this.zoomMaxScale,
		})
	}

	private updateWorldSizes(): void {
		const bounds = this.getBounds(true)
		this.worldHeight = bounds.maxY - bounds.minY
		this.worldWidth = bounds.maxX - bounds.minX
	}

	private updateClamp(): void {
		const clampPlugin = this.plugins.get('clamp')!
		const bounds = this.getBounds(true)

		clampPlugin.options.left = bounds.minX
		clampPlugin.options.right = bounds.maxX
		clampPlugin.options.top = bounds.minY
		clampPlugin.options.bottom = bounds.maxY

		clampPlugin.reset()
	}

	private onResize(): void {
		this.resize(
			window.innerWidth,
			window.innerHeight,
			this.worldWidth,
			this.worldHeight
		)

		this.moveCenter(this.worldWidth / 2, this.worldHeight / 2)
	}
}
