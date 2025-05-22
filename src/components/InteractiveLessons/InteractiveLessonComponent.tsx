'use client'
import InteractiveLesson from '@/InteractiveLessons/InteractiveLesson'
import { Game } from '@/InteractiveLessons/Types/Game'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import InteractiveMapComponent from './InteractiveMap/InteractiveMapComponent'

const MainContainer = styled.div`
	display: flex;
	flex-direction: row;
	height: 100vh;
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
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
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
		}

		load()
	}, [])

	if (!interactiveLesson || isLoading) {
		return <LoadingContainer>Loading Lesson...</LoadingContainer>
	}

	return (
		<MainContainer>
			<InteractiveMapComponent
				canvas={interactiveLesson.interactiveMap.canvas}
			/>
			{/* <DiceRollerComponent canvas={interactiveLesson.diceRoller.canvas} />
			<Menu diceRoller={interactiveLesson.diceRoller} /> */}
		</MainContainer>
	)
}
