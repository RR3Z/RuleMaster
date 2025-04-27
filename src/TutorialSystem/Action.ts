import { AttackParams, MoveParams, RollDicesParams } from './ActionParams'
import { UserTutorialActionType } from './UserTutorialActionType'

export type ActionParams = MoveParams | AttackParams | RollDicesParams

export type Action = {
	type: UserTutorialActionType
	params: ActionParams
}
