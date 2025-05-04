import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DiceRoller from '../../DiceRoller/DiceRoller'
import ActionButton from '../ActionButton/ActionButton'

export type ActionsPanelProps = {
	diceRollerModule: DiceRoller
}

const Panel = styled.div`
	background: rgba(143, 143, 143, 0.3);
	padding: 3px;
	display: flex;
	flex-direction: row;
	gap: 5px;
	position: absolute;
	left: 0;
	bottom: 0;
`

export default function ActionsPanel({ diceRollerModule }: ActionsPanelProps) {
	const [isPanelVisible, setPanelVisibility] = useState(true)

	useEffect(() => {
		const onRollStartSubscription = diceRollerModule.onRollStart$.subscribe(
			() => setPanelVisibility(false)
		)
		const onRollEndSubscription = diceRollerModule.onRollEnd$.subscribe(() =>
			setPanelVisibility(true)
		)

		return () => {
			onRollStartSubscription.unsubscribe()
			onRollEndSubscription.unsubscribe()
		}
	}, [])

	return isPanelVisible === true ? (
		<Panel>
			<ActionButton text='1' />
			<ActionButton text='2' />
			<ActionButton text='3' />
		</Panel>
	) : undefined
}
