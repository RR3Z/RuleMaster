import React from 'react'
import ReactDOM from 'react-dom/client'
import { Background } from './InteractiveMap/_Enums/Background.ts'
import { Class } from './InteractiveMap/_Enums/Class.ts'
import { EntityType } from './InteractiveMap/_Enums/EntityType.ts'
import { Race } from './InteractiveMap/_Enums/Race.ts'
import { Skill } from './InteractiveMap/_Enums/Skill.ts'
import { Stat } from './InteractiveMap/_Enums/Stat.ts'
import {
	EnemyData,
	PlayerData,
	PlayerMainInfo,
	SavingThrowData,
	SkillData,
	TokenVisualData,
} from './InteractiveMap/_Types/Characters.ts'
import {
	CellVisualData,
	GridData,
	GridVisualData,
	MapData,
	MapLogicData,
	MapVisualData,
	Position,
} from './InteractiveMap/_Types/Map.ts'
import { SpellSlots } from './InteractiveMap/_Types/Spell.ts'
import { TriggerData } from './InteractiveMap/_Types/Triggers.ts'
import { TutorialStepData } from './InteractiveMap/_Types/Tutorials.ts'
import InteractiveMap from './InteractiveMap/InteractiveMap.ts'
import App from './React/App.tsx'

// Dice Roller
// export const diceRoller = new DiceRoller() // TODO: remove "export" in the end (used it in GUI)
// await diceRoller.loadDices('models/dices/dices.gltf')

// const gui = new Interface(diceRoller) // GUI - temp solution TODO: remove it in the end
// const mapEditor = new MapEditor()
// await mapEditor.init()

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)

const interactiveMap = new InteractiveMap()
interactiveMap.init('/levelsData/test.json')

// GENERAL
const width = 4
const height = 4

// PLAYER
const playerPosition: Position = { x: 3, y: 3 }
const stats: Map<Stat, number> = new Map<Stat, number>()
const savingThrows: Map<Stat, SavingThrowData> = new Map<
	Stat,
	SavingThrowData
>()
const skills: Map<Skill, SkillData> = new Map<Skill, SkillData>()
const spellSlots: Map<number, SpellSlots> = new Map<number, SpellSlots>()
const mainInfo: PlayerMainInfo = {
	level: 1,
	class: Class.ARTIFICER,
	race: Race.DRAGONBORN,
	background: Background.ACOLYTE,
	maxHealth: 10,
	defenceClass: 14,
}
const playerData: PlayerData = {
	name: 'Player',
	mainInfo: mainInfo,
	stats: [...stats],
	savingThrows: [...savingThrows],
	skills: [...skills],
	spells: [],
	spellSlots: [...spellSlots],
	items: [],
	position: playerPosition,
}

// ENEMIES
const enemies: EnemyData[] = []

// BOUNDARIES
const boundaries: Position[] = []
boundaries.push({ x: 1, y: 1 })
boundaries.push({ x: 2, y: 2 })
boundaries.push({ x: 3, y: 2 })
boundaries.push({ x: 1, y: 2 })

const gridData: GridData = {
	width: width,
	height: height,
	boundaries: boundaries,
}

const triggers: TriggerData[] = []
triggers.push({
	tutorialStepIndex: 0,
	cellPos: { x: 3, y: 1 },
})

const tutorial: TutorialStepData[] = []
tutorial.push({
	index: 0,
	needNext: false,
	message: 'Тестовый текст!',
})

const mapLogicData: MapLogicData = {
	grid: gridData,
	player: playerData,
	enemies: enemies,
	triggers: triggers,
	tutorial: tutorial,
}

// VISUAL
const cellsVisual: CellVisualData[] = []
for (let x = 0; x < width; x++) {
	for (let y = 0; y < height; y++) {
		if (
			(x === 1 && y === 1) ||
			(x === 2 && y === 2) ||
			(x === 3 && y === 2) ||
			(x === 1 && y === 2)
		) {
			cellsVisual.push({
				pos: { x: x, y: y },
				type: EntityType.BOUNDARY,
				color: 0xc40000,
			})
		} else if (x === 3 && y === 3) {
			cellsVisual.push({
				pos: { x: x, y: y },
				type: EntityType.PLAYER,
				color: 0x0ba901,
			})
		} else {
			cellsVisual.push({
				pos: { x: x, y: y },
				type: undefined,
				color: undefined,
			})
		}
	}
}

const gridVisual: GridVisualData = {
	width: width,
	height: height,
	cells: cellsVisual,
	picture: 'a',
}

const playerVisual: TokenVisualData = {
	pos: playerPosition,
	picture: 'b',
}

const mapVisualData: MapVisualData = {
	grid: gridVisual,
	player: playerVisual,
	enemies: [],
}

// RESULT
const mapData: MapData = { logic: mapLogicData, visual: mapVisualData }
console.log(JSON.stringify(mapData))
