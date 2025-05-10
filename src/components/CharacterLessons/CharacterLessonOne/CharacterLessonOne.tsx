'use client'
import { ClassData } from '@/types/CharacterLesson/Classes/ClassData'
import { LessonOneData } from '@/types/CharacterLesson/LessonOneData'
import { OriginData } from '@/types/CharacterLesson/Origins/OriginData'
import { RaceData } from '@/types/CharacterLesson/Races/RaceData'
import { LessonStep } from '@/types/CharacterLesson/Steps/LessonStep'
import { TextData } from '@/types/CharacterLesson/Steps/TextData'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import LessonButton from '../LessonButton'
import TextSection from '../TextSection'
import ClassesList from './Classes/ClassesList'
import OriginsList from './Origins/OriginsList'
import RacesList from './Races/RacesList'

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	max-width: 50vw;
	margin: 0 auto;
	gap: 10px;
`

const ButtonsContainer = styled.div`
	display: flex;
	width: 100%;

	#prevStep {
		margin-right: auto;
	}

	#nextStep,
	#endStep {
		margin-left: auto;
	}
`

export type Props = {
	data: LessonOneData
}

export default function CharacterLessonOne({ data }: Props) {
	// Character Data
	const [race, setRace] = useState<RaceData>()
	const [clazz, setClazz] = useState<ClassData>()
	const [origin, setOrigin] = useState<OriginData>()

	// Steps
	const [currentStep, setStep] = useState<LessonStep>(
		LessonStep.LESSON_INTRODUCTION
	)

	const renderStep = () => {
		switch (currentStep) {
			case LessonStep.LESSON_INTRODUCTION:
				return data.introduction.map((data: TextData, index: number) => (
					<TextSection data={data} key={index} />
				))
			case LessonStep.LEVEL_EXPLANATION:
				return data.levelExplanation.map((data: TextData, index: number) => (
					<TextSection data={data} key={index} />
				))
			case LessonStep.CLASS_EXPLANATION:
				return data.classExplanation.map((data: TextData, index: number) => (
					<TextSection data={data} key={index} />
				))
			case LessonStep.CLASS_SELECTION:
				return (
					<ClassesList
						data={data.classesData}
						selectedClass={clazz}
						selectClass={setClazz}
					/>
				)
			case LessonStep.RACE_EXPLANATION:
				return data.raceExplanation.map((data: TextData, index: number) => (
					<TextSection data={data} key={index} />
				))
			case LessonStep.RACE_SELECTION:
				return (
					<RacesList
						data={data.racesData}
						selectedRace={race}
						selectRace={setRace}
					/>
				)
			case LessonStep.ORIGIN_EXPLANATION:
				return data.originExplanation.map((data: TextData, index: number) => (
					<TextSection data={data} key={index} />
				))
			case LessonStep.ORIGIN_SELECTION:
				return (
					<OriginsList
						data={data.originsData}
						selectedOrigin={origin}
						selectOrigin={setOrigin}
					/>
				)
			default:
				console.error('CharacterLessonOne -> renderStep(): Unknown step!')
				break
		}
	}

	// Buttons
	const [nextButtonActivity, setNextButtonActivity] = useState<boolean>(true)
	const [prevButtonActivity, setPrevButtonActivity] = useState<boolean>(false)
	const [endButtonActivity, setEndButtonActivity] = useState<boolean>(false)
	const [buttonErrorMessage, setButtonErrorMessage] = useState('')

	useEffect(() => {
		switch (currentStep) {
			case LessonStep.LESSON_INTRODUCTION:
				setNextButtonActivity(true)
				setPrevButtonActivity(false)
				setEndButtonActivity(false)
				setButtonErrorMessage('')
				break
			case LessonStep.LEVEL_EXPLANATION:
				setNextButtonActivity(true)
				setPrevButtonActivity(true)
				setEndButtonActivity(false)
				setButtonErrorMessage('')
				break
			case LessonStep.CLASS_EXPLANATION:
				setNextButtonActivity(true)
				setPrevButtonActivity(true)
				setEndButtonActivity(false)
				setButtonErrorMessage('')
				break
			case LessonStep.CLASS_SELECTION:
				if (clazz === undefined) setNextButtonActivity(false)
				else setNextButtonActivity(true)
				setPrevButtonActivity(true)
				setEndButtonActivity(false)
				setButtonErrorMessage('Вы должны выбрать класс!')
				break
			case LessonStep.RACE_EXPLANATION:
				setNextButtonActivity(true)
				setPrevButtonActivity(true)
				setEndButtonActivity(false)
				setButtonErrorMessage('')
				break
			case LessonStep.RACE_SELECTION:
				if (race === undefined) setNextButtonActivity(false)
				else setNextButtonActivity(true)
				setPrevButtonActivity(true)
				setEndButtonActivity(false)
				setButtonErrorMessage('Вы должны выбрать расу!')
				break
			case LessonStep.ORIGIN_EXPLANATION:
				setNextButtonActivity(true)
				setPrevButtonActivity(true)
				setEndButtonActivity(false)
				setButtonErrorMessage('')
				break
			case LessonStep.ORIGIN_SELECTION:
				if (origin === undefined) setNextButtonActivity(false)
				else setNextButtonActivity(true)
				setPrevButtonActivity(true)
				setEndButtonActivity(false)
				setButtonErrorMessage('Вы должны выбрать происхождение!')
				break
		}
	}, [currentStep, race, clazz, origin])

	return (
		<MainContainer>
			{renderStep()}
			<ButtonsContainer>
				{currentStep !== LessonStep.LESSON_INTRODUCTION ? (
					<LessonButton
						id='prevStep'
						text='❮  Назад'
						activity={prevButtonActivity}
						onClick={() => setStep(currentStep - 1)}
						errorMessage={buttonErrorMessage}
					/>
				) : undefined}
				{currentStep !== LessonStep.END ? (
					<LessonButton
						id='nextStep'
						text='Далее  ❯'
						activity={nextButtonActivity}
						onClick={() => setStep(currentStep + 1)}
						errorMessage={buttonErrorMessage}
					/>
				) : (
					<LessonButton
						id='endStep'
						text='Завершить ✓'
						activity={endButtonActivity}
						onClick={() =>
							console.error('TODO: ВЫВОДИТЬ ЭТО В PDF И СОХРАНЯТЬ ПОЛЬЗОВАТЕЛЮ')
						}
						errorMessage={buttonErrorMessage}
					/>
				)}
			</ButtonsContainer>
		</MainContainer>
	)
}
