import GUI from 'lil-gui'
import DiceRoller from './DiceRoller.ts'
import Dice, { DiceType } from './Entities/Dice.ts'

// TODO: REMOVE IT IN THE END - TEMP SOLUTION
export default class Interface extends GUI {
	private diceRoller: DiceRoller

	private guiElements = {
		addD4: () => {
			this.diceRoller.addDice(
				new Dice(this.diceRoller.dicesVisual['D4'].clone(), DiceType.D4)
			)
		},
		addD6: () => {
			this.diceRoller.addDice(
				new Dice(this.diceRoller.dicesVisual['D6'].clone(), DiceType.D6)
			)
		},
		addD8: () => {
			this.diceRoller.addDice(
				new Dice(this.diceRoller.dicesVisual['D8'].clone(), DiceType.D8)
			)
		},
		addD10: () => {
			this.diceRoller.addDice(
				new Dice(this.diceRoller.dicesVisual['D10'].clone(), DiceType.D10)
			)
		},
		addD12: () => {
			this.diceRoller.addDice(
				new Dice(this.diceRoller.dicesVisual['D12'].clone(), DiceType.D12)
			)
		},
		addD20: () => {
			this.diceRoller.addDice(
				new Dice(this.diceRoller.dicesVisual['D20'].clone(), DiceType.D20)
			)
		},
	}

	constructor(diceRoller: DiceRoller) {
		super()
		this.diceRoller = diceRoller
		this.init()
	}

	private init(): void {
		this.add(this.diceRoller, 'switchState').name('Switch State (Dice Roller)')
		this.add(this.guiElements, 'addD4').name('D4')
		this.add(this.guiElements, 'addD6').name('D6')
		this.add(this.guiElements, 'addD8').name('D8')
		this.add(this.guiElements, 'addD10').name('D10')
		this.add(this.guiElements, 'addD12').name('D12')
		this.add(this.guiElements, 'addD20').name('D20')
	}
}
