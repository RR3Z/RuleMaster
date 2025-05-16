import Character from '../Entities/Character/Character'
import { IPhasedAction } from './IPhasedAction'

export default abstract class ActionsManager {
	public abstract perform(
		actor: Character,
		action?: IPhasedAction,
		...args: any
	): void
}
