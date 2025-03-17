import { default as Rapier } from '@dimforge/rapier3d-compat'
import { Mesh, Object3D } from 'three'
import PhysicUtils from '../Engine/Physic/PhysicUtils.ts'
import Dice from './Dice.ts'

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
			dice.init()

			if (!this.dices.includes(dice)) {
				this.dices.push(dice)
			}
		})
	}

	public removeDices(dices: Dice[]): void {
		const dicesToRemove = dices.slice()

		dicesToRemove.forEach(dice => {
			// Remove Physic
			this.physicalWorld.removeCollider(dice.collider, false)
			this.physicalWorld.removeRigidBody(dice.rigidBody)

			// Remove Visual
			this.remove(dice.visual)

			// Remove Dice
			this.dices.splice(this.dices.indexOf(dice), 1)
		})
	}

	private addPhysic(dice: Dice): void {
		const physicObjects = PhysicUtils.createDynamicRigidBody(
			dice.visual as Mesh,
			this.physicalWorld
		)

		dice.rigidBody = physicObjects.rigidBody
		dice.collider = physicObjects.collider
	}

	private addVisual(dice: Dice): void {
		dice.visual.receiveShadow = true
		dice.visual.castShadow = true

		this.add(dice.visual)
	}
}
