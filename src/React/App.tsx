import React, { useEffect } from 'react'
import DiceRoller from '../DiceRoller/DiceRoller.ts'
import ActionsPanel from './ActionsPanel/ActionsPanel.tsx'
import MessageBox from './MessageBox/MessageBox.tsx'
import RightSideMenu from './RightSideMenu/RightSideMenu.tsx'

export type AppProps = {
	onMount: () => void
	diceRollerModule: DiceRoller
}

export default function App({ onMount, diceRollerModule }: AppProps) {
	useEffect(() => {
		onMount()
	}, [])

	return (
		<>
			<MessageBox />
			<RightSideMenu diceRollerModule={diceRollerModule} />
			<ActionsPanel />
		</>
	)
}
