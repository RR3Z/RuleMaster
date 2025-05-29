import { DiceType } from '@/InteractiveLessons/DiceRoller/Types/DiceType'
import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import { DNDEquipmentSlotType } from '@/InteractiveLessons/EquipmentManager/DND/DNDEquipmentSlotType'
import { DNDWeaponData } from '@/InteractiveLessons/EquipmentManager/DND/Weapon/DNDWeaponData'
import { DNDWeaponDescriptor } from '@/InteractiveLessons/EquipmentManager/DND/Weapon/DNDWeaponDescriptor'
import { DNDWeaponRangeType } from '@/InteractiveLessons/EquipmentManager/DND/Weapon/DNDWeaponRangeType'
import { DiceRollerRollDetails } from '@/InteractiveLessons/Logger/Details/DiceRollerRollDetails'
import { SpellCastDetails } from '@/InteractiveLessons/Logger/Details/SpellCastDetails'
import { LogData } from '@/InteractiveLessons/Logger/LogData'
import { LogType } from '@/InteractiveLessons/Logger/LogType'
import { DNDStatType } from '@/InteractiveLessons/StatsManager/DNDStatType'
import { DNDClass } from '@/types/CharacterLesson/DNDClass'
import styled from 'styled-components'

const EntryContainer = styled.div`
	background-color: #d6d4c8;
	border-radius: 8px;
	padding: 10px 15px;
	margin-bottom: 10px;
	color: #333;
	font-family: sans-serif;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const LogHeader = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 8px;
`

const ActorInfo = styled.div`
	display: flex;
	flex-direction: column;
`

const ActorName = styled.span`
	font-weight: bold;
	font-size: 1rem;
`

const LogMessage = styled.div`
	font-size: 0.95rem;
	line-height: 1.4;
	white-space: pre-wrap;

	p {
		margin: 0.5em 0;
	}

	ul {
		margin-left: 20px;
	}
`

const ModifiersContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
	margin: 5px 0;
`

const ModifierBadge = styled.span`
	background-color: #d0d0d0;
	padding: 2px 6px;
	border-radius: 4px;
	font-size: 0.8em;
	border: 1px solid #b0b0b0;
`

const RollFormulaDisplay = styled.div`
	background-color: #f0f0f0;
	border: 1px solid #ccc;
	padding: 8px;
	margin-top: 5px;
	border-radius: 4px;
	text-align: center;
	font-weight: bold;
`

const RollResultDisplay = styled(RollFormulaDisplay)`
	font-size: 1.2em;
	padding: 5px;
