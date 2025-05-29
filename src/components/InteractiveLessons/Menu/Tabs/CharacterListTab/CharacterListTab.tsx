'use client'
import { breakpoints } from '@/components/InteractiveLessons/breakpoints'
import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import { DNDClass } from '@/InteractiveLessons/Entities/Character/DND/DNDClass'
import { DNDStatType } from '@/InteractiveLessons/StatsManager/DNDStatType'
import { Skill } from '@/types/CharacterLesson/Skills/Skill'
import styled from 'styled-components'

const TabContainer = styled.div`
	flex-grow: 1;
	margin: 5px;
	padding: 15px;
	border-radius: 3px;
	background: #d6d4c8;
	color: black;
	overflow-y: auto;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	gap: 15px;

	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background: #e0dcd3;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #a09c92;
		border-radius: 4px;
	}
`

const HeaderSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding-bottom: 10px;
	border-bottom: 1px solid #000000;
`

const NameClassBlock = styled.div`
	display: flex;
	flex-direction: column;
`

const CharacterName = styled.h2`
	font-size: 1.5rem;
	font-weight: bold;
	margin: 0;
	color: #1a1a1a;

	@media (min-width: ${breakpoints.sm}) {
		font-size: 1.1rem;
	}

	@media (min-width: ${breakpoints.md}) {
		font-size: 1.2rem;
	}

	@media (min-width: ${breakpoints.lg}) {
		font-size: 1.5rem;
	}

	@media (min-width: ${breakpoints.xxl}) {
		font-size: 1.8rem;
	}
`

const LevelClass = styled.span`
	font-size: 1.2rem;
	color: #4a4a4a;

	@media (min-width: ${breakpoints.sm}) {
		font-size: 0.9rem;
	}

	@media (min-width: ${breakpoints.md}) {
		font-size: 1rem;
	}

	@media (min-width: ${breakpoints.lg}) {
		font-size: 1.2rem;
	}

	@media (min-width: ${breakpoints.xxl}) {
		font-size: 1.5rem;
	}
`

const ColumnsContainer = styled.div`
	display: flex;
	gap: 20px;
	flex-wrap: wrap;
`

const Column = styled.div`
	display: flex;
	flex-direction: column;
	gap: 7px;
	flex: 1;
	width: fit-content;
`

const InfoEntry = styled.div`
	font-size: 1rem;
	line-height: 1.5;
	strong {
		color: #000;
		font-weight: 600;
	}
	b {
		color: #000;
		font-weight: bold;
	}

	@media (min-width: ${breakpoints.sm}) {
		font-size: 0.65rem;
	}

	@media (min-width: ${breakpoints.md}) {
		font-size: 0.8rem;
	}

	@media (min-width: ${breakpoints.lg}) {
		font-size: 0.9rem;
	}

	@media (min-width: ${breakpoints.lg}) {
		font-size: 1rem;
	}

	@media (min-width: ${breakpoints.xxl}) {
		font-size: 1.25rem;
	}
`

const SectionTitle = styled.h3`
	font-size: 1.1rem;
	font-weight: bold;
	margin-top: 12px;
	margin-bottom: 8px;
	padding-bottom: 5px;
	border-bottom: 1px solid #000000;
	color: #1a1a1a;

	@media (min-width: ${breakpoints.sm}) {
		font-size: 0.9rem;
	}

	@media (min-width: ${breakpoints.md}) {
		font-size: 1rem;
	}

	@media (min-width: ${breakpoints.xl}) {
		font-size: 1.15rem;
	}

	@media (min-width: ${breakpoints.xxl}) {
		font-size: 1.35rem;
	}
`

const StatsAndSavesContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 20px;
	width: 100%;

	@media (max-width: 1600px) {
		flex-direction: column;
		gap: 0px;
	}
`

const StatsColumn = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 4px;
`

const SpellSlotsList = styled.ul`
	font-size: 0.9rem;
	list-style: none;
	padding: 0;
	margin: 0;
	width: fit-content;

	li {
		margin-bottom: 5px;
		@media (min-width: ${breakpoints.lg}) {
			font-size: 1rem;
		}
	}
`

const SkillsList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`

