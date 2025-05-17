import { DNDEffectDurationType } from './DNDEffectDurationType'
import { DNDEffectType } from './DNDEffectType'

export interface DNDEffect {
	type: DNDEffectType
	name: string
	description: string
	durationType: DNDEffectDurationType
	expiresIn?: number
}
