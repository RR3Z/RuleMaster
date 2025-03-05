import * as RAPIER from "@dimforge/rapier3d-compat"
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
	public collider!: RAPIER.Collider
	public rigidBody!: RAPIER.RigidBody
	public type: DiceType
	private _normals: Vector3[] = []
	private _diceValues: number[] = []

	constructor(
		visual: Object3D,
		type: DiceType,
		collider?: RAPIER.Collider,
		rigidBody?: RAPIER.RigidBody
	) {
		this.visual = visual
		this.type = type
		if (collider) this.collider = collider
		if (rigidBody) this.rigidBody = rigidBody

		this.defineValues()
		this.computeNormals()

		this.visual.scale.set(1.5, 1.5, 1.5)
	}

	public setVelocity(
		angularVelocity: RAPIER.Vector3,
		linearVelocity: RAPIER.Vector3
	): void {
		this.rigidBody.setAngvel(angularVelocity, true)
		this.rigidBody.setLinvel(linearVelocity, true)
	}

	public value(): number {
		return this._diceValues[this.topFaceIndex()]
	}

	public isStopped(): boolean {
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

		return linSpeed < 0.001 && angSpeed < 0.001
	}

	private computeNormals(): void {
		this._normals.splice(0, this._normals.length)

		const geometry = (this.visual as Mesh).geometry
		geometry.computeVertexNormals()
		const position = geometry.attributes.position
		const indices = geometry.index!.array

		if (this.type === DiceType.D4) {
			const positions = position.array
			const _normals: Record<string, Vector3> = {}

			for (let i = 0; i < positions.length; i += 3) {
				const key = `${positions[i]},${positions[i + 1]},${positions[i + 2]}`
				if (!_normals[key])
					_normals[key] = new Vector3(
						positions[i],
						positions[i + 1],
						positions[i + 2]
					)
			}
			this._normals = Object.values(_normals)
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
				const isDuplicate = this._normals.some(
					existingNormal => normal.angleTo(existingNormal) < 0.01
				)
				if (!isDuplicate) this._normals.push(normal)
			}
		}
	}

	private topFaceIndex(): number {
		let topFaceIndex: number = 0
		let maxY: number = -Infinity

		for (let i = 0; i < this._normals.length; i++) {
			const worldNormal = this._normals[i].clone()
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
				this._diceValues = [1, 4, 3, 2]
				break
			case DiceType.D6:
				this._diceValues = [4, 1, 3, 6, 5, 2]
				break
			case DiceType.D8:
				this._diceValues = [7, 1, 4, 6, 5, 3, 2, 8]
				break
			case DiceType.D10:
				this._diceValues = [9, 5, 3, 7, 1, 8, 2, 6, 4, 10]
				break
			case DiceType.D12:
				this._diceValues = [8, 2, 7, 4, 10, 12, 3, 9, 1, 6, 11, 5]
				break
			case DiceType.D20:
				this._diceValues = [
					14, 11, 16, 19, 2, 5, 10, 7, 4, 18, 3, 17, 6, 9, 12, 15, 20, 8, 13, 1,
				]
				break
			default:
				alert("Dice -> defineValues -> unknown DiceType")
				break
		}
	}
}
