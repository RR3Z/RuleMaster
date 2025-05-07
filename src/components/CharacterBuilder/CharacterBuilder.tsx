'use client'
import BuilderButton from '@/components/CharacterBuilder/BuilderButton'
import TextSection from '@/components/CharacterBuilder/TextSection'
import { BuilderData } from '@/types/CharacterBuilder/BuilderData'
import { BuilderStep } from '@/types/CharacterBuilder/BuilderStep'
import { DNDClass } from '@/types/CharacterBuilder/DNDClass'
import { WelcomeData } from '@/types/CharacterBuilder/Steps/WelcomeData'
import { useState } from 'react'
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
	const [name, setName] = useState<string>('Персонаж')

	const [classes, setClasses] = useState<Set<DNDClass>>(new Set())
	const addClass = (clazz: DNDClass) => {
		setClasses(prev => new Set(prev).add(clazz))
	}
	const removeClass = (clazz: DNDClass) => {
		setClasses(prev => {
			const updated = new Set(prev)
			updated.delete(clazz)
			return updated
		})
	}

	const [step, setStep] = useState<BuilderStep>(BuilderStep.LESSON_WELCOME)

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
						onClick={() => setStep(step - 1)}
					/>
				) : undefined}
				{step < BuilderStep.END ? (
					<BuilderButton
						id='nextStep'
						name='Далее  ❯'
						onClick={() => setStep(step + 1)}
					/>
				) : (
					<BuilderButton
						id='endStep'
						name='Завершить ✓'
						onClick={() =>
							console.error('TODO: ВЫВОДИТЬ ЭТО В PDF И СОХРАНЯТЬ ПОЛЬЗОВАТЕЛЮ')
						}
					/>
				)}
			</ButtonsContainer>
		</StyledLayout>
	)
}
