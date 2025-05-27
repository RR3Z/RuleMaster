import { DiceType } from '@/InteractiveLessons/DiceRoller/Types/DiceType'
import { DiceRollerRollDetails } from '@/InteractiveLessons/Logger/Details/DiceRollerRollDetails'
import { SpellCastDetails } from '@/InteractiveLessons/Logger/Details/SpellCastDetails'
import { LogData } from '@/InteractiveLessons/Logger/LogData'
import { LogType } from '@/InteractiveLessons/Logger/LogType'
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
	margin-top: 2px;
`

type Props = {
	log: LogData
}

const formatDiceType = (diceType: DiceType): string => {
	return `К${DiceType[diceType].substring(1)}` // Assumes enum values like D4, D6 etc.
}

export default function LogEntry({ log }: Props) {
	const renderDetails = () => {
		switch (log.logType) {
			case LogType.DICE_ROLLER_ROLL:
				const rollDetails = log.details as DiceRollerRollDetails
				const formulaStr = rollDetails.formulas
					.map(f => `${f.count}${formatDiceType(f.type)}`)
					.join(' + ')
				const resultValue = rollDetails.results.reduce(
					(sum, r) => sum + r.value,
					0
				)
				return (
					<>
						<p>Бросок: {formulaStr}</p>
						<RollResultDisplay>{resultValue}</RollResultDisplay>
					</>
				)
			case LogType.CHARACTER_MELEE_ATTACK:
				return <p>Совершает действие "Ближняя атака".</p>
			case LogType.CHARACTER_RANGED_ATTACK:
				return <p>Совершает действие "Дальнобойная атака".</p>
			case LogType.CHARACTER_SPELL_CAST:
				const spellDetails = log.details as SpellCastDetails
				return <p>Использует заклинание: {spellDetails.spellName}.</p>
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
