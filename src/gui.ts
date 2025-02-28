import GUI from "lil-gui"
import { availableDices, selectedDices, world } from "./main.ts"

// TODO: REMOVE IT IN THE END - TEMP SOLUTION
export default class Interface extends GUI {
	private guiElements = {
		addD4: function () {
			selectedDices.push(availableDices["D4"].clone())
		},
		addD6: function () {
			selectedDices.push(availableDices["D6"].clone())
		},
		addD8: function () {
			selectedDices.push(availableDices["D8"].clone())
		},
		addD10: function () {
			selectedDices.push(availableDices["D10"].clone())
		},
		addD12: function () {
			selectedDices.push(availableDices["D12"].clone())
		},
		addD20: function () {
			selectedDices.push(availableDices["D20"].clone())
		},
		addDices: function () {
			world.addDynamicObjects(selectedDices)
		},
		clearScene: function () {
			world.removeObjects(selectedDices)
			selectedDices.splice(0, selectedDices.length)
		},
	}

	constructor() {
		super()
		this.init()
	}

	private init(): void {
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
