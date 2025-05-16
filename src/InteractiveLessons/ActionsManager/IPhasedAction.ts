import Character from '../Entities/Character/Character'
import { ActionPhase } from './ActionPhase'

export interface IPhasedAction {
	currentPhase(): ActionPhase
	enterPhaseInput(actor: Character, ...args: any): void
	reset(): void
}
