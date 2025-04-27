import { AttackParams, MoveParams, RollDicesParams } from './ActionParams.ts'
import { UserActionType } from './UserActionType.ts'

export type ActionParams = MoveParams | AttackParams | RollDicesParams

export type Action = {
	type: UserActionType
	params: ActionParams
}
