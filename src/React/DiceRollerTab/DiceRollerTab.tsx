import React from 'react'
import styled from 'styled-components'
import CustomMenuButton from '../CustomMenuButton/CustomMenuButton'
import DiceSelector from '../DiceSelector/DiceSelector'

const StyledTab = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0px 20px;
	height: 100%;

	.customMenuButton {
		margin-bottom: 5px;
	}
`

const DiceSelectors = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(3, 1fr);
	width: 100%;
	height: 100%;
`

export default function DiceRollerTab() {
	return (
		<StyledTab>
			<DiceSelectors id='diceSelectors'>
				<DiceSelector name='D20' imageSrc='/assets/dices/D20.svg' />
				<DiceSelector name='D20' imageSrc='/assets/dices/D20.svg' />
				<DiceSelector name='D20' imageSrc='/assets/dices/D20.svg' />
				<DiceSelector name='D20' imageSrc='/assets/dices/D20.svg' />
				<DiceSelector name='D20' imageSrc='/assets/dices/D20.svg' />
				<DiceSelector name='D20' imageSrc='/assets/dices/D20.svg' />
			</DiceSelectors>
			<CustomMenuButton text='Совершить бросок' />
			<CustomMenuButton text='Очистить выбор' />
		</StyledTab>
	)
}
