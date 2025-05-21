import DiceRoller from '@/InteractiveLessons/DiceRoller/DiceRoller'
import { useState } from 'react'
import styled from 'styled-components'
import HR from '../HorizontalLine/HR'
import MenuControlButton from './MenuControlButton'
import CharacterListTab from './Tabs/CharacterListTab/CharacterListTab'
import DiceRollerTab from './Tabs/DiceRollerTab/DiceRollerTab'
import LogsTab from './Tabs/LogsTab/LogsTab'

const MainContainer = styled.div`
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	z-index: 10;
	width: 20vw;
	height: 98vh;
	background-color: rgba(0, 0, 0, 0.7);
	border-radius: 3px;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
`

const Control = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 0px;
	padding: 0px;
	gap: 10px;
`

type Props = {
	diceRoller: DiceRoller
}

export default function Menu({ diceRoller }: Props) {
	const [activeTab, setActiveTab] = useState<
		'logs' | 'diceRoller' | 'characterList'
	>('logs')

	return (
		<MainContainer>
			<Control>
				<MenuControlButton
					onClick={() => {
						setActiveTab('logs')
					}}
					name='Логи'
					tabName='logs'
					activeTab={activeTab}
				/>
				<MenuControlButton
					onClick={() => {
						setActiveTab('diceRoller')
					}}
					name='Дайсы'
					tabName='diceRoller'
					activeTab={activeTab}
				/>
				<MenuControlButton
					onClick={() => {
						setActiveTab('characterList')
					}}
					name='Персонаж'
					tabName='characterList'
					activeTab={activeTab}
				/>
			</Control>
			<HR />
			{activeTab === 'logs' && <LogsTab />}
			{activeTab === 'diceRoller' && <DiceRollerTab diceRoller={diceRoller} />}
			{activeTab === 'characterList' && <CharacterListTab />}
		</MainContainer>
	)
}
