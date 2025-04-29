import { Renderer } from 'pixi.js'
import Token from '../Entities/Tokens/Token'
import Camera from './Camera'

// TODO:
export default class PlayerTrackingCamera extends Camera {
	private _target!: Token

	constructor(renderer: Renderer) {
		super(renderer)
	}

	public set target(target: Token) {
		this._target = target
	}
}
