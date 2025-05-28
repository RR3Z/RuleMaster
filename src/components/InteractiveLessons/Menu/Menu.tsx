import DiceRoller from '@/InteractiveLessons/DiceRoller/DiceRoller'
import DefaultLogger from '@/InteractiveLessons/Logger/Logger'
import { useState } from 'react'
import styled from 'styled-components'
import HR from '../HorizontalLine/HR'
import MenuControlButton from './MenuControlButton'
import CharacterListTab from './Tabs/CharacterListTab/CharacterListTab'
import DiceRollerTab from './Tabs/DiceRollerTab/DiceRollerTab'
import LogsTab from './Tabs/LogsTab/LogsTab'

const MainContainer = styled.div<{ $isActive: boolean }>`
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
	visibility: ${({ $isActive }) => ($isActive ? 'visible' : 'hidden')};
`

const Control = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 0px;
	padding: 0px;
	gap: 10px;
`

const TabContentWrapper = styled.div<{ $isVisible: boolean }>`
	display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
	flex-direction: column;
	flex-grow: 1;
	overflow-y: auto;
`

type TabName = 'logs' | 'diceRoller' | 'characterList'

type Props = {
	diceRoller: DiceRoller
	logger: DefaultLogger
	isActive: boolean
}

export default function Menu({ diceRoller, logger, isActive }: Props) {
	const [activeTab, setActiveTab] = useState<TabName>('logs')

	return (
		<MainContainer $isActive={isActive}>
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

			<TabContentWrapper $isVisible={activeTab === 'logs'}>
				<LogsTab initialLogs={logger.logs} isActive={activeTab === 'logs'} />
			</TabContentWrapper>
			<TabContentWrapper $isVisible={activeTab === 'diceRoller'}>
				<DiceRollerTab diceRoller={diceRoller} />
			</TabContentWrapper>
			<TabContentWrapper $isVisible={activeTab === 'characterList'}>
				<CharacterListTab />
			</TabContentWrapper>
		</MainContainer>
	)
}
