import { DNDUserActionType } from './DNDUserActionType.ts'

export type DNDUserActionData = {
	readonly type: DNDUserActionType
	readonly params: object
}
