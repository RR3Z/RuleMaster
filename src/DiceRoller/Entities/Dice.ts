import { Collider, RigidBody } from '@dimforge/rapier3d-compat'
import { Mesh, Object3D, Vector3 } from 'three'
import { DiceType } from '../_Types/DiceType'
import { StartPosition } from '../_Types/StartPosition'

export default class Dice {
	private _visual: Object3D
	private _collider: Collider
	private _rigidBody: RigidBody
	private _type: DiceType
	private _normals: Vector3[]
	private _diceValues: number[]

	constructor(
		visual: Object3D,
		collider: Collider,
		rigidBody: RigidBody,
		type: DiceType
	) {
		this._visual = visual
		this._collider = collider
		this._rigidBody = rigidBody
		this._type = type
		this._normals = []
		this._diceValues = []

		this.init()
	}

	public get visual(): Object3D {
		return this._visual
	}

	public get collider(): Collider {
		return this._collider
	}

	public get rigidBody(): RigidBody {
		return this._rigidBody
	}

	public get value(): number {
		return this._diceValues[this.topFaceIndex()]
	}

	public get type(): DiceType {
		return this._type
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

	private init(): void {
		// Visual Settings
		this._visual.receiveShadow = true
		this._visual.castShadow = true

		// Object Form
		this.computeNormals()
		this.defineValues()

		// Physic Settings
		this.setRandomStartPosition()
		this.setRandomAngularVelocity()
		this.setMoveDirectionToCenter()
	}

	private setRandomStartPosition(): void {
		const values: StartPosition[] = Object.values(StartPosition).filter(
			v => typeof v === 'number'
		)
		let startPos: StartPosition =
			values[Math.floor(Math.random() * values.length)]

		switch (startPos) {
			case StartPosition.UP:
				this._rigidBody.setTranslation(
					new Vector3(Math.random() * 160 - 80, 50, -27),
					true
				)
				break
			case StartPosition.DOWN:
				this._rigidBody.setTranslation(
					new Vector3(Math.random() * 160 - 80, 50, 27),
					true
				)
				break
			case StartPosition.RIGHT:
				this._rigidBody.setTranslation(
					new Vector3(80, 50, Math.random() * 54 - 27),
					true
				)
				break
			case StartPosition.LEFT:
				this._rigidBody.setTranslation(
					new Vector3(-80, 50, Math.random() * 54 - 27),
					true
				)
				break
			default:
				console.error(
					'Dice -> init() -> setRandomStartPosition() -> Unknown Start Position'
				)
				break
		}
	}

	private setRandomAngularVelocity(): void {
		const angularVelocity = new Vector3(
			Math.random() * 5 + 3,
			Math.random() * 5 + 3,
			Math.random() * 5 + 3
		)
		this.rigidBody.setAngvel(angularVelocity, true)
	}

	private setMoveDirectionToCenter(): void {
		let forceMagnitude = 50
		if (this._type === DiceType.D4) forceMagnitude = 100

		const centerPosition = new Vector3(0, 0, 0)
		const dicePosition = this.rigidBody.translation()
		const direction = new Vector3(
			centerPosition.x - dicePosition.x,
			centerPosition.y - dicePosition.y,
			centerPosition.z - dicePosition.z
		)

		this.rigidBody.applyImpulse(
			{
				x: direction.x * forceMagnitude,
				y: direction.y * forceMagnitude,
				z: direction.z * forceMagnitude,
			},
			true
		)
	}

	private computeNormals(): void {
		this._normals.splice(0, this._normals.length)

		const geometry = (this.visual as Mesh).geometry
		geometry.computeVertexNormals()
		const position = geometry.attributes.position
		const indices = geometry.index!.array

		if (this._type === DiceType.D4) {
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

	private defineValues(): void {
		switch (this._type) {
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
				alert('Dice -> defineValues -> unknown DiceType')
				break
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
}
