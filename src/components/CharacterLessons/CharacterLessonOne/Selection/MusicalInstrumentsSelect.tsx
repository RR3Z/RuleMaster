import { Instrument } from '@/types/CharacterLesson/Instruments/Instrument'
import { useEffect, useState } from 'react'
import { Option, Select } from './SelectStyles'

const instrumentOptions: { value: Instrument; label: string }[] = [
	{ value: Instrument.DRUM, label: 'Барабан' },
	{ value: Instrument.VIOLA, label: 'Виола' },
	{ value: Instrument.BAGPIPE, label: 'Волынка' },
	{ value: Instrument.LYRE, label: 'Лира' },
	{ value: Instrument.LUTE, label: 'Лютня' },
	{ value: Instrument.HORN, label: 'Рожок' },
	{ value: Instrument.WHISTLE, label: 'Свирель' },
	{ value: Instrument.FLUTE, label: 'Флейта' },
	{ value: Instrument.CYMBALS, label: 'Цимбалы' },
	{ value: Instrument.SHALMEI, label: 'Шалмей' },
]

type Props = {
	index: number
	placeholder: string
	values: Map<number, Instrument>
	initialValue?: Instrument
	addValue: (index: number, instrument: Instrument) => void
	removeValue: (index: number, instrument: Instrument) => void
	updateButtonState: (value: number) => void
}

export default function MusicalInstrumentsSelect({
	index,
	placeholder,
	values,
	initialValue,
	addValue,
	removeValue,
	updateButtonState,
}: Props) {
	const [selected, setSelected] = useState<Instrument | ''>(initialValue || '')

	useEffect(() => {}, [values])

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newValue = e.target.value as Instrument

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
			{instrumentOptions.map(({ value, label }) => {
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
