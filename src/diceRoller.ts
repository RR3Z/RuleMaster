import { Object3D } from "three"
import PhysicEngine from "./engine/physic/physicEngine.ts"
import DiceLoader from "./engine/visual/diceLoader.ts"
import VisualEngine from "./engine/visual/visualEngine.ts"
import Dice from "./entity/dice.ts"
import DiceBox from "./entity/diceBox.ts"
import World from "./entity/world.ts"

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
	public selectedDices: Dice[]

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
	}

	public async loadDices(pathToFile: string): Promise<void> {
		const loader = new DiceLoader()
		this.dicesVisual = await loader.load(pathToFile)
	}

	public switchState(): void {
		if (this.selectedDices.length === 0) {
			alert("Dice Roller -> Не выбрано дайсов для броска")
			return
		}

		this.isEnabled = !this.isEnabled
		this.visualEngine.graphic.shouldUpdate = this.isEnabled

		if (this.isEnabled) {
			this.diceWorld.addDices(this.selectedDices)

			document.body.appendChild(this.visualEngine.graphic.domElement)
			this.startLoop()
		} else {
			document.getElementById("diceRoller")!.remove()
			this.diceWorld.removeDices(this.selectedDices)
			this.selectedDices.splice(0, this.selectedDices.length)
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
		this.visualEngine.graphic.onUpdate(() => {
			this.physicEngine.physicalWorld.step()
			this.diceWorld.update()

			if (this.areDicesStopped()) {
				console.log("Dices Results: ", this.result())
				this.switchState()
			}
		})
	}

	private areDicesStopped(): boolean {
		for (const dice of this.selectedDices) if (!dice.isStopped()) return false
		return true
	}
}
