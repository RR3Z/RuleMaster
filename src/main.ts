import { Object3D, Scene } from "three"
import Camera from "./engine/camera.ts"
import Graphic from "./engine/graphic.ts"
import Interface from "./engine/gui.ts"
import Light from "./engine/light.ts"
import { loadDices } from "./engine/loader.ts"
import World from "./entity/world.ts"

export const availableDices: Record<string, Object3D> = await loadDices(
	"models/dices/rpg_dice_set.gltf"
)
export let selectedDices: Object3D[] = []

const scene = new Scene()
const camera = new Camera()
const light = new Light()
export const world = new World()

scene.add(world)
scene.add(light)

const canvas = document.querySelector("canvas") as HTMLCanvasElement
const graphic = new Graphic(scene, camera, canvas)

// Если надо добавить новую логику при обновлении кадров, добавляем сюда
graphic.onUpdate((dt: number | undefined) => {})

// TODO: REMOVE IT IN THE END - TEMP SOLUTION
const gui = new Interface()