const dndClassToRussian: Record<DNDClass, string> = {
	[DNDClass.WIZARD]: 'Волшебник',
	[DNDClass.ARTIFICER]: 'Изобретатель',
	[DNDClass.DRUID]: 'Друид',
	[DNDClass.CLERIC]: 'Жрец',
	[DNDClass.RANGER]: 'Следопыт',
	[DNDClass.SORCERER]: 'Чародей',
	[DNDClass.WARLOCK]: 'Колдун',
	[DNDClass.BARD]: 'Бард',
	[DNDClass.PALADIN]: 'Паладин',
}

const dndStatTypeToRussian: Record<
	DNDStatType,
	{ full: string; short: string }
> = {
	[DNDStatType.STRENGTH]: { full: 'Сила', short: 'Сил' },
	[DNDStatType.DEXTERITY]: { full: 'Ловкость', short: 'Лов' },
	[DNDStatType.CONSTITUTION]: { full: 'Телосложение', short: 'Тел' },
	[DNDStatType.INTELLIGENCE]: { full: 'Интеллект', short: 'Инт' },
	[DNDStatType.WISDOM]: { full: 'Мудрость', short: 'Мдр' },
	[DNDStatType.CHARISMA]: { full: 'Харизма', short: 'Хар' },
}

const classToHitDice: Record<DNDClass, string> = {
	[DNDClass.ARTIFICER]: 'К8',
	[DNDClass.BARD]: 'К8',
	[DNDClass.CLERIC]: 'К8',
	[DNDClass.DRUID]: 'К8',
	[DNDClass.PALADIN]: 'К10',
	[DNDClass.RANGER]: 'К10',
	[DNDClass.SORCERER]: 'К6',
	[DNDClass.WARLOCK]: 'К8',
	[DNDClass.WIZARD]: 'К6',
}

const skillDefinitions: {
	skill: Skill
	russianName: string
	baseStat: DNDStatType
}[] = [
	{
		skill: Skill.ACROBATICS,
		russianName: 'Акробатика',
		baseStat: DNDStatType.DEXTERITY,
	},
	{
		skill: Skill.ANIMAL_HANDLING,
		russianName: 'Уход за животными',
		baseStat: DNDStatType.WISDOM,
	},
	{
		skill: Skill.ARCANA,
		russianName: 'Магия',
		baseStat: DNDStatType.INTELLIGENCE,
	},
	{
		skill: Skill.ATHLETICS,
		russianName: 'Атлетика',
		baseStat: DNDStatType.STRENGTH,
	},
	{
		skill: Skill.DECEPTION,
		russianName: 'Обман',
		baseStat: DNDStatType.CHARISMA,
	},
	{
		skill: Skill.HISTORY,
		russianName: 'История',
		baseStat: DNDStatType.INTELLIGENCE,
	},
	{
		skill: Skill.INSIGHT,
		russianName: 'Проницательность',
		baseStat: DNDStatType.WISDOM,
	},
	{
		skill: Skill.INTIMIDATION,
		russianName: 'Запугивание',
		baseStat: DNDStatType.CHARISMA,
	},
	{
		skill: Skill.INVESTIGATION,
		russianName: 'Анализ',
		baseStat: DNDStatType.INTELLIGENCE,
	},
	{
		skill: Skill.MEDICINE,
		russianName: 'Медицина',
		baseStat: DNDStatType.WISDOM,
	},
	{
		skill: Skill.NATURE,
		russianName: 'Природа',
		baseStat: DNDStatType.INTELLIGENCE,
	},
	{
		skill: Skill.PERCEPTION,
		russianName: 'Внимательность',
		baseStat: DNDStatType.WISDOM,
	},
	{
		skill: Skill.PERFORMANCE,
		russianName: 'Выступление',
		baseStat: DNDStatType.CHARISMA,
	},
	{
		skill: Skill.PERSUASION,
		russianName: 'Убеждение',
		baseStat: DNDStatType.CHARISMA,
	},
	{
		skill: Skill.RELIGION,
		russianName: 'Религия',
		baseStat: DNDStatType.INTELLIGENCE,
	},
	{
		skill: Skill.SLEIGHT_OF_HAND,
		russianName: 'Ловкость рук',
		baseStat: DNDStatType.DEXTERITY,
	},
	{
		skill: Skill.STEALTH,
		russianName: 'Скрытность',
		baseStat: DNDStatType.DEXTERITY,
	},
	{
		skill: Skill.SURVIVAL,
		russianName: 'Выживание',
		baseStat: DNDStatType.WISDOM,
	},
]

