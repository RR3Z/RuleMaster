import Rapier from "@dimforge/rapier3d-compat"
import { Mesh, Object3D } from "three"
import {
	createDynamicRigidBody,
	createStaticRigidBody,
} from "../engine/physic/physicUtils"

export default class World extends Object3D {
	private objects: Object3D[] = []
	private physicalWorld: Rapier.World

	constructor(physicalWorld: Rapier.World) {
		super()

		this.physicalWorld = physicalWorld
	}

	public updateObjects(): void {
		this.objects.forEach(object => {
			if (
				object.userData.rigidBody.bodyType() === Rapier.RigidBodyType.Dynamic
			) {
				object.position.copy(object.userData.rigidBody.translation())
				object.quaternion.copy(object.userData.rigidBody.rotation())
			}
		})
	}

	public addObjects(
		objects: Object3D[],
		isStaticObjects: boolean = false,
		isVisibleObjects: boolean = true
	): void {
		this.removeObjects(this.objects)

		if (isVisibleObjects) this.addVisuals(objects)
		if (isStaticObjects) this.addStaticPhysic(objects)
		else this.addDynamicPhysic(objects)

		console.log("World -> Add Objects", this.objects, this)
	}

	public removeObjects(objects: Object3D[]): void {
		const objectsToRemove = objects.slice()

		objectsToRemove.forEach(object => {
			// Remove Physic
			if (this.physicalWorld.getCollider(object.userData.collider))
				this.physicalWorld.removeCollider(object.userData.collider, true)
			if (this.physicalWorld.getRigidBody(object.userData.rigidBody))
				this.physicalWorld.removeRigidBody(object.userData.rigidBody)

			// Remove Visual
			this.remove(object)

			// Remove Object
			this.objects.splice(this.objects.indexOf(object), 1)
		})

		console.log("World -> Remove Objects: ", this.objects, this)
	}

	public clearWorld(): void {
		this.removeObjects(this.objects)
		this.objects.splice(0, this.objects.length)

		console.log("World -> Clear World: ", this.objects, this)
	}

	private addDynamicPhysic(meshes: Object3D[]): void {
		meshes.forEach(mesh => {
			const physicObjects = createDynamicRigidBody(
				mesh as Mesh,
				this.physicalWorld
			)
			mesh.userData.rigidBody = physicObjects.rigidBody
			mesh.userData.collider = physicObjects.collider
		})
	}

	private addStaticPhysic(meshes: Object3D[]): void {
		meshes.forEach(mesh => {
			const physicObjects = createStaticRigidBody(
				mesh as Mesh,
				this.physicalWorld
			)
			mesh.userData.rigidBody = physicObjects.rigidBody
			mesh.userData.collider = physicObjects.collider
		})
	}

	private addVisuals(visuals: Object3D[]): void {
		visuals.forEach(visual => {
			visual.position.set(0, 25, 0)
			visual.receiveShadow = true
			visual.castShadow = true

			this.add(visual)
			if (!this.objects.includes(visual)) this.objects.push(visual)
		})
	}
}
