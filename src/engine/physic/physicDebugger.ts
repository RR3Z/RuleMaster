import { World } from "@dimforge/rapier3d-compat"
import {
	BufferAttribute,
	BufferGeometry,
	LineBasicMaterial,
	LineSegments,
	Scene,
} from "three"

export default class PhysicDebugger {
	public isEnabled: boolean = true
	public debugMesh: LineSegments
	private physic: World

	constructor(physic: World, scene: Scene) {
		this.physic = physic

		this.debugMesh = new LineSegments(
			new BufferGeometry(),
			new LineBasicMaterial({ color: 0xffffff, vertexColors: true })
		)
		this.debugMesh.frustumCulled = false
		scene.add(this.debugMesh)
	}

	public update() {
		if (this.isEnabled) {
			const { vertices, colors } = this.physic.debugRender()
			this.debugMesh.geometry.setAttribute(
				"position",
				new BufferAttribute(vertices, 3)
			)
			this.debugMesh.geometry.setAttribute(
				"color",
				new BufferAttribute(colors, 4)
			)

			this.debugMesh.visible = true
		} else {
			this.debugMesh.visible = false
		}
	}
}
