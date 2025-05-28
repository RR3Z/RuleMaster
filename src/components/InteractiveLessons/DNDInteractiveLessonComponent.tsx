'use client'
import DNDActionsManager from '@/InteractiveLessons/ActionsManager/DND/DNDActionsManager'
import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import DNDInitiativeManager from '@/InteractiveLessons/InitiativeManager/DND/DNDInitiativeManager'
import InteractiveLesson from '@/InteractiveLessons/InteractiveLesson'
import DNDInteractiveMapModel from '@/InteractiveLessons/InteractiveMap/Model/DNDInteractiveMapModel'
import DefaultDNDInteractiveMapView from '@/InteractiveLessons/InteractiveMap/View/DefaultDNDInteractiveMapView'
import GridOfCellsAreaHighlighter from '@/InteractiveLessons/InteractiveMap/Visual/AreaHighlighter/GridOfCellsAreaHighlighter'
import { TutorialStep } from '@/InteractiveLessons/TutorialSystem/Types/TutorialStep'
import { Game } from '@/InteractiveLessons/Types/Game'
import { useEffect, useState } from 'react'
import { Subscription } from 'rxjs'
import styled from 'styled-components'
import { DNDActionsPanel } from './ActionsPanel/DNDActionsPanel'
import DiceRollerComponent from './DiceRoller/DiceRollerComponent'
import InitiativeTracker from './InitiativeTracker/InitiativeTracker'
import InteractiveMapComponent from './InteractiveMap/InteractiveMapComponent'
import Menu from './Menu/Menu'
import MessageBox from './MessageBox/MessageBox'

const MainContainer = styled.div`
	position: fixed;
	overflow: hidden;
	display: flex;
	flex-direction: row;
	height: 100vh;
	width: 100vw;
`

const LoadingContainer = styled.div`
	font-size: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
`

type Props = {
	game: Game
	interactiveMapDataFilePath: string
	tutorialDataFilePath: string
	dicesModelsFilePath: string
	playerVisualFilePath: string
	enemiesVisualFilePath: string[]
}

export default function DNDInteractiveLessonComponent({
	game,
	interactiveMapDataFilePath,
	tutorialDataFilePath,
	dicesModelsFilePath,
	playerVisualFilePath,
	enemiesVisualFilePath,
}: Props) {
	const [interactiveLesson, setInteractiveLesson] =
		useState<InteractiveLesson>()
	const [isDiceRollerActive, setDiceRollerActivity] = useState(false)
	const [isActionsPanelActive, setActionsPanelActivity] = useState(true)
	const [initiativeManager, setInitiativeManager] =
		useState<DNDInitiativeManager | null>(null)
	const [areaHighlighter, setAreaHighlighter] =
		useState<GridOfCellsAreaHighlighter | null>(null)
	const [initiativeTrackerActivity, setInitiativeTrackerActivity] =
		useState(false)
	const [isMenuActive, setMenuActivity] = useState(true)
	const [isLoading, setIsLoading] = useState(true)
	const [messageBoxContent, setMessageBoxContent] = useState<string[]>([
		'NOT INITIALIZED',
	])

	useEffect(() => {
		let newRollSubscription: Subscription | undefined
		let rollEndSubscription: Subscription | undefined
		let onNextStepSubscription: Subscription | undefined
		let onWrongActionSubscription: Subscription | undefined
		let onTurnsOrderUpdateSubscription: Subscription | undefined

		async function load() {
			setIsLoading(true)

			const lessonInstance = new InteractiveLesson()
			setInteractiveLesson(lessonInstance)
			await lessonInstance.init(
				game,
				tutorialDataFilePath,
				interactiveMapDataFilePath,
				dicesModelsFilePath,
				playerVisualFilePath,
				enemiesVisualFilePath
			)

			setIsLoading(false)

			if (lessonInstance.diceRoller) {
				newRollSubscription = lessonInstance.diceRoller.onNewRoll$.subscribe(
					() => {
						setDiceRollerActivity(true)
						setMenuActivity(false)
						setActionsPanelActivity(false)
					}
				)

				rollEndSubscription = lessonInstance.diceRoller.onRollEnd$.subscribe(
					() => {
						setDiceRollerActivity(false)
						setMenuActivity(true)
						setActionsPanelActivity(true)
					}
				)
			}

			if (lessonInstance.tutorialSystem) {
				setMessageBoxContent(lessonInstance.tutorialSystem.currentStep.messages)

				onNextStepSubscription =
					lessonInstance.tutorialSystem.onNextStep$.subscribe(
						(step: TutorialStep) => {
							setMessageBoxContent(step.messages)
						}
					)
				onWrongActionSubscription =
					lessonInstance.tutorialSystem.onWrongAction$.subscribe(
						(message: string) => {
							setMessageBoxContent([message])
						}
					)
			}

			if (
				lessonInstance.interactiveMap &&
				lessonInstance.interactiveMap.model instanceof DNDInteractiveMapModel
			) {
				const initiativeManager = (
					lessonInstance.interactiveMap.model as DNDInteractiveMapModel
				).initiativeManager

				setInitiativeManager(initiativeManager)
				onTurnsOrderUpdateSubscription =
					initiativeManager.onTurnsOrderUpdate$.subscribe(() => {
						setInitiativeTrackerActivity(true)
					})
			}

			if (
				lessonInstance.interactiveMap &&
				lessonInstance.interactiveMap.view instanceof
					DefaultDNDInteractiveMapView
			) {
				const areaHighlighter = (
					lessonInstance.interactiveMap.view as DefaultDNDInteractiveMapView
				).visualEngine.areaHighlighter

				setAreaHighlighter(areaHighlighter)
			}
		}

		load()

		return () => {
			if (newRollSubscription) {
				newRollSubscription.unsubscribe()
			}
			if (rollEndSubscription) {
				rollEndSubscription.unsubscribe()
			}
			if (onNextStepSubscription) {
				onNextStepSubscription.unsubscribe()
			}
			if (onWrongActionSubscription) {
				onWrongActionSubscription.unsubscribe()
			}
			if (onTurnsOrderUpdateSubscription) {
				onTurnsOrderUpdateSubscription.unsubscribe()
			}
		}
	}, [
		game,
		tutorialDataFilePath,
		interactiveMapDataFilePath,
		dicesModelsFilePath,
		playerVisualFilePath,
		enemiesVisualFilePath,
	])

	if (!interactiveLesson || isLoading) {
		return <LoadingContainer>Loading Lesson...</LoadingContainer>
	}

	return (
		<MainContainer>
			<InteractiveMapComponent
				canvas={interactiveLesson.interactiveMap.canvas}
			/>
			<DiceRollerComponent
				canvas={interactiveLesson.diceRoller.canvas}
				isActive={isDiceRollerActive}
			/>
			<Menu
				diceRoller={interactiveLesson.diceRoller}
				isActive={isMenuActive}
				logger={interactiveLesson.logger}
			/>
			<MessageBox initialContent={messageBoxContent} />
			{initiativeTrackerActivity && initiativeManager && (
				<InitiativeTracker
					initiativeManager={initiativeManager}
					characterTokenPaths={
						interactiveLesson.interactiveMap.charactersVisualFilePaths
					}
				/>
			)}
			{areaHighlighter && (
				<DNDActionsPanel
					actionsManager={
						interactiveLesson.interactiveMap.actionsManager as DNDActionsManager
					}
					player={interactiveLesson.interactiveMap.player as DNDCharacter}
					areaHighlighter={areaHighlighter}
					isActive={isActionsPanelActive}
				/>
			)}
		</MainContainer>
	)
}
