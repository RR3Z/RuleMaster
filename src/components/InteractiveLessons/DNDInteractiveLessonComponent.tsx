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
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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

const SiteLogoLink = styled(Link)`
	position: absolute;
	top: 15px;
	left: 15px;
	z-index: 1000;
	display: inline-block;
	padding: 5px;
	border-radius: 5px;
	line-height: 0;
	cursor: pointer;
	width: 90px;

	@media (max-width: 2560px) {
		width: 90px;
	}

	@media (max-width: 1280px) {
		width: 60px;
	}

	@media (max-width: 1024px) {
		width: 50px;
	}
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
	const router = useRouter()

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
	const [
		isTutorialCompletedAndPendingRedirect,
		setIsTutorialCompletedAndPendingRedirect,
	] = useState(false)
	const [completionTestUrl, setCompletionTestUrl] = useState<string | null>(
		null
	)

	useEffect(() => {
		let newRollSubscription: Subscription | undefined
		let rollEndSubscription: Subscription | undefined
		let onNextStepSubscription: Subscription | undefined
		let onWrongActionSubscription: Subscription | undefined
		let onTurnsOrderUpdateSubscription: Subscription | undefined
		let onTutorialEndSubscription: Subscription | undefined

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
				if (
					lessonInstance.tutorialSystem.currentStep &&
					lessonInstance.tutorialSystem.currentStep.messages.length > 0
				) {
					setMessageBoxContent(
						lessonInstance.tutorialSystem.currentStep.messages
					)
				} else {
					setMessageBoxContent([])
				}

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

				onTutorialEndSubscription =
					lessonInstance.tutorialSystem.onTutorialEnd$.subscribe(
						(completionMessages: string[]) => {
							setMessageBoxContent(completionMessages)
							if (lessonInstance.completionTestLink) {
								setCompletionTestUrl(lessonInstance.completionTestLink)
							}
							setIsTutorialCompletedAndPendingRedirect(true)
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
			if (onTutorialEndSubscription) {
				onTutorialEndSubscription.unsubscribe()
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

	const handleTutorialCompletionMessageClosed = () => {
		if (isTutorialCompletedAndPendingRedirect) {
			if (completionTestUrl) {
				window.open(completionTestUrl, '_blank')
			} else {
				router.push('/games/dnd/interactive')
			}
			setIsTutorialCompletedAndPendingRedirect(false)
			setCompletionTestUrl(null)
		}
	}

	if (!interactiveLesson || isLoading) {
		return <LoadingContainer>Loading Lesson...</LoadingContainer>
	}

	return (
		<MainContainer>
			<SiteLogoLink href='/'>
				<Image
					src='/SiteLogo.svg'
					alt='RuleMaster Logo'
					width={72}
					height={89}
					sizes='(max-width: 1024px) 50px, (max-width: 1280px) 60px, (max-width: 2560px) 90px, 90px'
					priority
					style={{
						width: '100%',
						height: 'auto',
						display: 'block',
					}}
				/>
			</SiteLogoLink>

			<InteractiveMapComponent
				canvas={interactiveLesson.interactiveMap.canvas}
			/>
			<DiceRollerComponent
				canvas={interactiveLesson.diceRoller.canvas}
				isActive={isDiceRollerActive}
			/>
			<Menu
				player={interactiveLesson.interactiveMap.player as DNDCharacter}
				diceRoller={interactiveLesson.diceRoller}
				isActive={isMenuActive}
				logger={interactiveLesson.logger}
			/>
			<MessageBox
				initialContent={messageBoxContent}
				onAllMessagesShown={handleTutorialCompletionMessageClosed}
			/>
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
