import RAPIER from '@dimforge/rapier3d-compat'
import { Object3D } from 'three'
import AudioManager from './Audio/AudioManager.ts'
import PhysicEngine from './Engine/Physic/PhysicEngine.ts'
import DiceLoader from './Engine/Visual/DiceLoader.ts'
import VisualEngine from './Engine/Visual/VisualEngine.ts'
import Dice from './Entities/Dice.ts'
import DiceBox from './Entities/DiceBox.ts'
import World from './Entities/World.ts'

export default class DiceRoller {
	// Dice Roller Settings
	private isEnabled: boolean
	// Engine
	private visualEngine: VisualEngine
	private physicEngine: PhysicEngine
	private diceWorld: World
	// Dices
	private diceBox: DiceBox
	public dicesVisual: Record<string, Object3D>
	private selectedDices: Dice[]
	// Audio
	private audioManager: AudioManager

	constructor() {
		// Dice Roller Settings
		this.isEnabled = false
		// Engine
		this.physicEngine = new PhysicEngine()
		this.diceWorld = new World(this.physicEngine.physicalWorld)
		this.visualEngine = new VisualEngine(this.diceWorld)
		// Dices
		this.dicesVisual = {}
		this.selectedDices = []
		this.diceBox = new DiceBox()
		this.diceBox.create(
			this.physicEngine.physicalWorld,
			this.visualEngine.camera
		)
		// Audio
		this.audioManager = new AudioManager()
	}

	public async loadDices(pathToFile: string): Promise<void> {
		const loader = new DiceLoader()
		this.dicesVisual = await loader.loadModels(pathToFile)
	}

	public addDice(dice: Dice): void {
		if (this.isEnabled || this.selectedDices.includes(dice)) return
		this.selectedDices.push(dice)
	}

	public switchState(): void {
		if (this.selectedDices.length === 0) {
			console.error('Dice Roller -> No Selected Dices')
			return
		}
		if (this.isEnabled && !this.areDicesStopped()) {
			console.error(
				'Dice Roller -> Attempt to change the state when it is in the roll'
			)
			return
		}

		this.isEnabled = !this.isEnabled
		this.visualEngine.graphic.shouldUpdate = this.isEnabled

		if (this.isEnabled) {
			this.diceWorld.addDices(this.selectedDices)

			document.body.appendChild(this.visualEngine.graphic.domElement)
			this.startLoop()
		} else {
			this.selectedDices.splice(0, this.selectedDices.length)
			setTimeout(() => {
				document.getElementById('diceRoller')!.remove()
				this.diceWorld.removeDices(this.selectedDices)
			}, 2000)
		}
	}

	public result(): { name: string; value: number }[] {
		const values: { name: string; value: number }[] = []

		this.selectedDices.forEach(dice => {
			values.push({ name: dice.visual.name, value: dice.value() })
		})

		return values
	}

	private startLoop(): void {
		this.loop()
		this.visualEngine.graphic.startLoop()
	}

	private loop(): void {
		const eventQueue = new RAPIER.EventQueue(true)

		this.visualEngine.graphic.onUpdate(() => {
			this.physicEngine.physicalWorld.step(eventQueue)
			this.diceWorld.update()

			eventQueue.drainCollisionEvents(() => {
				this.audioManager.playSound()
			})

			if (this.areDicesStopped()) {
				console.log('Dices Results: ', this.result())
				this.switchState()
			}
		})
	}

	private areDicesStopped(): boolean {
		for (const dice of this.selectedDices) if (!dice.isStopped()) return false
		return true
	}
}
