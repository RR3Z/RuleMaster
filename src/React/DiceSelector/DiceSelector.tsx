import React, { useState } from 'react'
import styled from 'styled-components'
import CustomMenuButton from '../CustomMenuButton/CustomMenuButton'

export type DiceSelectorProps = {
	name: string
	imageSrc: string
}

const SelectorContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const SelectorController = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 5px;
`

const SelectorSpan = styled.span`
	text-align: center;
	min-width: 30px;
	margin: 0px 5px;
`

export default function DiceSelector({ name, imageSrc }: DiceSelectorProps) {
	const [value, setStateValue] = useState<number>(0)
	const setValue = (newVal: number) => {
		const clamped = Math.max(0, Math.min(newVal, 10))
		setStateValue(clamped)
	}

	return (
		<SelectorContainer id={'diceSelector' + name}>
			<img src={imageSrc} alt={'diceSelector' + name + 'Img'} />
			<SelectorController>
				<CustomMenuButton text='+' onClick={() => setValue(value + 1)} />
				<SelectorSpan>{value === 0 ? name : value}</SelectorSpan>
				<CustomMenuButton text='-' onClick={() => setValue(value - 1)} />
			</SelectorController>
		</SelectorContainer>
	)
}
