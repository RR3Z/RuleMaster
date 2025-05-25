import { Characteristic } from '@/types/CharacterLesson/Characteristics/Characteristic'
import { DNDClass } from '@/types/CharacterLesson/DNDClass'
import { RaceData } from '@/types/CharacterLesson/Races/RaceData'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import TextSection from '../../TextSection'
import { HR } from '../DialogStyles'
import CharacteristicSelector from './CharacteristicSelector'

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
`

const CharacteristicsSection = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`

type Props = {
	characteristics: Map<Characteristic, number | undefined>
	updateCharacteristic: (key: Characteristic, value: number | undefined) => void
	resetCharacteristic: (key: Characteristic) => void
	race: RaceData
	dndClass: DNDClass
}

export default function CharacteristicsSelection({
	characteristics,
	updateCharacteristic,
	resetCharacteristic,
	race,
	dndClass,
}: Props) {
	const classPrimaryStats: Record<DNDClass, string> = {
		[DNDClass.BARBARIAN]: 'Сила > Телосложение > остальное (на ваш выбор)',
		[DNDClass.BARD]: 'Харизма > Ловкость > остальное (на ваш выбор)',
		[DNDClass.CLERIC]: 'Мудрость > Телосложение > остальное (на ваш выбор)',
		[DNDClass.DRUID]: 'Мудрость > Телосложение > остальное (на ваш выбор)',
		[DNDClass.FIGHTER]:
			'Сила / Ловкость > Телосложение > остальное (на ваш выбор)',
		[DNDClass.MONK]: 'Ловкость > Мудрость > остальное (на ваш выбор)',
		[DNDClass.PALADIN]: 'Сила > Харизма > остальное (на ваш выбор)',
		[DNDClass.RANGER]: 'Ловкость > Мудрость > остальное (на ваш выбор)',
		[DNDClass.ROGUE]:
			'Ловкость > Харизма / Интеллект > остальное (на ваш выбор)',
		[DNDClass.SORCERER]: 'Харизма > Телосложение > остальное (на ваш выбор)',
		[DNDClass.WARLOCK]: 'Харизма > Телосложение > остальное (на ваш выбор)',
		[DNDClass.WIZARD]: 'Интеллект > Телосложение > остальное (на ваш выбор)',
		[DNDClass.ARTIFICER]: 'Интеллект > Телосложение > остальное (на ваш выбор)',
	}
	const characteristicLabels: Record<Characteristic, string> = {
		[Characteristic.STRENGTH]: 'Сила',
		[Characteristic.AGILITY]: 'Ловкость',
		[Characteristic.CONSTITUTION]: 'Телосложение',
		[Characteristic.INTELLIGENCE]: 'Интеллект',
		[Characteristic.WISDOM]: 'Мудрость',
		[Characteristic.CHARISMA]: 'Харизма',
	}

	const enumKeys = Object.values(Characteristic)
	const [selectedValues, setSelectedValues] = useState<(number | undefined)[]>(
		Array(6).fill(undefined)
	)

	useEffect(() => {
		const valuesFromCharacteristics = enumKeys.map(key =>
			characteristics.has(key) ? characteristics.get(key) : undefined
		)
		setSelectedValues(valuesFromCharacteristics)
	}, [characteristics])

	const handleValuesChange = (index: number, value: number | undefined) => {
		value === undefined
			? resetCharacteristic(enumKeys[index])
			: updateCharacteristic(enumKeys[index], value)
	}

	return (
		<MainContainer>
			<TextSection
				data={{
					title: 'Распределение характеристик',
					text: `Вы имеете 6 характеристик: Сила, Ловкость, Телосложение, Интеллект, Мудрость и Харизма. Вам надо присвоить предлагаемые значения каждой из характеристик.<br/><br/><b>Предлагаемые значения:</b> 15, 14, 13, 12, 10, 8<br/><b>Рекомендуемый выбор (от наибольшего к наименьшему):</b> ${
						classPrimaryStats[dndClass]
					}<br/><b>За Расу:</b> ${race.characteristics
						.map(
							ch => `+${ch.value} ${characteristicLabels[ch.type] || ch.type}`
						)
						.join(', ')}`,
				}}
			/>

			<HR />

			<CharacteristicsSection>
				{enumKeys.map((charKey, index) => (
					<CharacteristicSelector
						key={charKey}
						index={index}
						type={charKey}
						label={characteristicLabels[charKey]}
						selectedValues={selectedValues}
						raceCharacteristics={race.characteristics}
						setSelectedValues={setSelectedValues}
						handleValuesChange={handleValuesChange}
					/>
				))}
			</CharacteristicsSection>
		</MainContainer>
	)
}
