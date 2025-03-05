import { Object3D } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

export default class DiceLoader {
	constructor() {}

	public async load(filePath: string): Promise<Record<string, Object3D>> {
		const loader = new GLTFLoader()
		const dices: Record<string, Object3D> = {}

		const gltf = await loader.loadAsync(filePath)
		for (const dice of gltf.scene.children) {
			dices[dice.name] = dice
		}

		return dices
	}
}
