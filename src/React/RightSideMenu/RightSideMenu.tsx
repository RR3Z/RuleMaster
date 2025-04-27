import React, { useState } from 'react'
import styled from 'styled-components'
import CollapsedMenuControlButton from './CollapsedMenuControlButton'
import MenuControlButton from './MenuControlButton'

type ActiveTabs = 'logs' | 'diceRoller'

const StyledCollapsedRightSideMenu = styled.div`
	position: absolute;
	background-color: gray;
	right: 0;
	margin-top: 5px;
	gap: 2px;
`

const StyledRightSideMenuContent = styled.div`
	display: flex;
	flex-direction: column;
	width: 20vw;
	height: 99vh;
	position: absolute;
	background-color: gray;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
`

const StyledMenuControl = styled.nav`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	gap: 2px;
`

const StyledHorizontalLine = styled.hr`
	border: none;
	height: 2px;
	background-color: #000;
`

const StyledTabContent = styled.div`
	padding: 5px 3px;
	flex: 1;
	width: 100%;
	box-sizing: border-box;
	overflow-y: auto;
`

export default function RightSideMenu() {
	const [isCollapsed, setCollapseState] = useState<boolean>(false)
	const [activeTab, setActiveTab] = useState<ActiveTabs>('logs')

	return (
		<div id='rightSideMenu'>
			{isCollapsed ? (
				<>
					<StyledCollapsedRightSideMenu id='collapsedMenuControl'>
						<CollapsedMenuControlButton
							id='collapseRightSideMenuButton'
							imgPath='/public/assets/button/messageBoxButton.png'
							onClick={() => setCollapseState(false)}
						></CollapsedMenuControlButton>
					</StyledCollapsedRightSideMenu>
				</>
			) : (
				<>
					<StyledRightSideMenuContent id='menuContent'>
						<StyledMenuControl id='menuControl'>
							<MenuControlButton
								id='logsButton'
								imgPath='/public/assets/button/messageBoxButton.png'
								onClick={() => setActiveTab('logs')}
							></MenuControlButton>
							<MenuControlButton
								id='diceRollerButton'
								imgPath='/public/assets/button/messageBoxButton.png'
								onClick={() => setActiveTab('diceRoller')}
							></MenuControlButton>
							<MenuControlButton
								id='collapseRightSideMenuButton'
								imgPath='/public/assets/button/messageBoxButton.png'
								onClick={() => setCollapseState(true)}
							></MenuControlButton>
						</StyledMenuControl>

						<StyledHorizontalLine />

						<StyledTabContent id='tabContent'>
							{activeTab === 'logs' ? 'Logs' : undefined}
							{activeTab === 'diceRoller' ? 'DiceRoller' : undefined}
						</StyledTabContent>
					</StyledRightSideMenuContent>
				</>
			)}
		</div>
	)
}
