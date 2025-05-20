import { RigidBodyType } from '@dimforge/rapier3d-compat'
import { Observable, Subject } from 'rxjs'
import { Mesh } from 'three'
import Dice from '../../Dice'
import { DiceRollerFormula } from '../../Types/DiceRollerFormula'
import { DiceRollerResult } from '../../Types/DiceRollerResult'
import DiceRollerPhysicEngine from './DiceRollerPhysicEngine'
import DiceRollerVisualEngine from './DiceRollerVisualEngine'

export default class DiceRollerEngine {
	// Fields
	private _visualEngine: DiceRollerVisualEngine
	private _physicEngine: DiceRollerPhysicEngine
	private _dices: Dice[]
	private _shouldUpdate: boolean

	// Events
	private readonly _onNewRoll$: Subject<DiceRollerFormula[]>
	private readonly _onRollEnd$: Subject<DiceRollerResult[]>

	constructor() {
		this._visualEngine = new DiceRollerVisualEngine()
		this._physicEngine = new DiceRollerPhysicEngine()
		this._dices = []
		this._shouldUpdate = false

		this._visualEngine.graphic.domElement.style.visibility = 'hidden'
		document.body.appendChild(this._visualEngine.graphic.domElement)

		this._onNewRoll$ = new Subject<DiceRollerFormula[]>()
		this._onRollEnd$ = new Subject<DiceRollerResult[]>()
	}

	public async init(dicesModelFilePath: string): Promise<void> {
		await this._visualEngine.loadDicesVisual(dicesModelFilePath)
	}

	public get onNewRoll$(): Observable<DiceRollerFormula[]> {
		return this._onNewRoll$.asObservable()
	}

	public get onRollEnd$(): Observable<DiceRollerResult[]> {
		return this._onRollEnd$.asObservable()
	}

	public addDices(formulas: DiceRollerFormula[]): void {
		if (formulas.length === 0) return

		for (const formula of formulas) {
			for (let i = 0; i < formula.count; i++) {
				const diceObject3D = this._visualEngine.addDice(formula.type)
				const dicePhysicComponents = this._physicEngine.addPhysicToMesh(
					diceObject3D as Mesh
				)
				const dice = new Dice(
					diceObject3D,
					dicePhysicComponents.collider,
					dicePhysicComponents.rigidBody,
					formula.type
				)
				this._dices.push(dice)
			}
		}

		this._onNewRoll$.next(formulas)
		this.switchState()
	}

	public removeDices(): void {
		for (const dice of this._dices) {
			this._visualEngine.removeDice(dice.visual)
			this._physicEngine.removePhysicComponents({
				collider: dice.collider,
				rigidBody: dice.rigidBody,
			})
		}
		this._dices = []
	}

	private startLoop(): void {
		this.loop()
		this._visualEngine.graphic.startLoop()
	}

	private loop(): void {
		this._visualEngine.graphic.onUpdate(() => {
			this._physicEngine.physicalWorld.step()

			if (this._dices.length !== 0) {
				this._dices.forEach(dice => {
					if (dice.rigidBody!.bodyType() === RigidBodyType.Dynamic) {
						dice.visual.position.copy(dice.rigidBody!.translation())
						dice.visual.quaternion.copy(dice.rigidBody!.rotation())
					}
				})
			}

			if (this.areDicesStopped()) {
				this.switchState()
			}
		})
	}

	private rollResults(): DiceRollerResult[] {
		const results: DiceRollerResult[] = []
		this._dices.forEach(dice =>
			results.push({ type: dice.type, value: dice.value })
		)
		return results
	}

	private areDicesStopped(): boolean {
		for (const dice of this._dices) if (!dice.isStopped()) return false
		return true
	}

	private switchState(): void {
		if (this._shouldUpdate && !this.areDicesStopped()) {
			console.error(
				'Dice Roller -> Attempt to change the state when it is in the roll'
			)
			return
		}

		this._shouldUpdate = !this._shouldUpdate
		this._visualEngine.graphic.shouldUpdate = this._shouldUpdate

		if (this._shouldUpdate) {
			this._visualEngine.graphic.domElement.style.visibility = 'visible'
			this.startLoop()
		} else {
			this._onRollEnd$.next(this.rollResults())
			setTimeout(() => {
				this._visualEngine.graphic.domElement.style.visibility = 'hidden'
				this.removeDices()
			}, 1000)
		}
	}
}
