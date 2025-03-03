import { Collider, RigidBody } from "@dimforge/rapier3d-compat"
import { Mesh, Object3D, Vector3 } from "three"

export enum DiceType {
	D4,
	D6,
	D8,
	D10,
	D12,
	D20,
}

export default class Dice {
	public visual: Object3D
	public collider: Collider | undefined
	public rigidBody: RigidBody | undefined
	public type: DiceType
	private normals: Vector3[] = []
	private diceValues: number[] = []

	// private remove: ArrowHelper[] = []

	constructor(
		visual: Object3D,
		type: DiceType,
		collider?: Collider,
		rigidBody?: RigidBody
	) {
		this.visual = visual
		this.type = type
		if (collider) this.collider = collider
		if (rigidBody) this.rigidBody = rigidBody

		this.defineValues()
		this.computeNormals()
	}

	public getDiceValue(): number | undefined {
		console.log("Dice Value", this.diceValues[this.getTopFaceIndex()])
		if (this.isStopped()) {
			return this.diceValues[this.getTopFaceIndex()]
		}
		return undefined
	}

	private isStopped(): boolean {
		if (!this.rigidBody) {
			return false
		}

		// Linear speed
		const linVel = this.rigidBody.linvel()
		const linSpeed = Math.sqrt(
			linVel.x * linVel.x + linVel.y * linVel.y + linVel.z * linVel.z
		)
		// Angular speed
		const angVel = this.rigidBody.angvel()
		const angSpeed = Math.sqrt(
			angVel.x * angVel.x + angVel.y * angVel.y + angVel.z * angVel.z
		)

		return linSpeed < 0.0001 && angSpeed < 0.0001
	}

	private computeNormals(): void {
		this.normals.splice(0, this.normals.length)

		const geometry = (this.visual as Mesh).geometry
		geometry.computeVertexNormals()
		const position = geometry.attributes.position
		const indices = geometry.index!.array

		if (this.type === DiceType.D4) {
			const positions = position.array
			const normals: Record<string, Vector3> = {}

			for (let i = 0; i < positions.length; i += 3) {
				const key = `${positions[i]},${positions[i + 1]},${positions[i + 2]}`
				if (!normals[key])
					normals[key] = new Vector3(
						positions[i],
						positions[i + 1],
						positions[i + 2]
					)
			}
			this.normals = Object.values(normals)
		} else {
			for (let i = 0; i < indices.length; i += 3) {
				// Vertices
				const v1 = new Vector3().fromBufferAttribute(position, indices[i])
				const v2 = new Vector3().fromBufferAttribute(position, indices[i + 1])
				const v3 = new Vector3().fromBufferAttribute(position, indices[i + 2])
				// Edges
				const edge1 = new Vector3().subVectors(v2, v1)
				const edge2 = new Vector3().subVectors(v3, v1)
				// Cross product of two edges
				const cross = edge1.cross(edge2)
				const normal = cross.normalize()

				// Ignore triangles with the same face
				const isDuplicate = this.normals.some(
					existingNormal => normal.angleTo(existingNormal) < 0.01
				)
				if (!isDuplicate) this.normals.push(normal)
			}
		}

		console.log(this.normals)
	}

	private getTopFaceIndex(): number {
		let topFaceIndex: number = 0
		let maxY: number = -Infinity

		for (let i = 0; i < this.normals.length; i++) {
			const worldNormal = this.normals[i].clone()
			worldNormal.applyQuaternion(this.visual.quaternion)

			if (worldNormal.y > maxY) {
				maxY = worldNormal.y
				topFaceIndex = i
			}
		}

		return topFaceIndex
	}

	private defineValues(): void {
		switch (this.type) {
			case DiceType.D4:
				this.diceValues = [1, 4, 3, 2]
				break
			case DiceType.D6:
				this.diceValues = [4, 1, 3, 6, 5, 2]
				break
			case DiceType.D8:
				this.diceValues = [7, 1, 4, 6, 5, 3, 2, 8]
				break
			case DiceType.D10:
				this.diceValues = [9, 5, 3, 7, 1, 8, 2, 6, 4, 10]
				break
			case DiceType.D12:
				this.diceValues = [8, 2, 7, 4, 10, 12, 3, 9, 1, 6, 11, 5]
				break
			case DiceType.D20:
				this.diceValues = [
					14, 11, 16, 19, 2, 5, 10, 7, 4, 18, 3, 17, 6, 9, 12, 15, 20, 8, 13, 1,
				]
				break
			default:
				alert("Dice -> defineValues -> unknown DiceType")
				break
		}
	}

	// TODO: remove it in the end
	// private removeArrows(): void {
	// 	if (this.remove.length > 0) {
	// 		this.remove.forEach(arrow => {
	// 			scene.remove(arrow)
	// 		})
	// 	}
	// }

	// TODO: remove it in the end
	// private removeIt(): void {
	// 	this.removeArrows()

	// 	let arrow = new ArrowHelper(
	// 		new Vector3(0, 1, 0),
	// 		this.visual.position,
	// 		20,
	// 		0x000000
	// 	)
	// 	scene.add(arrow)
	// 	this.remove.push(arrow)

	// 	const colors = [
	// 		0xff5733, // Красный-оранжевый - 4
	// 		0x33ff57, // Зеленый - 1
	// 		0x3357ff, // Синий - 3
	// 		0xff33a8, // Розовый - 6
	// 		0xffc733, // Желто-оранжевый - 5
	// 		0x8d33ff, // Фиолетовый - 2
	// 	]

	// 	for (let i = 0; i < this.normals.length; i++) {
	// 		const arrow = new ArrowHelper(
	// 			this.normals[i],
	// 			this.visual.position,
	// 			15,
	// 			colors[i]
	// 		)
	// 		arrow.applyQuaternion(this.visual.quaternion)
	// 		this.remove.push(arrow)
	// 		scene.add(arrow)
	// 	}
	// }
}
