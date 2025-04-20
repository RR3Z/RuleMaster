import { Class } from '../../../_Enums/Class.ts'
import { Race } from '../../../_Enums/Race.ts'
import { Skill } from '../../../_Enums/Skill.ts'
import { Stat } from '../../../_Enums/Stat.ts'
import { SavingThrowData, SkillData } from '../../../_Types/Characters.ts'
import { SpellData, SpellSlots } from '../../../_Types/Spell.ts'
import Entity from '../Entity.ts'

export default abstract class Character extends Entity {
	// Fields
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
