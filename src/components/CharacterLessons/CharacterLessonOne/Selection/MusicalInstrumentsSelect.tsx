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
	placeholder: string
	values: Set<Instrument>
	addValue: (value: Instrument) => void
	removeValue: (value: Instrument) => void
	updateButtonState: (value: number) => void
}

export default function MusicalInstrumentsSelect({
	placeholder,
	values,
	addValue,
	removeValue,
	updateButtonState,
}: Props) {
	const [selected, setSelected] = useState<Instrument | ''>('')

	useEffect(() => {}, [values])

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newValue = e.target.value as Instrument

		if (selected && values.has(selected)) {
			removeValue(selected)
			updateButtonState(-1)
		}
		if (newValue && !values.has(newValue)) {
			addValue(newValue)
			setSelected(newValue)
			updateButtonState(1)
		} else setSelected('')
	}

	return (
		<Select value={selected} onChange={handleChange}>
			<Option value=''>{placeholder}</Option>
			{instrumentOptions.map(({ value, label }) => {
				const isSelected = value === selected
				const alreadyChosen = values.has(value)

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
