import DiceRoller from "./DiceRoller/diceRoller.ts"
import Interface from "./DiceRoller/gui.ts"

export const diceRoller = new DiceRoller()
await diceRoller.loadDices("models/dices/dices.gltf")

const gui = new Interface(diceRoller) // GUI - temp solution TODO: remove it in the end
