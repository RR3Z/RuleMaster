import RAPIER from '@dimforge/rapier3d-compat'
import { Mesh } from 'three'
import { DiceRollerPhysicComponents } from '../../Types/DiceRollerPhysicComponents'

await RAPIER.init()

export default class DiceRollerPhysicEngine {
	private _physicalWorld: RAPIER.World
	private _gravityCoef: number

	constructor(gravityCoef?: number) {
		if (gravityCoef !== undefined) this._gravityCoef = gravityCoef
		else this._gravityCoef = 5

		this._physicalWorld = new RAPIER.World(
			new RAPIER.Vector3(0, -9.82 * this._gravityCoef, 0)
		)

		this.createWorldBounds()
	}

	public get physicalWorld(): RAPIER.World {
		return this._physicalWorld
	}

	public addPhysicToMesh(mesh: Mesh): DiceRollerPhysicComponents {
		const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
		rigidBodyDesc.setTranslation(
			mesh.position.x,
			mesh.position.y,
			mesh.position.z
		)

		const rigidBody = this._physicalWorld.createRigidBody(rigidBodyDesc)
		const collider = this.createColliderBasedOnMeshGeometry(mesh, rigidBody)

		return { rigidBody, collider }
	}

	public removePhysicComponents(components: DiceRollerPhysicComponents): void {
		this._physicalWorld.removeCollider(components.collider, false)
		this._physicalWorld.removeRigidBody(components.rigidBody)
	}

	private createWorldBounds(): void {
		const width = 107
		const height = 53
		const wallThickness = 2.0 // Увеличиваем толщину
		const wallHalfHeight = 10.0 // Увеличиваем полувысоту

		const wallsConfig = [
			{
				// Пол остается без изменений или немного толще
				type: 'floor',
				position: [0, 0, 0],
				size: [width / 2, 1.0, height / 2], // Немного толще пол
			},
			// {
			// 	// Крыша, чтобы кубики не вылетали вверх
			// 	type: 'roof',
			// 	position: [0, wallHalfHeight * 2, 0], // Позиционируем крышу выше
			// 	size: [width / 2, wallThickness, height / 2],
			// },
			{
				type: 'left',
				position: [-width / 2, wallHalfHeight, 0],
				size: [wallThickness, wallHalfHeight, height / 2],
			},
			{
				type: 'right',
				position: [width / 2, wallHalfHeight, 0],
				size: [wallThickness, wallHalfHeight, height / 2],
			},
			{
				type: 'back',
				position: [0, wallHalfHeight, -height / 2],
				size: [width / 2, wallHalfHeight, wallThickness],
			},
			{
				type: 'front',
				position: [0, wallHalfHeight, height / 2],
				size: [width / 2, wallHalfHeight, wallThickness],
			},
		]

		wallsConfig.forEach(wallConfig => {
			const rigidBodyDesc = RAPIER.RigidBodyDesc.fixed()
			// Position
			rigidBodyDesc.setTranslation(
				wallConfig.position[0],
				wallConfig.position[1],
				wallConfig.position[2]
			)

			const rigidBody = this._physicalWorld.createRigidBody(rigidBodyDesc)
			const colliderDesc = RAPIER.ColliderDesc.cuboid(
				wallConfig.size[0],
				wallConfig.size[1],
				wallConfig.size[2]
			)
			const collider = this._physicalWorld.createCollider(
				colliderDesc,
				rigidBody
			)
			collider.setFriction(0.8)
			collider.setRestitution(0.3)
		})
	}

	private createColliderBasedOnMeshGeometry(
		mesh: Mesh,
		rigidBody: RAPIER.RigidBody
	): RAPIER.Collider {
		const geometry = mesh.geometry
		const vertices = new Float32Array(geometry.attributes.position.array)

		const scale = mesh.scale
		for (let i = 0; i < vertices.length; i += 3) {
			vertices[i] *= scale.x
			vertices[i + 1] *= scale.y
			vertices[i + 2] *= scale.z
		}

		const colliderDesc = RAPIER.ColliderDesc.convexHull(
			vertices
		)!.setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS)
		return this._physicalWorld.createCollider(colliderDesc!, rigidBody)
	}
}
