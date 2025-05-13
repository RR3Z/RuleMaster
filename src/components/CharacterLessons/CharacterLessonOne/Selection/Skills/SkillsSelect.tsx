import { Skill } from '@/types/CharacterLesson/Skills/Skill'
import { useEffect, useState } from 'react'
import { Option, Select } from '../SelectStyles'

const skillOptions: { value: Skill; label: string }[] = [
	{ value: Skill.ACROBATICS, label: `Акробатика (Ловкость)` },
	{ value: Skill.ANIMAL_HANDLING, label: `Обращение с животными (Мудрость)` },
	{ value: Skill.ARCANA, label: `Магия (Интеллект)` },
	{ value: Skill.ATHLETICS, label: `Атлетика (Сила)` },
	{ value: Skill.DECEPTION, label: `Обман (Харизма)` },
	{ value: Skill.HISTORY, label: `История (Интеллект)` },
	{ value: Skill.INSIGHT, label: `Проницательность (Мудрость)` },
	{ value: Skill.INTIMIDATION, label: `Запугивание (Харизма)` },
	{ value: Skill.INVESTIGATION, label: `Расследование (Интеллект)` },
	{ value: Skill.MEDICINE, label: `Медицина (Мудрость)` },
	{ value: Skill.NATURE, label: `Природа (Интеллект)` },
	{ value: Skill.PERCEPTION, label: `Восприятие (Мудрость)` },
	{ value: Skill.PERFORMANCE, label: `Выступления (Харизма)` },
	{ value: Skill.PERSUASION, label: `Убеждение (Харизма)` },
	{ value: Skill.RELIGION, label: `Религия (Мудрость)` },
	{ value: Skill.SLEIGHT_OF_HAND, label: `Ловкость рук (Ловкость)` },
	{ value: Skill.STEALTH, label: `Скрытность (Ловкость)` },
	{ value: Skill.SURVIVAL, label: `Выживание (Мудрость)` },
]

type Props = {
	index: number
	placeholder: string
	values: Map<number, Skill>
	initialValue?: Skill
	originSkills: Skill[]
	addValue: (index: number, instrument: Skill) => void
	removeValue: (index: number, instrument: Skill) => void
}

export default function SkillsSelect({
	index,
	placeholder,
	values,
	initialValue,
	addValue,
	removeValue,
	originSkills,
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
		}

		if (newValue && !Array.from(values.values()).includes(newValue)) {
			addValue(index, newValue)
			setSelected(newValue)
		} else setSelected('')
	}

	return (
		<Select value={selected} onChange={handleChange}>
			<Option value=''>{placeholder}</Option>
			{skillOptions.map(({ value, label }) => {
				const isSelected = value === selected
				const alreadyChosen = Array.from(values.values()).includes(value)
				const isOriginSkill = originSkills.includes(value)

				if ((!alreadyChosen && !isOriginSkill) || isSelected)
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
