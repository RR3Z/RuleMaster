import { Action } from './Action.ts'
import { UserActionType } from './UserActionType.ts'

export type TutorialStep = {
	id: number
	messages: string[]
	allowedActions: UserActionType[]
	expectedAction: Action
}
