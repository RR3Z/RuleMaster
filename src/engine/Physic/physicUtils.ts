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
	const indices = new Uint32Array(geometry.index!.array)

	const colliderDesc = Rapier.ColliderDesc.trimesh(vertices, indices)
	return physicWorld.createCollider(colliderDesc, rigidBody)
}
