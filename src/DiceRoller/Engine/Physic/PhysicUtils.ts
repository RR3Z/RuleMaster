import Rapier from '@dimforge/rapier3d-compat'
import { Mesh } from 'three'

export default class PhysicUtils {
	public static createStaticRigidBody(
		mesh: Mesh,
		physicWorld: Rapier.World
	): { rigidBody: Rapier.RigidBody; collider: Rapier.Collider } {
		const rigidBodyDesc = Rapier.RigidBodyDesc.fixed()
		const rigidBody = physicWorld.createRigidBody(rigidBodyDesc)
		const collider = this.createColliderBasedOnMeshGeometry(
			mesh,
			physicWorld,
			rigidBody
		)
		return { rigidBody, collider }
	}

	public static createDynamicRigidBody(
		mesh: Mesh,
		physicWorld: Rapier.World
	): { rigidBody: Rapier.RigidBody; collider: Rapier.Collider } {
		const rigidBodyDesc = Rapier.RigidBodyDesc.dynamic()
		rigidBodyDesc.setTranslation(
			mesh.position.x,
			mesh.position.y,
			mesh.position.z
		)

		const rigidBody = physicWorld.createRigidBody(rigidBodyDesc)
		const collider = this.createColliderBasedOnMeshGeometry(
			mesh,
			physicWorld,
			rigidBody
		)
		return { rigidBody, collider }
	}

	private static createColliderBasedOnMeshGeometry(
		mesh: Mesh,
		physicWorld: Rapier.World,
		rigidBody: Rapier.RigidBody
	): Rapier.Collider {
		const geometry = mesh.geometry
		const vertices = new Float32Array(geometry.attributes.position.array)

		const scale = mesh.scale
		for (let i = 0; i < vertices.length; i += 3) {
			vertices[i] *= scale.x
			vertices[i + 1] *= scale.y
			vertices[i + 2] *= scale.z
		}

		const colliderDesc = Rapier.ColliderDesc.convexHull(
			vertices
		)!.setActiveEvents(Rapier.ActiveEvents.COLLISION_EVENTS)
		return physicWorld.createCollider(colliderDesc!, rigidBody)
	}
}
