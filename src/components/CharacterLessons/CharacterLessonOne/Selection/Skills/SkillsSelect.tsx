import { Skill } from '@/types/CharacterLesson/Skills/Skill'
import { useEffect, useState } from 'react'
import { Option, Select } from '../SelectStyles'

const skillOptions: { value: Skill; label: string }[] = [
	{ value: Skill.ACROBATICS, label: 'Акробатика' },
	{ value: Skill.ANIMAL_HANDLING, label: 'Обращение с животными' },
	{ value: Skill.ARCANA, label: 'Аркана' },
	{ value: Skill.ATHLETICS, label: 'Атлетика' },
	{ value: Skill.DECEPTION, label: 'Обман' },
	{ value: Skill.HISTORY, label: 'История' },
	{ value: Skill.INSIGHT, label: 'Проницательность' },
	{ value: Skill.INTIMIDATION, label: 'Запугивание' },
	{ value: Skill.INVESTIGATION, label: 'Расследование' },
	{ value: Skill.MEDICINE, label: 'Медицина' },
	{ value: Skill.NATURE, label: 'Природа' },
	{ value: Skill.PERCEPTION, label: 'Восприятие' },
	{ value: Skill.PERFORMANCE, label: 'Выступления' },
	{ value: Skill.PERSUASION, label: 'Убеждение' },
	{ value: Skill.RELIGION, label: 'Религия' },
	{ value: Skill.SLEIGHT_OF_HAND, label: 'Ловкость рук' },
	{ value: Skill.STEALTH, label: 'Скрытность' },
	{ value: Skill.SURVIVAL, label: 'Выживание' },
]

type Props = {
	index: number
	placeholder: string
	values: Map<number, Skill>
	initialValue?: Skill
	addValue: (index: number, instrument: Skill) => void
	removeValue: (index: number, instrument: Skill) => void
	updateButtonState: (value: number) => void
}

export default function SkillsSelect({
	index,
	placeholder,
	values,
	initialValue,
	addValue,
	removeValue,
	updateButtonState,
}: Props) {
	const [selected, setSelected] = useState<Skill | ''>(initialValue || '')

	useEffect(() => {}, [values])

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newValue = e.target.value as Skill

		if (selected && values.has(index)) {
			removeValue(
				Array.from(values.keys()).find(key => values.get(key) === selected)!,
				selected
			)
			updateButtonState(-1)
		}

		if (newValue && !Array.from(values.values()).includes(newValue)) {
			addValue(index, newValue)
			setSelected(newValue)
			updateButtonState(1)
		} else setSelected('')
	}

	return (
		<Select value={selected} onChange={handleChange}>
			<Option value=''>{placeholder}</Option>
			{skillOptions.map(({ value, label }) => {
				const isSelected = value === selected
				const alreadyChosen = Array.from(values.values()).includes(value)

				if (!alreadyChosen || isSelected)
					return (
						<Option key={value} value={value}>
							{label}
						</Option>
					)

				return null
			})}
		</Select>
	)
}
