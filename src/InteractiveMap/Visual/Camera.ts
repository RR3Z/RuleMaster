import { Clamp, ClampZoom, Viewport } from 'pixi-viewport'
import { Renderer } from 'pixi.js'

export default class Camera extends Viewport {
	// Zoom Settings
	public zoomMinScale: number = 0.25
	public zoomMaxScale: number = 0.8

	constructor(renderer: Renderer) {
		super({
			screenHeight: window.innerHeight,
			screenWidth: window.innerWidth,
			events: renderer.events,
			disableOnContextMenu: true,
		})

		// Plugins
		this.enablePlugins()

		// Events
		window.addEventListener('resize', () => this.onResize())
	}

	public updateSettings(): void {
		this.updateWorldSizes()
		this.updateClamp()
		this.updateClampZoom()
		this.moveCenter(this.worldWidth / 2, this.worldHeight / 2)
	}

	private enablePlugins(): void {
		this.wheel()
		this.drag({ mouseButtons: 'right', wheel: false, factor: 0.9 })
		this.clamp()
		this.clampZoom({})
	}

	private updateWorldSizes(): void {
		const bounds = this.getBounds()
		this.worldHeight = bounds.maxY - bounds.minY
		this.worldWidth = bounds.maxX - bounds.minX
	}

	private updateClamp(): void {
		const clamp = this.plugins.get('clamp')! as Clamp

		clamp.options.left = 0
		clamp.options.right = this.worldWidth
		clamp.options.top = 0
		clamp.options.bottom = this.worldHeight

		clamp.reset()
	}

	private updateClampZoom(): void {
		const clampZoom = this.plugins.get('clamp-zoom')! as ClampZoom

		clampZoom.options.minHeight = this.worldHeight * this.zoomMinScale
		clampZoom.options.minWidth = this.worldWidth * this.zoomMinScale
		clampZoom.options.maxHeight = this.worldHeight * this.zoomMaxScale
		clampZoom.options.maxWidth = this.worldWidth * this.zoomMaxScale

		clampZoom.reset()
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
