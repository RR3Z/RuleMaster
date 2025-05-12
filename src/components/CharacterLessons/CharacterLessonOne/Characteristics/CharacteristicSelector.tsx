import { Characteristic } from '@/types/CharacterLesson/Characteristics/Characteristic'
import { CharacteristicData } from '@/types/CharacterLesson/Characteristics/CharacteristicData'
import styled from 'styled-components'
import { Option, Select } from '../Selection/SelectStyles'

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 10px;
`

const TextField = styled.input`
	background: none;
	pointer-events: none;
	border: 1px solid white;
	width: 60px;
	flex-shrink: 1;
	flex-grow: 0;
	font-size: 0.8rem;
	text-align: center;
`

type Props = {
	index: number
	type: Characteristic
	label: string
	selectedValues: (number | undefined)[]
	raceCharacteristics: CharacteristicData[]
	setSelectedValues: (value: (number | undefined)[]) => void
	handleValuesChange: (index: number, value: number | undefined) => void
}

export default function CharacteristicSelector({
	index,
	type,
	label,
	selectedValues,
	raceCharacteristics,
	setSelectedValues,
	handleValuesChange,
}: Props) {
	const availableValues = [15, 14, 13, 12, 10, 8]

	const handleSelectChange = (index: number, value: string) => {
		const updated = [...selectedValues]

		if (value === '') {
			updated[index] = undefined
			handleValuesChange(index, undefined)
		} else {
			const intValue = parseInt(value)
			const duplicateIndex = updated.findIndex(
				(v, i) => v === intValue && i !== index
			)

			if (duplicateIndex !== -1) {
				updated[duplicateIndex] = undefined
				handleValuesChange(duplicateIndex, undefined)
			}

			updated[index] = intValue
			handleValuesChange(index, intValue)
		}

		setSelectedValues(updated)
	}

	function getModifier(score: number): number {
		return Math.floor((score - 10) / 2)
	}

	return (
		<MainContainer>
			<label>{label}</label>
			<TextField
				value={
					selectedValues[index] !== undefined
						? (() => {
								const base = selectedValues[index]!
								const racialBonus =
									raceCharacteristics.find(ch => ch.type === type)?.value ?? 0
								const total = base + racialBonus
								const mod = Math.floor((total - 10) / 2)
								return `${total} (${mod >= 0 ? '+' : ''}${mod})`
						  })()
						: ''
				}
				readOnly
			/>
			<Select
				value={selectedValues[index] ?? ''}
				onChange={e => handleSelectChange(index, e.target.value)}
			>
				<Option value=''>?</Option>
				{availableValues.map(value => (
					<Option key={value} value={value}>
						{value}
					</Option>
				))}
			</Select>
		</MainContainer>
	)
}
