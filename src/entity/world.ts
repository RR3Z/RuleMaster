import { default as Rapier, default as RAPIER } from "@dimforge/rapier3d-compat"
import { Mesh, Object3D } from "three"
import { createDynamicRigidBody } from "../engine/physic/physicUtils.ts"
import Dice from "./dice.ts"

export default class World extends Object3D {
	private dices: Dice[]
	private physicalWorld: Rapier.World

	constructor(physicalWorld: Rapier.World) {
		super()

		this.dices = []
		this.physicalWorld = physicalWorld
	}

	public update(): void {
		this.dices.forEach(dice => {
			if (dice.rigidBody!.bodyType() === Rapier.RigidBodyType.Dynamic) {
				dice.visual.position.copy(dice.rigidBody!.translation())
				dice.visual.quaternion.copy(dice.rigidBody!.rotation())
			}
		})
	}

	public addDices(dices: Dice[]): void {
		this.removeDices(this.dices)

		dices.forEach(dice => {
			this.addVisual(dice)
			this.addPhysic(dice)

			if (!this.dices.includes(dice)) {
				this.dices.push(dice)
			}
		})
	}

	public removeDices(dices: Dice[]): void {
		const dicesToRemove = dices.slice()

		dicesToRemove.forEach(dice => {
			// Remove Physic
			this.physicalWorld.removeCollider(dice.collider!, true)
			this.physicalWorld.removeRigidBody(dice.rigidBody!)

			// Remove Visual
			this.remove(dice.visual)

			// Remove Dice
			this.dices.splice(this.dices.indexOf(dice), 1)
		})
	}

	private addPhysic(dice: Dice): void {
		const physicObjects = createDynamicRigidBody(
			dice.visual as Mesh,
			this.physicalWorld
		)

		dice.rigidBody = physicObjects.rigidBody
		dice.collider = physicObjects.collider

		dice.setVelocity(
			new Rapier.Vector3(
				Math.random() * 20 + 1,
				Math.random() * 20 + 1,
				Math.random() * 20 + 1
			),
			new RAPIER.Vector3(0, 0, 0)
		)
	}

	private addVisual(dice: Dice): void {
		dice.visual.position.set(0, 25, 0)
		dice.visual.receiveShadow = true
		dice.visual.castShadow = true

		this.add(dice.visual)
	}
}
