import Rapier from "@dimforge/rapier3d-compat"
import { Mesh } from "three"

export function createStaticRigidBody(
	mesh: Mesh,
	physicWorld: Rapier.World
): { rigidBody: Rapier.RigidBody; collider: Rapier.Collider } {
	const rigidBodyDesc = Rapier.RigidBodyDesc.fixed()
	const rigidBody = physicWorld.createRigidBody(rigidBodyDesc)
	const collider = createColliderBasedOnMeshGeometry(
		mesh,
		physicWorld,
		rigidBody
	)
	return { rigidBody, collider }
}

export function createDynamicRigidBody(
	mesh: Mesh,
	physicWorld: Rapier.World
): { rigidBody: Rapier.RigidBody; collider: Rapier.Collider } {
	const rigidBodyDesc = Rapier.RigidBodyDesc.dynamic()
	rigidBodyDesc.setTranslation(
		mesh.position.x,
		mesh.position.y,
		mesh.position.z
	)
	// rigidBodyDesc.mass = 1
	// rigidBodyDesc.centerOfMass = new Rapier.Vector3(0, 0, 0)

	const rigidBody = physicWorld.createRigidBody(rigidBodyDesc)
	const collider = createColliderBasedOnMeshGeometry(
		mesh,
		physicWorld,
		rigidBody
	)
	return { rigidBody, collider }
}

function createColliderBasedOnMeshGeometry(
	mesh: Mesh,
	physicWorld: Rapier.World,
	rigidBody: Rapier.RigidBody
): Rapier.Collider {
	const geometry = mesh.geometry
	const vertices = new Float32Array(geometry.attributes.position.array)

	const colliderDesc = Rapier.ColliderDesc.convexHull(vertices)
	return physicWorld.createCollider(colliderDesc!, rigidBody)
}
