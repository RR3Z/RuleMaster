import DiceRoller from "./diceRoller.ts"
import Interface from "./gui.ts"

export const diceRoller = new DiceRoller()
await diceRoller.loadDices("models/dices/dices.gltf")

const gui = new Interface(diceRoller) // GUI - temp solution TODO: remove it in the end
