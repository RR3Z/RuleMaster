import { ActionPhase } from '../../_Types/ActionPhase'
import Character from '../../Entities/Characters/Character'

export default interface IPhasedAction {
	currentPhase(): ActionPhase
	enterPhaseInput(actor: Character, ...args: any): void
	reset(): void
}
