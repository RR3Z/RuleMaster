import { DNDEffect } from '../DNDEffect'
import { DNDEffectDurationType } from '../DNDEffectDurationType'
import { DNDEffectType } from '../DNDEffectType'

export default class DNDDodgeEffect implements DNDEffect {
	public type: DNDEffectType = DNDEffectType.DODGE
	public name: string = 'Уклонение'
	public description: string =
		'Все броски атаки, направленные на вас, совершаются с помехой'
	public durationType: DNDEffectDurationType = DNDEffectDurationType.TURNS
	public expiresIn?: number | undefined = 1
}