const formatModifier = (modifier: number): string => {
	return modifier >= 0 ? `+${modifier}` : `${modifier}`
}

type Props = {
	player: DNDCharacter
}

export default function CharacterListTab({ player }: Props) {
	if (!player) {
		return <TabContainer>Персонаж не задан!</TabContainer>
	}

	const characterLevel = player.level || 1
	const speed = player.maxMovementSpeed || 30
	const spellSlots = (player.spellSlots as Map<number, number>) || new Map()

	const passivePerception =
		10 + player.statsManager.statModifier(DNDStatType.WISDOM)
	const hitDiceType = classToHitDice[player.clazz] || 'К8'
	const numHitDice = characterLevel

	return (
		<TabContainer id='characterListTab'>
			<HeaderSection>
				<NameClassBlock>
					<CharacterName>{player.name}</CharacterName>
					<LevelClass>
						{characterLevel} уровень,{' '}
						{dndClassToRussian[player.clazz] || player.clazz}
					</LevelClass>
				</NameClassBlock>
			</HeaderSection>

			<ColumnsContainer>
				<Column>
					<InfoEntry>
						<strong>Текущее ХП:</strong> {player.currentHealth}
					</InfoEntry>
					<InfoEntry>
						<strong>Временное ХП:</strong> 0
					</InfoEntry>
					<InfoEntry>
						<strong>Класс доспехов:</strong> {player.armourClass}
					</InfoEntry>
					<InfoEntry>
						<strong>Инициатива:</strong>{' '}
						{formatModifier(player.initiativeModifier)}
					</InfoEntry>
					<InfoEntry>
						<strong>Скорость:</strong> {speed} футов
					</InfoEntry>
					<InfoEntry>
						<strong>Бонус мастерства:</strong>{' '}
						{formatModifier(player.bonusMastery)}
					</InfoEntry>
					<InfoEntry>
						<strong>Внимательность:</strong> {passivePerception}
					</InfoEntry>
					<InfoEntry>
						<strong>Кость ХП:</strong> {hitDiceType}
					</InfoEntry>
					<InfoEntry>
						<strong>Кол-во костей ХП:</strong> {numHitDice}
					</InfoEntry>
				</Column>
				{/*<Column>
					<SectionTitle style={{ marginTop: 0 }}>
						Ячейки Заклинаний:
					</SectionTitle>
					<SpellSlotsList>
						{Array.from(spellSlots.entries())
							.filter(([level]) => level > 0 && level <= 3)
							.sort(([a], [b]) => a - b)
							.map(([level, count]) => (
								<li key={level}>
									<b>{level} уровня:</b> {'●'.repeat(count)}
									{'○'.repeat(
										Math.max(0, (level === 1 ? 5 : level === 2 ? 4 : 3) - count)
									)}
								</li>
							))}
					</SpellSlotsList>
				</Column>*/}
			</ColumnsContainer>

			<StatsAndSavesContainer>
				<StatsColumn>
					<SectionTitle>Характеристики</SectionTitle>
					{Object.values(DNDStatType).map(stat => (
						<InfoEntry key={stat}>
							<strong>{dndStatTypeToRussian[stat].full}:</strong>{' '}
							{player.statsManager.statValue(stat)} (
							{formatModifier(player.statsManager.statModifier(stat))})
						</InfoEntry>
					))}
				</StatsColumn>
				<StatsColumn>
					<SectionTitle>Спасброски</SectionTitle>
					{Object.values(DNDStatType).map(stat => (
						<InfoEntry key={`save-${stat}`}>
							<strong>{dndStatTypeToRussian[stat].full}:</strong>{' '}
							{formatModifier(player.savingThrowModifier(stat))}
						</InfoEntry>
					))}
				</StatsColumn>
			</StatsAndSavesContainer>

			<SectionTitle>Навыки</SectionTitle>
			<SkillsList>
				{skillDefinitions.map(({ skill, russianName, baseStat }) => (
					<InfoEntry key={skill}>
						<b>
							{russianName} ({dndStatTypeToRussian[baseStat].short}):{' '}
						</b>
						{formatModifier(player.statsManager.statModifier(baseStat))}
					</InfoEntry>
				))}
			</SkillsList>
		</TabContainer>
	)
}
