import { Action } from './Action.ts'
import { UserTutorialActionType } from './UserTutorialActionType.ts'

export type TutorialStep = {
	id: number
	messages: string[]
	allowedActions: UserTutorialActionType[]
	expectedAction: Action
}
