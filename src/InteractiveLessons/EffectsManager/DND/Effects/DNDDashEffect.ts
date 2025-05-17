import { DNDEffect } from '../DNDEffect'
import { DNDEffectDurationType } from '../DNDEffectDurationType'
import { DNDEffectType } from '../DNDEffectType'

export default class DNDDashEffect implements DNDEffect {
	public type: DNDEffectType = DNDEffectType.DASH
	public name: string = 'Рывок'
	public description: string = 'Ваша скорость передвижения увеличена вдвое'
	public durationType: DNDEffectDurationType =
		DNDEffectDurationType.UNTIL_END_OF_TURN
	public expiresIn?: number | undefined = undefined
}
