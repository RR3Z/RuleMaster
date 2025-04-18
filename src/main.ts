// Dice Roller
// export const diceRoller = new DiceRoller() // TODO: remove "export" in the end (used it in GUI)
// await diceRoller.loadDices('models/dices/dices.gltf')

import InteractiveMap from './InteractiveMap/InteractiveMap.ts'

// Interactive Map
// const interactiveMap = new InteractiveMap()
// await interactiveMap.init()

// const gui = new Interface(diceRoller) // GUI - temp solution TODO: remove it in the end
// const mapEditor = new MapEditor()
// await mapEditor.init()

const interactiveMap = new InteractiveMap()
interactiveMap.init('/levelsData/test.json')
