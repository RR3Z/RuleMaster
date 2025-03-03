import GUI from "lil-gui"
import Dice, { DiceType } from "./entity/dice.ts"
import {
	availableDices,
	physicDebugger,
	scene,
	selectedDices,
	world,
} from "./main.ts"

// TODO: REMOVE IT IN THE END - TEMP SOLUTION
export default class Interface extends GUI {
	private guiElements = {
		addD4: function () {
			selectedDices.push(new Dice(availableDices["D4"].clone(), DiceType.D4))
		},
		addD6: function () {
			selectedDices.push(new Dice(availableDices["D6"].clone(), DiceType.D6))
		},
		addD8: function () {
			selectedDices.push(new Dice(availableDices["D8"].clone(), DiceType.D8))
		},
		addD10: function () {
			selectedDices.push(new Dice(availableDices["D10"].clone(), DiceType.D10))
		},
		addD12: function () {
			selectedDices.push(new Dice(availableDices["D12"].clone(), DiceType.D12))
		},
		addD20: function () {
			selectedDices.push(new Dice(availableDices["D20"].clone(), DiceType.D20))
		},
		addDices: function () {
			scene.add(physicDebugger.debugMesh)
			world.addDices(selectedDices)
		},
		clearScene: function () {
			scene.remove(physicDebugger.debugMesh)
			world.removeDices(selectedDices)
			selectedDices.splice(0, selectedDices.length)
		},
	}

	constructor() {
		super()
		this.init()
	}

	private init(): void {
		this.add(physicDebugger, "isEnabled").name("Physic Debugger Status")
		this.add(this.guiElements, "addD4").name("D4")
		this.add(this.guiElements, "addD6").name("D6")
		this.add(this.guiElements, "addD8").name("D8")
		this.add(this.guiElements, "addD10").name("D10")
		this.add(this.guiElements, "addD12").name("D12")
		this.add(this.guiElements, "addD20").name("D20")
		this.add(this.guiElements, "addDices").name("Add Dices")
		this.add(this.guiElements, "clearScene").name("Clear Scene")
	}
}
