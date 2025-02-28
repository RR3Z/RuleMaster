import { Object3D, Scene } from "three"
import { physic } from "./engine/physic/physic.ts"
import Camera from "./engine/visual/camera.ts"
import Graphic from "./engine/visual/graphic.ts"
import Light from "./engine/visual/light.ts"
import { loadDices } from "./engine/visual/loader.ts"
import World from "./entity/world.ts"
import Interface from "./gui.ts"

export const availableDices: Record<string, Object3D> = await loadDices(
	"models/dices/rpg_dice_set.gltf"
)
export let selectedDices: Object3D[] = []

const scene = new Scene()
const camera = new Camera()
const light = new Light()
export const world = new World(physic)

scene.add(world)
scene.add(light)

const canvas = document.querySelector("canvas") as HTMLCanvasElement
const graphic = new Graphic(scene, camera, canvas)

// Если надо добавить новую логику при обновлении кадров, добавляем сюда
graphic.onUpdate((dt: number | undefined) => {
	physic.step()
	world.updateObjects()
})

// TODO: REMOVE IT IN THE END - TEMP SOLUTION
const gui = new Interface()
