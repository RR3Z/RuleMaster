import { Renderer } from 'pixi.js'
import Token from '../Tokens/Token'
import Camera from './Camera'

export default class PlayerTrackingCamera extends Camera {
	private _target!: Token

	constructor(renderer: Renderer) {
		super(renderer)
	}

	public set target(target: Token) {
		this._target = target
		this.moveCenter(this._target.x, this._target.y)
		this.centerOnTarget()
	}

	private centerOnTarget(): void {
		this.follow(this._target, {
			speed: 5,
			// radius: 200,
		})
	}
}
