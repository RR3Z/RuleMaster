import React, { useState } from 'react'
import styled from 'styled-components'
import { DicesRollFormula } from '../../DiceRoller/_Types/DicesRollFormula'
import { DiceType } from '../../DiceRoller/_Types/DiceType'
import DiceRoller from '../../DiceRoller/DiceRoller'
import CustomMenuButton from '../CustomMenuButton/CustomMenuButton'
import DiceSelector from '../DiceSelector/DiceSelector'

export type DiceRollerTabProps = {
	diceRollerModule: DiceRoller
	isVisible: boolean
}

const StyledTab = styled.div<{ $isVisible: boolean }>`
	display: ${props => (props.$isVisible ? 'none' : 'flex')};
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

export default function DiceRollerTab({
	diceRollerModule,
	isVisible,
}: DiceRollerTabProps) {
	const [D20Count, setD20Count] = useState<number>(0)
	// TODO: добавить сюда другие кнопки

	const makeRoll = () => {
		const formulas: DicesRollFormula[] = []
		if (D20Count > 0) formulas.push({ type: DiceType.D20, count: D20Count })

		if (formulas.length > 0) {
			diceRollerModule.makeRoll(formulas)
			clearDicesCount()
		}
	}

	const clearDicesCount = () => {
		setD20Count(0)
	}

	return (
		<StyledTab $isVisible={isVisible} id='diceRollerTab'>
			<DiceSelectors id='diceSelectors'>
				<DiceSelector
					name='D20'
					imageSrc='/assets/dices/D20.svg'
					value={D20Count}
					updateValue={setD20Count}
				/>
			</DiceSelectors>
			<CustomMenuButton text='Совершить бросок' onClick={makeRoll} />
			<CustomMenuButton text='Очистить выбор' onClick={clearDicesCount} />
		</StyledTab>
	)
}
