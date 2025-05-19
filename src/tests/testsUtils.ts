import { DiceType } from '@/InteractiveLessons/DiceRoller/Types/DiceType'
import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import { DNDCharacterData } from '@/InteractiveLessons/Entities/Character/DND/DNDCharacterData'
import { DNDClass } from '@/InteractiveLessons/Entities/Character/DND/DNDClass'
import { EntityType } from '@/InteractiveLessons/Entities/EntityType'
import { DNDItemData } from '@/InteractiveLessons/EquipmentManager/DND/DNDItemData'
import { DNDWeaponData } from '@/InteractiveLessons/EquipmentManager/DND/Weapon/DNDWeaponData'
import { DNDWeaponRangeType } from '@/InteractiveLessons/EquipmentManager/DND/Weapon/DNDWeaponRangeType'
import { DNDWeaponType } from '@/InteractiveLessons/EquipmentManager/DND/Weapon/DNDWeaponType'
import GridOfCells from '@/InteractiveLessons/InteractiveMap/Logic/Grid/GridOfCells'
import { GridOfCellsLogicData } from '@/InteractiveLessons/InteractiveMap/Logic/Grid/GridOfCellsLogicData'
import { DNDCharacterState } from '@/InteractiveLessons/StateMachine/Character/DND/DNDCharacterState'
import { DNDStatType } from '@/InteractiveLessons/StatsManager/DNDStatType'
import { Position } from '@/InteractiveLessons/Types/Position'

export function createPlayer(
	startState: DNDCharacterState,
	startPos: Position
): DNDCharacter {
	const maxSpellSlots: Map<number, number> = new Map()
	maxSpellSlots.set(0, Infinity)
	maxSpellSlots.set(1, 2)
	maxSpellSlots.set(2, 0)
	maxSpellSlots.set(3, 0)
	maxSpellSlots.set(4, 0)
	maxSpellSlots.set(5, 0)
	maxSpellSlots.set(6, 0)
	maxSpellSlots.set(7, 0)
	maxSpellSlots.set(8, 0)
	maxSpellSlots.set(9, 0)

	const stats: Map<DNDStatType, number> = new Map()
	stats.set(DNDStatType.STRENGTH, 20)
	stats.set(DNDStatType.CHARISMA, 20)
	stats.set(DNDStatType.CONSTITUTION, 20)
	stats.set(DNDStatType.DEXTERITY, 20)
	stats.set(DNDStatType.INTELLIGENCE, 20)
	stats.set(DNDStatType.WISDOM, 20)

	const savingThrowProficiencies: Set<DNDStatType> = new Set()
	savingThrowProficiencies.add(DNDStatType.STRENGTH)

	const equipment: DNDItemData[] = []
	const weapon: DNDWeaponData = {
		type: DNDWeaponType.ONE_HANDED,
		name: 'Кинжал',
		description: '',
		rangeType: DNDWeaponRangeType.MELEE,
		defaultRange: 5,
		maxRange: 5,
		damageFormulas: [{ type: DiceType.D6, count: 1 }],
		descriptors: [],
	}
	equipment.push(weapon)

	const data: DNDCharacterData = {
		type: 'DND',
		name: 'Player',
		class: DNDClass.BARD,
		level: 1,
		maxHealth: 10,
		maxMovementSpeed: 30,
		maxSpellSlots: maxSpellSlots,
		stats: stats,
		savingThrowProficiencies: savingThrowProficiencies,
		equipment: equipment,
	}

	return new DNDCharacter(EntityType.PLAYER, data, startPos, startState)
}

