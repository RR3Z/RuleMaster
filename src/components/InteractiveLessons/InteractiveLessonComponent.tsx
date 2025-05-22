'use client'
import InteractiveLesson from '@/InteractiveLessons/InteractiveLesson'
import { Game } from '@/InteractiveLessons/Types/Game'
import { useEffect, useState } from 'react'
import { Subscription } from 'rxjs'
import styled from 'styled-components'
import DiceRollerComponent from './DiceRoller/DiceRollerComponent'
import InteractiveMapComponent from './InteractiveMap/InteractiveMapComponent'
import Menu from './Menu/Menu'

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

export default function InteractiveLessonComponent({
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
	const [isMenuActive, setMenuActivity] = useState(true)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		let newRollSubscription: Subscription | undefined
		let rollEndSubscription: Subscription | undefined

		async function load() {
			setIsLoading(true)

			const lessonInstance = new InteractiveLesson()
			setInteractiveLesson(lessonInstance)
			await lessonInstance.init(
				game,
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
					}
				)

				rollEndSubscription = lessonInstance.diceRoller.onRollEnd$.subscribe(
					() => {
						setDiceRollerActivity(false)
						setMenuActivity(true)
					}
				)
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
		}
	}, [
		game,
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
			<Menu diceRoller={interactiveLesson.diceRoller} isActive={isMenuActive} />
		</MainContainer>
	)
}
