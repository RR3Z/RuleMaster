import { SpellData, SpellSlots } from '../../Spell/Spell.ts'
import Entity from '../Entity.ts'
import { Class, Race, SavingThrowData, Skill, Stat } from './Character.d'
import { SkillData } from './Player.d'

export default abstract class Character extends Entity {
	protected _name!: string
	protected _maxHealth!: number
	protected _health!: number
	protected _defenceClass!: number
	protected _level!: number
	protected _class!: Class | undefined
	protected _stats!: Map<Stat, number>
	protected _skills!: Map<Skill, SkillData>
	protected _savingThrows!: Map<Stat, SavingThrowData>
	protected _spells!: Map<string, SpellData>
	protected _spellSlots!: Map<number, SpellSlots>
	protected _race!: Race

	// TODO:
	public takeDamage(value: number): void {}
}
