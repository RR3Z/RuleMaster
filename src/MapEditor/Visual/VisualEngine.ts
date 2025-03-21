import { Application, Assets, Container, Sprite } from 'pixi.js'
import Camera from '../../InteractiveMap/Visual/Camera.ts'
import { MapData } from '../MapEditor.ts'
import MapEditorGUI from '../MapEditorGUI.ts'
import GridVisual from './GridVisual.ts'

export default class VisualEngine extends Application {
	private _scene!: Container
	private _camera!: Camera

	constructor() {
		super()
	}

	public async init(): Promise<void> {
		// Pixi.Js Initialization
		await super.init({ resizeTo: window })
		this.canvas.id = 'mapEditor'

		// Objects Initialization
		this._camera = new Camera(this.renderer)
		this.stage.addChild(this._camera)
		this._scene = new Container()
	}

	public async setupScene(
		editor: MapEditorGUI,
		mapData: MapData
	): Promise<void> {
		// Scene Setup
		if (this._camera.children.length > 0) this._camera.removeChild(this._scene)
		this._scene = new Container()
		this._camera.addChild(this._scene) // Make objects move with camera

		if (mapData.mapFilePath) {
			let mapBackground = await Assets.load(mapData.mapFilePath)
			const backgroundSprite = new Sprite(mapBackground)
			backgroundSprite.scale.x =
				(mapData.grid.width * mapData.grid.cellSize) /
				backgroundSprite.texture.width
			backgroundSprite.scale.y =
				(mapData.grid.height * mapData.grid.cellSize) /
				backgroundSprite.texture.height
			backgroundSprite.anchor.set(0, 0)
			backgroundSprite.position.set(0, 0)

			this._scene.addChild(backgroundSprite)
			console.log(this._scene.getBounds())
		}
		this._scene.addChild(new GridVisual(editor, mapData.grid, mapData.cells))

		this._camera.updateSettings()
	}
}
