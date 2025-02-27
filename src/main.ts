import { Object3D } from "three"
import { addGUI } from "./DiceRoller/gui.ts"
import { loadDices } from "./DiceRoller/loader.ts"
import { updateScene } from "./DiceRoller/three.ts"

export const availableDices: Record<string, Object3D> = await loadDices()
export let selectedDices: Object3D[] = []

addGUI()
updateScene()
