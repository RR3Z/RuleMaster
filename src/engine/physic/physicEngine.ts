import * as RAPIER from "@dimforge/rapier3d-compat"

await RAPIER.init()

export default class PhysicEngine {
	private _physicalWorld!: RAPIER.World
	private physicGravityCoefficient: number

	constructor() {
		this.physicGravityCoefficient = 5
		this._physicalWorld = new RAPIER.World(
			new RAPIER.Vector3(0, -9.82 * this.physicGravityCoefficient, 0)
		)
	}

	public get physicalWorld(): RAPIER.World {
		return this._physicalWorld
	}
}
