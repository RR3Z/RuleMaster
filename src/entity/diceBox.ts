import Rapier from "@dimforge/rapier3d-compat"
import { getViewportSizes } from "../engine/utils.ts"
import Camera from "../engine/visual/camera.ts"

export default class DiceBox {
	private wallsPhysic: {
		type: string
		rigidBody: Rapier.RigidBody
		collider: Rapier.Collider
	}[] = []

	constructor() {}

	public create(physicalWorld: Rapier.World, camera: Camera): void {
		const { width, height } = getViewportSizes(camera)

		const wallsConfig = [
			{
				type: "floor",
				position: [0, 0, 0],
				size: [width / 2, 0.5, height / 2],
			},
			{
				type: "roof",
				position: [0, 30, 0],
				size: [width / 2, 0.5, height / 2],
			},
			{
				type: "left",
				position: [-width / 2, 15, 0],
				size: [0.5, 15, height / 2],
			},
			{
				type: "right",
				position: [width / 2, 15, 0],
				size: [0.5, 15, height / 2],
			},
			{
				type: "back",
				position: [0, 15, -height / 2],
				size: [width / 2, 15, 0.5],
			},
			{
				type: "front",
				position: [0, 15, height / 2],
				size: [width / 2, 15, 0.5],
			},
		]

		wallsConfig.forEach(wallConfig => {
			const rigidBodyDesc = Rapier.RigidBodyDesc.fixed()
			// Position
			rigidBodyDesc.setTranslation(
				wallConfig.position[0],
				wallConfig.position[1],
				wallConfig.position[2]
			)

			const rigidBody = physicalWorld.createRigidBody(rigidBodyDesc)
			const colliderDesc = Rapier.ColliderDesc.cuboid(
				wallConfig.size[0],
				wallConfig.size[1],
				wallConfig.size[2]
			)
			const collider = physicalWorld.createCollider(colliderDesc, rigidBody)

			this.wallsPhysic.push({
				type: wallConfig.type,
				rigidBody: rigidBody,
				collider: collider,
			})
		})
	}
}
