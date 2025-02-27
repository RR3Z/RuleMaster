import { Object3D } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

const loader = new GLTFLoader()

export async function loadDices(
	path: string
): Promise<Record<string, Object3D>> {
	const gltf = await loader.loadAsync(path)

	const dices: Record<string, Object3D> = {}

	for (const dice of gltf.scene.children) {
		dices[dice.name] = dice
	}

	return dices
}
