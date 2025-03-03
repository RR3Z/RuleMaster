import { Object3D, Scene } from "three"
import { physicWorld } from "./engine/physic/physic.ts"
import PhysicDebugger from "./engine/physic/physicDebugger.ts"
import Camera from "./engine/visual/camera.ts"
import Graphic from "./engine/visual/graphic.ts"
import Light from "./engine/visual/light.ts"
import { loadDices } from "./engine/visual/loader.ts"
import DiceBox from "./entity/diceBox.ts"
import World from "./entity/world.ts"
import Interface from "./gui.ts"

// Dices
export const availableDices: Record<string, Object3D> = await loadDices(
	"models/dices/dices.gltf"
)
export let selectedDices: Object3D[] = []

// Dice Box
const diceBox = new DiceBox()

// Visual
export const scene = new Scene() // TODO: Remove 'export' in the end
const camera = new Camera()
const light = new Light()
// Physic
export const physicDebugger = new PhysicDebugger(physicWorld, scene) // TODO: Remove it in the end

// Objects with Physic and Visual
export const world = new World(physicWorld)

scene.add(world)
scene.add(light)
diceBox.create(physicWorld, camera)

const canvas = document.querySelector("canvas") as HTMLCanvasElement
const graphic = new Graphic(scene, camera, canvas)

// Если надо добавить новую логику при обновлении кадров, добавляем сюда
graphic.onUpdate(() => {
	physicWorld.step()
	world.updateObjects()
	physicDebugger.update()
})

// TODO: REMOVE IT IN THE END - TEMP SOLUTION
const gui = new Interface()
