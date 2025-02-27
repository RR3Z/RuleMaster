import { Object3D } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

const loader = new GLTFLoader()

export function loadDices(): Promise<Record<string, Object3D>> {
	return new Promise((resolve, reject) => {
		let dices: Record<string, Object3D> = {}

		loader.load(
			"/models/dices/rpg_dice_set.gltf",
			gltf => {
				dices["D4"] = gltf.scene.children[0]
				dices["D4"].name = "D4"

				dices["D8"] = gltf.scene.children[1]
				dices["D8"].name = "D8"

				dices["D20"] = gltf.scene.children[2]
				dices["D20"].name = "D20"

				dices["D12"] = gltf.scene.children[3]
				dices["D12"].name = "D12"

				dices["D10"] = gltf.scene.children[4]
				dices["D10"].name = "D10"

				dices["D6"] = gltf.scene.children[5]
				dices["D6"].name = "D6"

				scaleDices(dices)

				resolve(dices)
			},
			undefined,
			error => reject(error)
		)
	})
}

function scaleDices(dices: Record<string, Object3D>) {
	for (let key in dices) {
		dices[key].scale.set(1.5, 1.5, 1.5)
	}
}
