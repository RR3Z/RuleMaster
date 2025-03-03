import Rapier from "@dimforge/rapier3d-compat"
import { Mesh, Object3D } from "three"
import {
	createDynamicRigidBody,
	createStaticRigidBody,
} from "../engine/physic/physicUtils.ts"
import Dice from "./dice.ts"

export default class World extends Object3D {
	private dices: Dice[] = []
	private physicalWorld: Rapier.World

	constructor(physicalWorld: Rapier.World) {
		super()

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

	public addDices(
		dices: Dice[],
		isStatic: boolean = false,
		isVisible: boolean = true
	): void {
		this.removeDices(this.dices)

		dices.forEach(dice => {
			if (isVisible) this.addVisual(dice)
			if (isStatic) this.addStaticPhysic(dice)
			else this.addDynamicPhysic(dice)

			if (!this.dices.includes(dice)) this.dices.push(dice)
		})

		console.log("World -> Add Dices", this.dices) // TODO: remove it in the end
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

		console.log("World -> Remove Dices: ", this.dices) // TODO: remove it in the end
	}

	public clearWorld(): void {
		this.dices.forEach(dice => {
			this.remove(dice.visual)
		})
		this.dices.splice(0, this.dices.length)

		console.log("World -> Clear World: ", this.dices)
	}

	private addDynamicPhysic(dice: Dice): void {
		const physicObjects = createDynamicRigidBody(
			dice.visual as Mesh,
			this.physicalWorld
		)

		physicObjects.rigidBody.setAngvel(
			new Rapier.Vector3(
				Math.random() * 20 + 1,
				Math.random() * 20 + 1,
				Math.random() * 20 + 1
			),
			true
		)

		dice.rigidBody = physicObjects.rigidBody
		dice.collider = physicObjects.collider
	}

	private addStaticPhysic(dice: Dice): void {
		const physicObjects = createStaticRigidBody(
			dice.visual as Mesh,
			this.physicalWorld
		)
		dice.rigidBody = physicObjects.rigidBody
		dice.collider = physicObjects.collider
	}

	private addVisual(dice: Dice): void {
		dice.visual.position.set(0, 25, 0)
		dice.visual.receiveShadow = true
		dice.visual.castShadow = true

		this.add(dice.visual)
	}
}
