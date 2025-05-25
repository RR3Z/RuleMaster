import { DNDUserActionType } from './DNDUserActionType'

export type DNDExpectedActionData = {
	type: DNDUserActionType
	params: any // Depends on type
}
