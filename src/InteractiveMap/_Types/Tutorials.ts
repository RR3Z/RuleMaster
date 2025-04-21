export type MessageBoxData = TutorialStepData | undefined

export type TutorialData = {
	levelIndex: number
	steps: TutorialStepData[]
}

export type TutorialStepData = {
	index: number
	needNext: boolean
	message: string
}
