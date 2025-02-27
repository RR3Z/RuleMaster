import GUI from "lil-gui"
import { availableDices, selectedDices } from "../main"
import { addObjects, removeObjects } from "./three"

const gui = new GUI()
const guiObject = {
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
	addSelectedDices: function () {
		addObjects()
	},
	clearSelectedDices: function () {
		removeObjects()
	},
}

export function addGUI() {
	gui.add(guiObject, "addD4").name("D4")
	gui.add(guiObject, "addD6").name("D6")
	gui.add(guiObject, "addD8").name("D8")
	gui.add(guiObject, "addD10").name("D10")
	gui.add(guiObject, "addD12").name("D12")
	gui.add(guiObject, "addD20").name("D20")
	gui.add(guiObject, "addSelectedDices").name("Roll Dices")
	gui.add(guiObject, "clearSelectedDices").name("Clear Selected Dices")
}
