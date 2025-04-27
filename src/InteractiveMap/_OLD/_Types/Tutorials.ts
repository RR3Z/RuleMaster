export type MessageBoxData = TutorialStepData | undefined

export type TutorialStepData = {
	index: number
	needNext: boolean
	message: string
}
