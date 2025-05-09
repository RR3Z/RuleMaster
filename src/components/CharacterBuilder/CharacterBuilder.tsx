'use client'
import BuilderButton from '@/components/CharacterBuilder/BuilderButton'
import TextSection from '@/components/CharacterBuilder/TextSection'
import { BuilderData } from '@/types/CharacterBuilder/BuilderData'
import { BuilderStep } from '@/types/CharacterBuilder/BuilderStep'
import { DNDClass } from '@/types/CharacterBuilder/DNDClass'
import { WelcomeData } from '@/types/CharacterBuilder/Steps/WelcomeData'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import CharacterName from './CharacterName'
import ClassesList from './Classes/ClassesList/ClassesList'

const StyledLayout = styled.div`
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

export const DEFAULT_NAME = 'Персонаж'

export default function CharacterBuilder({ data }: { data: BuilderData }) {
	// Character data
	const [name, setName] = useState<string>(DEFAULT_NAME)
	const [classes, setClasses] = useState<DNDClass[]>([])

	const addClass = (clazz: DNDClass) => {
		setClasses(prev => {
			if (!prev.includes(clazz)) return [...prev, clazz]
			return prev
		})

		onClassSelection()
	}
	const removeClass = (clazz: DNDClass) => {
		setClasses(prev => {
			return prev.filter(c => c !== clazz)
		})
	}
	const onClassSelection = () => {
		if (step === BuilderStep.CLASS_SELECTION) setStep(step + 1)
	}

	const [nextButtonActivity, setNextButtonActivity] = useState(true)
	const [prevButtonActivity, setPrevButtonActivity] = useState(true)
	const [endButtonActivity, setEndButtonActivity] = useState(false)
	const [buttonErrorMsg, setErrorMsg] = useState('')
	const [step, setStep] = useState<BuilderStep>(BuilderStep.LESSON_WELCOME)

	useEffect(() => {
		switch (step) {
			case BuilderStep.LESSON_WELCOME:
				setNextButtonActivity(true)
				setPrevButtonActivity(true)
				setEndButtonActivity(false)
				setErrorMsg('Рано для завершения!')
				break
			case BuilderStep.CLASS_WELCOME:
				setNextButtonActivity(true)
				setPrevButtonActivity(true)
				setEndButtonActivity(false)
				setErrorMsg('Рано для завершения!')
				break
			case BuilderStep.CLASS_SELECTION:
				if (classes.length > 0) setNextButtonActivity(true)
				else setNextButtonActivity(false)
				setPrevButtonActivity(true)
				setEndButtonActivity(false)
				setErrorMsg('Нужно выбрать класс!')
				break
		}
	}, [step, classes])

	const renderStep = () => {
		switch (step) {
			case BuilderStep.LESSON_WELCOME:
				return data.welcome.map((welcomeData: WelcomeData, index: number) => (
					<TextSection
						key={index}
						title={welcomeData.title}
						text={welcomeData.text}
					/>
				))
			case BuilderStep.CLASS_WELCOME:
				return data.classWelcome.map(
					(welcomeData: WelcomeData, index: number) => (
						<TextSection
							key={index}
							title={welcomeData.title}
							text={welcomeData.text}
						/>
					)
				)
			case BuilderStep.CLASS:
				return <ClassesList data={data.classesData} addClass={addClass} />
		}
	}

	return (
		<StyledLayout>
			<CharacterName value={name} onChange={setName} />
			{renderStep()}
			<ButtonsContainer>
				{step > 0 ? (
					<BuilderButton
						id='prevStep'
						name='❮  Назад'
						activity={prevButtonActivity}
						onClick={() => setStep(step - 1)}
						errorMsg={buttonErrorMsg}
					/>
				) : undefined}
				{step < BuilderStep.END ? (
					<BuilderButton
						id='nextStep'
						name='Далее  ❯'
						activity={nextButtonActivity}
						onClick={() => setStep(step + 1)}
						errorMsg={buttonErrorMsg}
					/>
				) : (
					<BuilderButton
						id='endStep'
						name='Завершить ✓'
						activity={endButtonActivity}
						onClick={() =>
							console.error('TODO: ВЫВОДИТЬ ЭТО В PDF И СОХРАНЯТЬ ПОЛЬЗОВАТЕЛЮ')
						}
						errorMsg={buttonErrorMsg}
					/>
				)}
			</ButtonsContainer>
		</StyledLayout>
	)
}
