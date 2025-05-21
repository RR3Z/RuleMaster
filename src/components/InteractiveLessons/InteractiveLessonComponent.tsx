'use client'
import DicesLoader from '@/InteractiveLessons/DiceRoller/DicesLoader'
import InteractiveLesson from '@/InteractiveLessons/InteractiveLesson'
import { Game } from '@/InteractiveLessons/Types/Game'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import DiceRollerComponent from './DiceRoller/DiceRollerComponent'
import Menu from './Menu/Menu'

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
	mapDataFilePath: string
	tutorialDataFilePath: string
	dicesModelsFilePath: string
}

export default function InteractiveLessonComponent({
	mapDataFilePath,
	tutorialDataFilePath,
	dicesModelsFilePath,
}: Props) {
	const [interactiveLesson, setInteractiveLesson] =
		useState<InteractiveLesson>()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		async function load() {
			setIsLoading(true)

			const dicesLoader = new DicesLoader()
			const dicesModels = await dicesLoader.loadModels(dicesModelsFilePath)
			const lessonInstance = new InteractiveLesson(Game.DND, dicesModels)
			setInteractiveLesson(lessonInstance)

			setIsLoading(false)
		}

		load()
	}, [])

	if (!interactiveLesson || isLoading) {
		return <LoadingContainer>Loading Lesson...</LoadingContainer>
	}

	return (
		<MainContainer>
			<DiceRollerComponent canvas={interactiveLesson.diceRoller.canvas} />
			<Menu diceRoller={interactiveLesson.diceRoller} />
		</MainContainer>
	)
}
