import * as THREE from 'three'
import World from '../../Entities/World.ts'
import Camera from './Camera.ts'
import Graphic from './Graphic.ts'
import Light from './Light.ts'

export default class VisualEngine {
	private _scene: THREE.Scene
	private _camera: Camera
	private _light: Light
	private _graphic: Graphic

	constructor(world: World) {
		this._scene = new THREE.Scene()
		this._camera = new Camera()
		this._light = new Light()
		this._graphic = new Graphic(this._scene, this._camera)

		this._scene.add(this._camera)
		this._scene.add(this._light)
		this._scene.add(world)
	}

	public get scene(): THREE.Scene {
		return this._scene
	}

	public get camera(): Camera {
		return this._camera
	}

	public get graphic(): Graphic {
		return this._graphic
	}
}
