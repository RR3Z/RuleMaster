import { ClampZoom, Viewport } from 'pixi-viewport'
import { Renderer } from 'pixi.js'

export default abstract class Camera extends Viewport {
	protected _zoomMinScale: number = 0.25
	protected _zoomMaxScale: number = 1

	constructor(renderer: Renderer) {
		super({
			screenHeight: window.innerHeight,
			screenWidth: window.innerWidth,
			events: renderer.events,
			disableOnContextMenu: true,
		})

		this.enablePlugins()

		window.addEventListener('resize', () => this.onResize())
	}

	protected enablePlugins(): void {
		this.wheel()
		this.clampZoom({})

		this.updatePlugins()
	}

	protected updatePlugins(): void {
		this.updateWorldSizes()
		this.updateClampZoom()
	}

	private updateWorldSizes(): void {
		const bounds = this.getBounds()
		this.worldHeight = bounds.maxY - bounds.minY
		this.worldWidth = bounds.maxX - bounds.minX
	}

	private updateClampZoom(): void {
		const clampZoom = this.plugins.get('clamp-zoom')! as ClampZoom

		clampZoom.options.minHeight = this.worldHeight * this._zoomMinScale
		clampZoom.options.minWidth = this.worldWidth * this._zoomMinScale
		clampZoom.options.maxHeight = this.worldHeight * this._zoomMaxScale
		clampZoom.options.maxWidth = this.worldWidth * this._zoomMaxScale

		clampZoom.reset()
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
