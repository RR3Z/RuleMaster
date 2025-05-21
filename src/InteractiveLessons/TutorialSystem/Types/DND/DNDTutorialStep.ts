import { TutorialStepPhase } from '../TutorialStepPhase'
import { DNDExpectedActionData } from './DNDExpectedActionData'
import { DNDUserActionType } from './DNDUserActiontype'

export type DNDTutorialStep = {
	phase: TutorialStepPhase
	messages: string[]
	allowedActions: DNDUserActionType[]
	expectedAction: DNDExpectedActionData
}
