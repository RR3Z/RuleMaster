import DiceRoller from "./DiceRoller/diceRoller.ts"
import Interface from "./DiceRoller/gui.ts"
import InteractiveMap from "./InteractiveMap/interactiveMap.ts"

// Dice Roller
export const diceRoller = new DiceRoller() // TODO: remove "export" in the end
await diceRoller.loadDices("models/dices/dices.gltf")
const gui = new Interface(diceRoller) // GUI - temp solution TODO: remove it in the end

// Interactive Map
const interactiveMap = new InteractiveMap()
await interactiveMap.init()
interactiveMap.onUpdate(() => {})
