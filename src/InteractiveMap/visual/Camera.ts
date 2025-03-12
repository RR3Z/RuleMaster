import { Viewport } from 'pixi-viewport'
import { Renderer } from 'pixi.js'

export default class Camera extends Viewport {
	constructor(
		renderer: Renderer,
		screenSizes: { width: number; height: number }
	) {
		super({
			screenHeight: screenSizes.height,
			screenWidth: screenSizes.width,
			worldWidth: screenSizes.height,
			worldHeight: screenSizes.width,
			events: renderer.events,
			disableOnContextMenu: true,
		})

		// PLugins
		this.enablePlugins()

		// Events
		window.addEventListener('resize', this.onResize)
		// this.on('zoomed', () => this.updateClamp())
		// this.on('moved', () => this.updateClamp())
	}

	public updateSettings(): void {
		this.updateWorldSizes()
		this.updateClamp()
		this.moveCenter(this.worldWidth / 2, this.worldHeight / 2)

		console.log('Bounds', this.getBounds(true))
		console.log('Screen size:', this.screenWidth, this.screenHeight)
		console.log('World size:', this.worldWidth, this.worldHeight)
		console.log('Scale', this.scale)
		console.log('Clamp Options', this.plugins.get('clamp')?.options)
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
		this.resize(window.innerWidth, window.innerHeight)
	}
}
