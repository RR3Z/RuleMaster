import { EntityType } from '../Entity.ts'
import Character from './Character.ts'
import { PlayerData } from './Player.d'

export enum Race {
	GNOME,
	DWARF,
	DRAGONBORN,
	HALF_ORC,
	HALFLING,
	HALF_ELF,
	TIEFLING,
	HUMAN,
	ELF,
}
export enum Background {
	ENTERTAINER,
	SAILOR,
	PIRATE,
	OUTLANDER,
	URCHIN,
	SAGE,
	CRIMINAL,
	CHARLATAN,
	NOBLE,
	FOLK_HERO,
	ACOLYTE,
	GUILD_ARTISAN,
	HERMIT,
	SOLDIER,
}

export default class Player extends Character {
	private _race: Race
	private _background: Background

	constructor(data: PlayerData) {
		super(EntityType.PLAYER)

		this._name = data.name
		this._maxHealth = data.mainInfo.maxHealth
		this._health = this._maxHealth
		this._defenceClass = data.mainInfo.defenceClass
		this._level = data.mainInfo.level
		this._class = data.mainInfo.class
		this._race = data.mainInfo.race
		this._background = data.mainInfo.background
		this._stats = data.stats
		//TODO: this._skills = data.skills
		this._savingThrows = data.savingThrows
		//TODO: this._spells = data.spells
		this._spellSlots = data.spellSlots
	}
}