export function createPlayerWithBow(
	startState: DNDCharacterState,
	startPos: Position
): DNDCharacter {
	const maxSpellSlots: Map<number, number> = new Map()
	maxSpellSlots.set(0, Infinity)
	maxSpellSlots.set(1, 2)
	maxSpellSlots.set(2, 0)
	maxSpellSlots.set(3, 0)
	maxSpellSlots.set(4, 0)
	maxSpellSlots.set(5, 0)
	maxSpellSlots.set(6, 0)
	maxSpellSlots.set(7, 0)
	maxSpellSlots.set(8, 0)
	maxSpellSlots.set(9, 0)

	const stats: Map<DNDStatType, number> = new Map()
	stats.set(DNDStatType.STRENGTH, 20)
	stats.set(DNDStatType.CHARISMA, 20)
	stats.set(DNDStatType.CONSTITUTION, 20)
	stats.set(DNDStatType.DEXTERITY, 20)
	stats.set(DNDStatType.INTELLIGENCE, 20)
	stats.set(DNDStatType.WISDOM, 20)

	const savingThrowProficiencies: Set<DNDStatType> = new Set()
	savingThrowProficiencies.add(DNDStatType.STRENGTH)

	const equipment: DNDItemData[] = []
	const weapon: DNDWeaponData = {
		type: DNDWeaponType.TWO_HANDED,
		name: 'Лук',
		description: '',
		rangeType: DNDWeaponRangeType.RANGE,
		defaultRange: 20,
		maxRange: 20,
		damageFormulas: [{ type: DiceType.D6, count: 1 }],
		descriptors: [],
	}
	equipment.push(weapon)

	const data: DNDCharacterData = {
		type: 'DND',
		name: 'Player',
		class: DNDClass.BARD,
		level: 1,
		maxHealth: 10,
		maxMovementSpeed: 30,
		maxSpellSlots: maxSpellSlots,
		stats: stats,
		savingThrowProficiencies: savingThrowProficiencies,
		equipment: equipment,
	}

	return new DNDCharacter(EntityType.PLAYER, data, startPos, startState)
}

export function createEnemy(
	startState: DNDCharacterState,
	startPos: Position
): DNDCharacter {
	const maxSpellSlots: Map<number, number> = new Map()
	maxSpellSlots.set(0, Infinity)
	maxSpellSlots.set(1, 2)
	maxSpellSlots.set(2, 0)
	maxSpellSlots.set(3, 0)
	maxSpellSlots.set(4, 0)
	maxSpellSlots.set(5, 0)
	maxSpellSlots.set(6, 0)
	maxSpellSlots.set(7, 0)
	maxSpellSlots.set(8, 0)
	maxSpellSlots.set(9, 0)

	const stats: Map<DNDStatType, number> = new Map()
	stats.set(DNDStatType.STRENGTH, 18)
	stats.set(DNDStatType.CHARISMA, 18)
	stats.set(DNDStatType.CONSTITUTION, 18)
	stats.set(DNDStatType.DEXTERITY, 18)
	stats.set(DNDStatType.INTELLIGENCE, 18)
	stats.set(DNDStatType.WISDOM, 18)

	const savingThrowProficiencies: Set<DNDStatType> = new Set()
	savingThrowProficiencies.add(DNDStatType.STRENGTH)

	const equipment: DNDItemData[] = []
	const weapon: DNDWeaponData = {
		type: DNDWeaponType.ONE_HANDED,
		name: 'Кинжал',
		description: '',
		rangeType: DNDWeaponRangeType.MELEE,
		defaultRange: 5,
		maxRange: 5,
		damageFormulas: [{ type: DiceType.D6, count: 1 }],
		descriptors: [],
	}
	equipment.push(weapon)

	const data: DNDCharacterData = {
		type: 'DND',
		name: 'Enemy',
		class: DNDClass.BARD,
		level: 1,
		maxHealth: 10,
		maxMovementSpeed: 30,
		maxSpellSlots: maxSpellSlots,
		stats: stats,
		savingThrowProficiencies: savingThrowProficiencies,
		equipment: equipment,
	}

	return new DNDCharacter(EntityType.ENEMY, data, startPos, startState)
}

export function createGridOfCells(
	sizes: { width: number; height: number } = { width: 3, height: 3 },
	player: DNDCharacter,
	enemies?: DNDCharacter[],
	boundaries?: Position[]
): GridOfCells {
	const data: GridOfCellsLogicData = {
		sizes: sizes,
		boundaries: boundaries ? boundaries : [],
	}

	let grid
	enemies
		? (grid = new GridOfCells(data, player, enemies!))
		: (grid = new GridOfCells(data, player, []))
	return grid
}
