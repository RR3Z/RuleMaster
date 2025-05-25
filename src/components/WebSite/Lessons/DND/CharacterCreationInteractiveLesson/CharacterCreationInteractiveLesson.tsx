'use client'
import { Characteristic } from '@/types/CharacterLesson/Characteristics/Characteristic'
import { ClassData } from '@/types/CharacterLesson/Classes/ClassData'
import { Instrument } from '@/types/CharacterLesson/Instruments/Instrument'
import { InstrumentData } from '@/types/CharacterLesson/Instruments/InstrumentData'
import { InstrumentType } from '@/types/CharacterLesson/Instruments/InstrumentType'
import { LessonOneData } from '@/types/CharacterLesson/LessonOneData'
import { OriginData } from '@/types/CharacterLesson/Origins/OriginData'
import { RaceData } from '@/types/CharacterLesson/Races/RaceData'
import { Skill } from '@/types/CharacterLesson/Skills/Skill'
import { LessonOneStep } from '@/types/CharacterLesson/Steps/LessonOneStep'
import { TextData } from '@/types/CharacterLesson/TextData'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import CharacteristicsSelection from './Characteristics/CharacteristicsSelection'
import CharacterName from './CharacterName'
import ClassesList from './Classes/ClassesList'
import EndComponent from './EndComponent'
import LessonButton from './LessonButton'
import OriginsList from './Origins/OriginsList'
import RacesList from './Races/RacesList'
import SelectionList from './Selection/SelectionList'
import TextSection from './TextSection'

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 100vh;
	max-width: 50vw;
	margin: 20px auto;
	gap: 10px;
`

const TopContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	align-items: flex-end;
`

const CharacterInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	font-size: 1.1rem;
	text-align: end;
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

const PageContainer = styled.div`
	position: relative;
`

const LogoLink = styled(Link)`
	position: absolute;
	left: 20px;
	z-index: 10;
	display: inline-block;
`

export type Props = {
	data: LessonOneData
}

