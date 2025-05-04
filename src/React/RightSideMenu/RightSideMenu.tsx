import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DiceRoller from '../../DiceRoller/DiceRoller'
import DiceRollerTab from '../DiceRollerTab/DiceRollerTab'
import CollapsedMenuControlButton from './CollapsedMenuControlButton'
import MenuControlButton from './MenuControlButton'

export type RightSideMenuProps = {
	diceRollerModule: DiceRoller
}

type ActiveTabs = 'logs' | 'diceRoller'

const StyledRightSideMenu = styled.div`
	* {
		z-index: 1;
	}
`

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
	padding: 5px 0px;
	flex: 1;
	width: 100%;
	box-sizing: border-box;
	overflow-y: auto;
`

export default function RightSideMenu({
	diceRollerModule,
}: RightSideMenuProps) {
	const [isCollapsed, setCollapseState] = useState<boolean>(false)
	const [activeTab, setActiveTab] = useState<ActiveTabs>('logs')
	const [isUncollapseMenuButtonVisibile, setUncollapseMenuButtonVisibility] =
		useState<boolean>(true)

	useEffect(() => {
		const onRollStartSubscription = diceRollerModule.onRollStart$.subscribe(
			() => {
				setCollapseState(true)
				setUncollapseMenuButtonVisibility(false)
			}
		)
		const onRollEndSubscription = diceRollerModule.onRollEnd$.subscribe(() => {
			setCollapseState(false)
			setUncollapseMenuButtonVisibility(true)
		})

		return () => {
			onRollStartSubscription.unsubscribe()
			onRollEndSubscription.unsubscribe()
		}
	}, [])

	return (
		<StyledRightSideMenu id='rightSideMenu'>
			{isCollapsed ? (
				<>
					<StyledCollapsedRightSideMenu id='collapsedMenuControl'>
						<CollapsedMenuControlButton
							id='collapseRightSideMenuButton'
							imgPath='/assets/button/messageBoxButton.png'
							isVisible={isUncollapseMenuButtonVisibile}
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
								imgPath='/assets/button/messageBoxButton.png'
								onClick={() => setActiveTab('logs')}
							></MenuControlButton>
							<MenuControlButton
								id='diceRollerButton'
								imgPath='/assets/menuIcons/diceRollerTab.svg'
								onClick={() => setActiveTab('diceRoller')}
							></MenuControlButton>
							<MenuControlButton
								id='collapseRightSideMenuButton'
								imgPath='/assets/button/messageBoxButton.png'
								onClick={() => setCollapseState(true)}
							></MenuControlButton>
						</StyledMenuControl>

						<StyledHorizontalLine />

						<StyledTabContent id='tabContent'>
							<DiceRollerTab
								diceRollerModule={diceRollerModule}
								isVisible={activeTab === 'diceRoller'}
							/>
						</StyledTabContent>
					</StyledRightSideMenuContent>
				</>
			)}
		</StyledRightSideMenu>
	)
}
