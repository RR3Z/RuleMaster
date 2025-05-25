import { EntityType } from '@/InteractiveLessons/Entities/EntityType'
import { TutorialStepPhase } from '../TutorialStepPhase'
import { DNDExpectedActionData } from './DNDExpectedActionData'
import { DNDUserActionType } from './DNDUserActionType'

export type DNDTutorialStep = {
	type: 'DND'
	actorType: EntityType
	phase: TutorialStepPhase
	messages: string[]
	allowedActions: DNDUserActionType[]
	expectedAction: DNDExpectedActionData
}
