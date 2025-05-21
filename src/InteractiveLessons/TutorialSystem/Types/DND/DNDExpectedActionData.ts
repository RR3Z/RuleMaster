import { DNDUserActionType } from './DNDUserActiontype'

export type DNDExpectedActionData = {
	type: DNDUserActionType
	params: any // Depends on type
}
