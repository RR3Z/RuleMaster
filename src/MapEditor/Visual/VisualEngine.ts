import { Application, Container } from 'pixi.js'
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

	public setupScene(editor: MapEditorGUI, mapData: MapData): void {
		// Scene Setup
		if (this._camera.children.length > 0) this._camera.removeChild(this._scene)
		this._scene = new Container()
		this._camera.addChild(this._scene) // Make objects move with camera

		// if (mapData.mapFilePath) {
		// 	let mapBackgroundPromise = Assets.load(mapData.mapFilePath)
		// 	mapBackgroundPromise.then(asset => {
		// 		const sprite = new Sprite(asset)
		// 		this._scene.addChild(sprite)
		// 	})
		// }
		this._scene.addChild(new GridVisual(editor, mapData.grid, mapData.cells))

		this._camera.updateSettings()
	}
}