export default function CharacterCreationInteractiveLesson({ data }: Props) {
	// Character Data
	const [race, setRace] = useState<RaceData | undefined>(undefined)
	const [clazz, setClazz] = useState<ClassData | undefined>(undefined)
	const [origin, setOrigin] = useState<OriginData | undefined>(undefined)
	const [name, setName] = useState<string>('Безымянный')

	const [instrumentsMastery, setInstrumentsMastery] = useState<
		Map<number, Instrument>
	>(new Map())
	const addInstrumentMastery = (index: number, instrument: Instrument) => {
		setInstrumentsMastery(prev => {
			const newMap = new Map(prev)
			newMap.set(index, instrument)
			return newMap
		})
	}
	const removeInstrumentMastery = (index: number) => {
		setInstrumentsMastery(prev => {
			const newMap = new Map(prev)
			newMap.delete(index)
			return newMap
		})
	}

	const [skillsMastery, setSkillsMastery] = useState<Map<number, Skill>>(
		new Map()
	)
	const addSkillMastery = (index: number, skill: Skill) => {
		setSkillsMastery(prev => {
			const newMap = new Map(prev)
			newMap.set(index, skill)
			return newMap
		})
	}
	const removeSkillMastery = (index: number) => {
		setSkillsMastery(prev => {
			const newMap = new Map(prev)
			newMap.delete(index)
			return newMap
		})
	}

	const [characteristics, setCharacteristics] = useState<
		Map<Characteristic, number | undefined>
	>(new Map())
	const updateCharacteristic = (
		key: Characteristic,
		value: number | undefined
	) => {
		setCharacteristics(prev => {
			const newMap = new Map(prev)
			newMap.set(key, value)
			return newMap
		})
	}
	const resetCharacteristic = (key: Characteristic) => {
		setCharacteristics(prev => {
			const newMap = new Map(prev)
			newMap.delete(key)
			return newMap
		})
	}

	// Steps
	const [currentStep, setStep] = useState<LessonOneStep>(
		LessonOneStep.LESSON_INTRODUCTION
	)

	const renderStep = () => {
		switch (currentStep) {
			case LessonOneStep.LESSON_INTRODUCTION:
				return data.introduction.map((data: TextData, index: number) => (
					<TextSection data={data} key={index} />
				))
			case LessonOneStep.LEVEL_EXPLANATION:
				return data.levelExplanation.map((data: TextData, index: number) => (
					<TextSection data={data} key={index} />
				))
			case LessonOneStep.CLASS_EXPLANATION:
				return data.classExplanation.map((data: TextData, index: number) => (
					<TextSection data={data} key={index} />
				))
			case LessonOneStep.CLASS_SELECTION:
				return (
					<ClassesList
						data={data.classesData}
						selectedClass={clazz}
						selectClass={setClazz}
					/>
				)
			case LessonOneStep.RACE_EXPLANATION:
				return data.raceExplanation.map((data: TextData, index: number) => (
					<TextSection data={data} key={index} />
				))
			case LessonOneStep.RACE_SELECTION:
				return (
					<RacesList
						data={data.racesData}
						selectedRace={race}
						selectRace={setRace}
					/>
				)
			case LessonOneStep.ORIGIN_EXPLANATION:
				return data.originExplanation.map((data: TextData, index: number) => (
					<TextSection data={data} key={index} />
				))
			case LessonOneStep.ORIGIN_SELECTION:
				return (
					<OriginsList
						data={data.originsData}
						selectedOrigin={origin}
						selectOrigin={setOrigin}
					/>
				)
			case LessonOneStep.CHARACTERISTICS_EXPLANATION:
				return data.characteristicsExplanation.map(
					(data: TextData, index: number) => (
						<TextSection data={data} key={index} />
					)
				)
			case LessonOneStep.CHARACTERISTICS_SELECTION:
				return (
					<CharacteristicsSelection
						characteristics={characteristics}
						updateCharacteristic={updateCharacteristic}
						resetCharacteristic={resetCharacteristic}
						race={race!}
						dndClass={clazz!.id}
					/>
				)
			case LessonOneStep.MASTERY_EXPLANATION_1:
				return data.masteryExplanation1.map((data: TextData, index: number) => (
					<TextSection data={data} key={index} />
				))
			case LessonOneStep.MASTERY_EXPLANATION_2:
				return data.masteryExplanation2.map((data: TextData, index: number) => (
					<TextSection data={data} key={index} />
				))
			case LessonOneStep.MASTERY_SELECTION:
				return (
					<SelectionList
						clazz={clazz!}
						origin={origin!}
						musicalInstruments={instrumentsMastery}
						addMusicalInstrument={addInstrumentMastery}
						removeMusicalInstrument={removeInstrumentMastery}
						skills={skillsMastery}
						addSkill={addSkillMastery}
						removeSkill={removeSkillMastery}
					/>
				)
			case LessonOneStep.END:
				return (
					<EndComponent
						clazz={clazz!}
						race={race!}
						origin={origin!}
						name={name}
						level={1}
						characteristics={characteristics}
						instrumentsMastery={Array.from(instrumentsMastery.values())}
						skillsMastery={Array.from(skillsMastery.values())}
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
			case LessonOneStep.LESSON_INTRODUCTION:
				setNextButtonActivity(true)
				setPrevButtonActivity(false)
				setEndButtonActivity(false)
				setButtonErrorMessage('')
				break
			case LessonOneStep.LEVEL_EXPLANATION:
			case LessonOneStep.CLASS_EXPLANATION:
			case LessonOneStep.RACE_EXPLANATION:
			case LessonOneStep.ORIGIN_EXPLANATION:
			case LessonOneStep.CHARACTERISTICS_EXPLANATION:
			case LessonOneStep.MASTERY_EXPLANATION_1:
			case LessonOneStep.MASTERY_EXPLANATION_2:
				setNextButtonActivity(true)
				setPrevButtonActivity(true)
				setEndButtonActivity(false)
				setButtonErrorMessage('')
				break
			case LessonOneStep.CLASS_SELECTION:
				if (clazz === undefined) setNextButtonActivity(false)
				else setNextButtonActivity(true)
				setPrevButtonActivity(true)
				setEndButtonActivity(false)
				setButtonErrorMessage('Вы должны выбрать класс!')
				break
			case LessonOneStep.RACE_SELECTION:
				if (race === undefined) setNextButtonActivity(false)
				else setNextButtonActivity(true)
				setPrevButtonActivity(true)
				setEndButtonActivity(false)
				setButtonErrorMessage('Вы должны выбрать расу!')
				break
			case LessonOneStep.ORIGIN_SELECTION:
				if (origin === undefined) setNextButtonActivity(false)
				else setNextButtonActivity(true)
				setPrevButtonActivity(true)
				setEndButtonActivity(false)
				setButtonErrorMessage('Вы должны выбрать происхождение!')
				break
			case LessonOneStep.CHARACTERISTICS_SELECTION:
				if (characteristics.size < 6) setNextButtonActivity(false)
				else setNextButtonActivity(true)
				setPrevButtonActivity(true)
				setEndButtonActivity(false)
				setButtonErrorMessage('Вы распределили не все характеристики!')
				break
			case LessonOneStep.MASTERY_SELECTION:
				const originMusicalCount = origin!.instruments.filter(
					(instrument: InstrumentData & { isChosable: boolean }) =>
						instrument.isChosable
				).length
				const clazzMusicalCount = clazz!.instrumentsChoice
					? clazz!.instrumentsChoice.type.includes(InstrumentType.MUSICAL)
						? clazz!.instrumentsChoice.count
						: 0
					: 0
				const classSkillsCount = clazz!.skillsChoice
					? clazz!.skillsChoice.count
					: 0

				if (
					instrumentsMastery.size !== originMusicalCount + clazzMusicalCount ||
					skillsMastery.size !== classSkillsCount
				)
					setNextButtonActivity(false)
				else setNextButtonActivity(true)
				setPrevButtonActivity(true)
				setEndButtonActivity(false)
				setButtonErrorMessage('Вы еще не все выбрали!')
				break
			case LessonOneStep.END:
				setNextButtonActivity(false)
				setPrevButtonActivity(true)
				setEndButtonActivity(true)
				setButtonErrorMessage('')
				break
		}
	}, [
		currentStep,
		race,
		clazz,
		origin,
		instrumentsMastery,
		skillsMastery,
		characteristics,
	])

	return (
		<PageContainer>
			<LogoLink href='/'>
				<Image
					src='/SiteLogoName.svg'
					alt='siteLogo'
					width={200}
					height={100}
					priority
				/>
			</LogoLink>
			<MainContainer>
				<TopContainer>
					<CharacterName
						value={name}
						placeholder={'Безымянный'}
						changeValue={setName}
					/>
					<CharacterInfo>
						<b>Ваш выбор</b>
						{clazz && (
							<span>
								<b>Класс:</b> <u>{clazz.name}</u>
							</span>
						)}
						{race && (
							<span>
								<b>Раса:</b> <u>{race.name}</u>
							</span>
						)}
						{origin && (
							<span>
								<b>Происхождение:</b> <u>{origin.name}</u>
							</span>
						)}
					</CharacterInfo>
				</TopContainer>
				{renderStep()}
				<ButtonsContainer>
					{currentStep !== LessonOneStep.LESSON_INTRODUCTION ? (
						<LessonButton
							id='prevStep'
							text='❮  Назад'
							activity={prevButtonActivity}
							onClick={() => setStep(currentStep - 1)}
							errorMessage={buttonErrorMessage}
						/>
					) : undefined}
					{currentStep !== LessonOneStep.END ? (
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
								(window.location.href = 'https://forms.gle/J5XZvKwdJ5aMydvu5')
							}
							errorMessage={buttonErrorMessage}
						/>
					)}
				</ButtonsContainer>
			</MainContainer>
		</PageContainer>
	)
}