`

type Props = {
	log: LogData
}

const formatDiceType = (diceType: DiceType): string => {
	return `К${DiceType[diceType].substring(1)}` // Assumes enum values like D4, D6 etc.
}

export default function LogEntry({ log }: Props) {
	const renderDetails = () => {
		let rollDetails
		let formulaStr
		let resultValue
		let bonusMastery
		let attackModifier
		let attackModifierType
		let weapon
		let spellAttackModifier
		let spellAttackModifierType
		let savingThrowModifier
		let savingThrowModifierType

		switch (log.logType) {
			case LogType.DICE_ROLLER_ROLL:
				rollDetails = log.details as DiceRollerRollDetails
				formulaStr = rollDetails.formulas
					.map(f => `${f.count}${formatDiceType(f.type)}`)
					.join(' + ')
				resultValue = rollDetails.results.reduce((sum, r) => sum + r.value, 0)
				return (
					<>
						<p>Бросок: {formulaStr}</p>
						<RollResultDisplay>{resultValue}</RollResultDisplay>
					</>
				)
			case LogType.WEAPON_HIT_ROLL:
				rollDetails = log.details as DiceRollerRollDetails
				formulaStr = rollDetails.formulas
					.map(f => `${f.count}${formatDiceType(f.type)}`)
					.join(' + ')
				bonusMastery = (log.details.actor as DNDCharacter).bonusMastery
				attackModifier = (log.details.actor as DNDCharacter).attackModifier

				weapon = (log.details.actor as DNDCharacter).equipmentManager.slotItem(
					DNDEquipmentSlotType.MAIN_HAND
				)
				attackModifierType =
					(weapon as DNDWeaponData).rangeType === DNDWeaponRangeType.MELEE &&
					!(weapon as DNDWeaponData).descriptors.includes(
						DNDWeaponDescriptor.FINESSE
					)
						? DNDStatType.STRENGTH
						: DNDStatType.DEXTERITY

				resultValue =
					rollDetails.results.reduce((sum, r) => sum + r.value, 0) +
					bonusMastery +
					attackModifier
				return (
					<>
						<p>Бросок на попадание.</p>
						<ModifiersContainer>
							<ModifierBadge>
								Дайс(-ы):{' '}
								{rollDetails.results.reduce((sum, r) => sum + r.value, 0)}
							</ModifierBadge>
							<ModifierBadge>БМ: {bonusMastery}</ModifierBadge>
							<ModifierBadge>
								{attackModifierType === DNDStatType.STRENGTH
									? 'СИЛ: '
									: 'ЛОВ: '}
								{attackModifier}
							</ModifierBadge>
						</ModifiersContainer>
						<RollResultDisplay>{formulaStr} + БМ + МХ</RollResultDisplay>
						<RollResultDisplay>{resultValue}</RollResultDisplay>
					</>
				)
			case LogType.SPELL_HIT_ROLL:
				rollDetails = log.details as DiceRollerRollDetails
				formulaStr = rollDetails.formulas
					.map(f => `${f.count}${formatDiceType(f.type)}`)
					.join(' + ')
				bonusMastery = (log.details.actor as DNDCharacter).bonusMastery
				spellAttackModifier = (log.details.actor as DNDCharacter)
					.spellAttackModifier

				switch ((log.details.actor as DNDCharacter).clazz) {
					case DNDClass.ARTIFICER:
					case DNDClass.WIZARD:
						spellAttackModifierType = DNDStatType.INTELLIGENCE
						break
					case DNDClass.CLERIC:
					case DNDClass.DRUID:
					case DNDClass.RANGER:
						spellAttackModifierType = DNDStatType.WISDOM
						break
					case DNDClass.BARD:
					case DNDClass.PALADIN:
					case DNDClass.SORCERER:
					case DNDClass.WARLOCK:
						spellAttackModifierType = DNDStatType.CHARISMA
						break
				}

				resultValue =
					rollDetails.results.reduce((sum, r) => sum + r.value, 0) +
					bonusMastery +
					spellAttackModifier
				return (
					<>
						<p>Бросок на попадание.</p>
						<ModifiersContainer>
							<ModifierBadge>
								Дайс(-ы):{' '}
								{rollDetails.results.reduce((sum, r) => sum + r.value, 0)}
							</ModifierBadge>
							<ModifierBadge>БМ: {bonusMastery}</ModifierBadge>
							<ModifierBadge>
								{spellAttackModifierType === DNDStatType.INTELLIGENCE
									? 'ИНТ: '
									: spellAttackModifierType === DNDStatType.WISDOM
									? 'МДР: '
									: 'ХАР: '}
								{spellAttackModifier}
							</ModifierBadge>
						</ModifiersContainer>
						<RollResultDisplay>{formulaStr} + БМ + МХ</RollResultDisplay>
						<RollResultDisplay>{resultValue}</RollResultDisplay>
					</>
				)
			case LogType.WEAPON_DAMAGE_ROLL:
				rollDetails = log.details as DiceRollerRollDetails
				formulaStr = rollDetails.formulas
					.map(f => `${f.count}${formatDiceType(f.type)}`)
					.join(' + ')
				attackModifier = (log.details.actor as DNDCharacter).attackModifier

				weapon = (log.details.actor as DNDCharacter).equipmentManager.slotItem(
					DNDEquipmentSlotType.MAIN_HAND
				)
				attackModifierType =
					(weapon as DNDWeaponData).rangeType === DNDWeaponRangeType.MELEE &&
					!(weapon as DNDWeaponData).descriptors.includes(
						DNDWeaponDescriptor.FINESSE
					)
						? DNDStatType.STRENGTH
						: DNDStatType.DEXTERITY

				resultValue =
					rollDetails.results.reduce((sum, r) => sum + r.value, 0) +
					attackModifier
				return (
					<>
						<p>Бросок на урон.</p>
						<ModifiersContainer>
							<ModifierBadge>
								Дайс(-ы):{' '}
								{rollDetails.results.reduce((sum, r) => sum + r.value, 0)}
							</ModifierBadge>
							<ModifierBadge>
								{attackModifierType === DNDStatType.STRENGTH
									? 'СИЛ: '
									: 'ЛОВ: '}
								{attackModifier}
							</ModifierBadge>
						</ModifiersContainer>
						<RollResultDisplay>{formulaStr} + МХ</RollResultDisplay>
						<RollResultDisplay>{resultValue}</RollResultDisplay>
					</>
				)
			case LogType.SPELL_DAMAGE_ROLL:
				rollDetails = log.details as DiceRollerRollDetails
				formulaStr = rollDetails.formulas
					.map(f => `${f.count}${formatDiceType(f.type)}`)
					.join(' + ')

				resultValue = rollDetails.results.reduce((sum, r) => sum + r.value, 0)
				return (
					<>
						<p>Бросок на урон от заклинания.</p>
						<ModifiersContainer>
							<ModifierBadge>
								Дайс(-ы):{' '}
								{rollDetails.results.reduce((sum, r) => sum + r.value, 0)}
							</ModifierBadge>
						</ModifiersContainer>
						<RollResultDisplay>{formulaStr}</RollResultDisplay>
						<RollResultDisplay>{resultValue}</RollResultDisplay>
					</>
				)
			case LogType.CHARACTER_SAVING_THROW_CHECK:
				rollDetails = log.details as DiceRollerRollDetails
				savingThrowModifierType = log.details.savingThrowStat
				savingThrowModifier = (
					log.details.actor as DNDCharacter
				).savingThrowModifier(savingThrowModifierType)
				formulaStr = rollDetails.formulas
					.map(f => `${f.count}${formatDiceType(f.type)}`)
					.join(' + ')

				resultValue =
					rollDetails.results.reduce((sum, r) => sum + r.value, 0) +
					savingThrowModifier
				return (
					<>
						<p>Спасбросок.</p>
						<ModifiersContainer>
							<ModifierBadge>
								Дайс(-ы):{' '}
								{rollDetails.results.reduce((sum, r) => sum + r.value, 0)}
							</ModifierBadge>
							<ModifierBadge>
								{savingThrowModifierType === DNDStatType.STRENGTH
									? 'СИЛ: '
									: savingThrowModifierType === DNDStatType.CHARISMA
									? 'ХАР: '
									: savingThrowModifierType === DNDStatType.DEXTERITY
									? 'ЛОВ: '
									: savingThrowModifierType === DNDStatType.CONSTITUTION
									? 'ТЕЛ: '
									: savingThrowModifierType === DNDStatType.INTELLIGENCE
									? 'ИНТ: '
									: savingThrowModifierType === DNDStatType.WISDOM
									? 'МДР: '
									: 'ERROR'}
								{savingThrowModifier}
							</ModifierBadge>
						</ModifiersContainer>
						<RollResultDisplay>{formulaStr} + МХ</RollResultDisplay>
						<RollResultDisplay>{resultValue}</RollResultDisplay>
					</>
				)
			case LogType.CHARACTER_MELEE_ATTACK_START:
				return <p>Начал выполнять действие "Ближняя атака".</p>
			case LogType.CHARACTER_RANGED_ATTACK_START:
				return <p>Начал выполнять действие "Дальнобойная атака".</p>
			case LogType.CHARACTER_SPELL_CAST_START:
				const spellDetails = log.details as SpellCastDetails
				return <p>Начал использовать заклинание: {spellDetails.spellName}.</p>
			case LogType.TUTORIAL_SYSTEM_MESSAGE:
				return <p>{log.details as string}</p>
			default:
				return (
					<p>
						{typeof log.details === 'string'
							? log.details
							: JSON.stringify(log.details)}
					</p>
				)
		}
	}

	return (
		<EntryContainer>
			<LogHeader>
				<ActorInfo>
					<ActorName>{log.actorName}</ActorName>
				</ActorInfo>
			</LogHeader>
			<LogMessage>{renderDetails()}</LogMessage>
		</EntryContainer>
	)
}
