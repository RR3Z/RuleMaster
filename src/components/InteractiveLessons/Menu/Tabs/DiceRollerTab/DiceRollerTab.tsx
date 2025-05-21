import DiceRoller from '@/InteractiveLessons/DiceRoller/DiceRoller'
import { DiceRollerFormula } from '@/InteractiveLessons/DiceRoller/Types/DiceRollerFormula'
import { DiceType } from '@/InteractiveLessons/DiceRoller/Types/DiceType'
import { useState } from 'react'
import styled from 'styled-components'
import DiceCard from './DiceCard'
import DiceRollerTabButton from './DiceRollerTabButton'

const MainContainer = styled.div`
	flex-grow: 1;
	margin: 5px;
	border-radius: 3px;
	background: #d6d4c8;
	color: black;
	display: flex;
	flex-direction: column;
`

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	flex-grow: 1;
	padding: 10px;
`

const TopContainer = styled.div`
	display: flex;
	flex-grow: 1;
	justify-content: center;
	align-items: center;
`

const DicesContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, auto);
	grid-template-rows: repeat(3, auto);
	gap: 75px;
`

const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	width: 100%;
`

type Props = {
	diceRoller: DiceRoller
}

export default function DiceRollerTab({ diceRoller }: Props) {
	const [d4, setD4Count] = useState<number>(0)
	const [d6, setD6Count] = useState<number>(0)
	const [d8, setD8Count] = useState<number>(0)
	const [d10, setD10Count] = useState<number>(0)
	const [d12, setD12Count] = useState<number>(0)
	const [d20, setD20Count] = useState<number>(0)

	const formulas = () => {
		const formulas: DiceRollerFormula[] = []

		if (d4 > 0) formulas.push({ type: DiceType.D4, count: d4 })
		if (d6 > 0) formulas.push({ type: DiceType.D6, count: d6 })
		if (d8 > 0) formulas.push({ type: DiceType.D8, count: d8 })
		if (d10 > 0) formulas.push({ type: DiceType.D10, count: d10 })
		if (d12 > 0) formulas.push({ type: DiceType.D12, count: d12 })
		if (d20 > 0) formulas.push({ type: DiceType.D20, count: d20 })

		return formulas
	}

	const clearDices = () => {
		setD4Count(0)
		setD6Count(0)
		setD8Count(0)
		setD10Count(0)
		setD12Count(0)
		setD20Count(0)
	}

	return (
		<MainContainer>
			<Content>
				<TopContainer>
					<DicesContainer>
						<DiceCard
							image='/dices/2d/d4.png'
							value={d4}
							valuePlaceholder='К4'
							onIncrease={() => {
								if (d4 + 1 > 10) return
								setD4Count(d4 + 1)
							}}
							onDecrease={() => {
								if (d4 - 1 < 0) return
								setD4Count(d4 - 1)
							}}
						/>
						<DiceCard
							image='/dices/2d/d6.png'
							value={d6}
							valuePlaceholder='К6'
							onIncrease={() => {
								if (d6 + 1 > 10) return
								setD6Count(d6 + 1)
							}}
							onDecrease={() => {
								if (d6 - 1 < 0) return
								setD6Count(d6 - 1)
							}}
						/>
						<DiceCard
							image='/dices/2d/d8.png'
							value={d8}
							valuePlaceholder='К8'
							onIncrease={() => {
								if (d8 + 1 > 10) return
								setD8Count(d8 + 1)
							}}
							onDecrease={() => {
								if (d8 - 1 < 0) return
								setD8Count(d8 - 1)
							}}
						/>
						<DiceCard
							image='/dices/2d/d10.png'
							value={d10}
							valuePlaceholder='К10'
							onIncrease={() => {
								if (d10 + 1 > 10) return
								setD10Count(d10 + 1)
							}}
							onDecrease={() => {
								if (d10 - 1 < 0) return
								setD10Count(d10 - 1)
							}}
						/>
						<DiceCard
							image='/dices/2d/d12.png'
							value={d12}
							valuePlaceholder='К12'
							onIncrease={() => {
								if (d12 + 1 > 10) return
								setD12Count(d12 + 1)
							}}
							onDecrease={() => {
								if (d12 - 1 < 0) return
								setD12Count(d12 - 1)
							}}
						/>
						<DiceCard
							image='/dices/2d/d20.png'
							value={d20}
							valuePlaceholder='К20'
							onIncrease={() => {
								if (d20 + 1 > 10) return
								setD20Count(d20 + 1)
							}}
							onDecrease={() => {
								if (d20 - 1 < 0) return
								setD20Count(d20 - 1)
							}}
						/>
					</DicesContainer>
				</TopContainer>
				<ButtonsContainer>
					<DiceRollerTabButton
						name='Совершить бросок'
						onClick={() => {
							diceRoller.makeRoll(formulas())
							clearDices()
						}}
					/>
					<DiceRollerTabButton
						name='Очистить выбор'
						onClick={() => {
							clearDices()
						}}
					/>
				</ButtonsContainer>
			</Content>
		</MainContainer>
	)
}
