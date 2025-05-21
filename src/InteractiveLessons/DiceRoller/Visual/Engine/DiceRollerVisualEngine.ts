import { Object3D, Scene } from 'three'
import { DiceType } from '../../Types/DiceType'
import Camera from '../Camera'
import Graphic from '../Graphic'
import Light from '../Light'

export default class DiceRollerVisualEngine {
	private _scene: Scene
	private _camera: Camera
	private _light: Light
	private _graphic: Graphic
	private _dicesVisual: Map<DiceType, Object3D>

	constructor(dicesVisual: Map<DiceType, Object3D>) {
		this._scene = new Scene()
		this._camera = new Camera()
		this._light = new Light()
		this._graphic = new Graphic(this._scene, this._camera)
		this._dicesVisual = dicesVisual

		this._scene.add(this._camera)
		this._scene.add(this._light)
	}

	public get graphic(): Graphic {
		return this._graphic
	}

	public get scene(): Scene {
		return this._scene
	}

	public addDice(type: DiceType): Object3D {
		const model = this._dicesVisual.get(type)
		if (!model)
			throw new Error('DiceRollerVisualEngine -> addDice(): Unknown dice type!')

		const clone = model.clone(true)
		clone.scale.set(4, 4, 4)

		this._scene.add(clone)

		return clone
	}

	public removeDice(dice: Object3D): void {
		if (!this._scene.children.includes(dice))
			throw new Error(
				"DiceRollerVisualEngine -> removeDice(): Dice isn't on scene!"
			)
		this._scene.remove(dice)
	}
}
