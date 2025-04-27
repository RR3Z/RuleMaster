import { DNDUserActionData } from './DNDUserActionData.ts'
import { DNDUserActionType } from './DNDUserActionType.ts'

export type DNDTutorialStep = {
	readonly messages: string[]
	readonly allowedActions: DNDUserActionType[]
	readonly expectedAction: DNDUserActionData
}
