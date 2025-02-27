import GUI from "lil-gui"
import { availableDices, selectedDices } from "../main"
import { addObjects, removeObjects } from "./three"

const gui = new GUI()
const guiObject = {
	addD6: function () {
		selectedDices.push(availableDices["D6"].clone())
	},
	addSelectedDices: function () {
		addObjects()
	},
	clearSelectedDices: function () {
		removeObjects()
	},
}

export function addGUI() {
	gui.add(guiObject, "addD6").name("D6")
	gui.add(guiObject, "addSelectedDices").name("Roll Dices")
	gui.add(guiObject, "clearSelectedDices").name("Clear Selected Dices")
}
