import Character from '../Entities/Characters/Character'
import IPhasedAction from './Actions/IPhasedAction'

export default abstract class ActionsManager {
	public abstract perform(
		action: IPhasedAction,
		actor: Character,
		...args: any
	): void
}
