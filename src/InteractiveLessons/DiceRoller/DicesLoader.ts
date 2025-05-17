import { Object3D } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DiceType } from './Types/DiceType'

export default class DicesLoader extends GLTFLoader {
	constructor() {
		super()
	}

	public async loadModels(filePath: string): Promise<Map<DiceType, Object3D>> {
		const dices: Map<DiceType, Object3D> = new Map()

		const gltf = await this.loadAsync(filePath)
		for (const dice of gltf.scene.children) {
			// Преобразуем строку "D20" в DiceType.D20
			const diceTypeValue = this.stringToEnumValue(dice.name)

			if (diceTypeValue !== undefined) {
				dices.set(diceTypeValue, dice)
			} else {
				throw new Error(
					`DiceRoller -> DicesLoader -> loadModels(): Unknown dice type: ${dice.name}!`
				)
			}
		}

		return dices
	}

	private stringToEnumValue(name: string): DiceType | undefined {
		const key = name as keyof typeof DiceType
		if (key in DiceType && isNaN(Number(key))) return DiceType[key]
		return undefined
	}
}
