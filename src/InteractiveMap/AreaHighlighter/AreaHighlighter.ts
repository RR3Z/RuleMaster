import { Position } from '../_Types/Position'
import { Shape } from '../_Types/Shape'
import CellVisual from '../Grid/CellVisual'
import GridOfCellsVisual from '../Grid/GridOfCellsVisual'

export default class AreaHighlighter {
	// Settings
	private _isEnabled: boolean
	public highlightColor: number
	public shape: Shape
	public isBindedToCharacter: boolean
	public maxFeetsLength: number

	private _gridOfCellsVisual!: GridOfCellsVisual
	private _playerPos!: Position
	private _highlightedCells: CellVisual[]

	constructor() {
		this._isEnabled = false
		this.highlightColor = 0x4dff00
		this.shape = Shape.CELL
		this.isBindedToCharacter = true
		this.maxFeetsLength = 1

		this._highlightedCells = []
	}

	public init(gridVisual: GridOfCellsVisual, playerPos: Position): void {
		this._playerPos = playerPos
		this._gridOfCellsVisual = gridVisual
		this.setupPointerInteractions()
	}

	public enable(
		color?: number,
		shape?: Shape,
		maxLength?: number,
		isBindedToCharacter?: boolean
	): void {
		if (color) this.highlightColor = color
		if (shape) this.shape = shape
		if (isBindedToCharacter) this.isBindedToCharacter = isBindedToCharacter
		if (maxLength) this.maxFeetsLength = maxLength

		this._isEnabled = true
		console.log('Enable Area Highlighter')
	}

	public disable(): void {
		if (this._isEnabled) this.clearHighlightedCells()
		this._isEnabled = false
	}

	public highlight(hoveredCellPos: Position): void {
		switch (this.shape) {
			case Shape.CELL:
				this.highlightCell(hoveredCellPos)
				break
			case Shape.CIRCLE:
				this.highlightCircle(hoveredCellPos)
				break
			case Shape.LINE:
				this.highlightLine(hoveredCellPos)
				break
			default:
				throw new Error('AreaHighlighter -> highlight(): Unknown Shape!')
		}
	}

	public updatePlayerPosition(newPos: Position): void {
		this._playerPos = newPos
	}

	private getDirection(
		characterPos: Position,
		startCell: Position
	): { x: number; y: number } {
		const deltaX = characterPos.x - startCell.x
		const deltaY = characterPos.y - startCell.y

		if (deltaX === 0 && deltaY < 0) return { x: 0, y: 1 }
		if (deltaX === 0 && deltaY > 0) return { x: 0, y: -1 }
		if (deltaY === 0 && deltaX > 0) return { x: -1, y: 0 }
		if (deltaY === 0 && deltaX < 0) return { x: 1, y: 0 }

		if (deltaX > 0 && deltaY < 0) return { x: -1, y: 1 }
		if (deltaX < 0 && deltaY < 0) return { x: 1, y: 1 }
		if (deltaX > 0 && deltaY > 0) return { x: -1, y: -1 }
		if (deltaX < 0 && deltaY > 0) return { x: 1, y: -1 }

		return { x: 0, y: 1 }
	}

	private clearHighlightedCells(): void {
		this._highlightedCells.forEach(cell => cell.clearHighlight())
	}

	private highlightCell(hoveredCellPos: Position): void {
		const cellVisuals = this._gridOfCellsVisual.cellsVisual
		const direction = this.getDirection(this._playerPos, hoveredCellPos)

		if (this.isBindedToCharacter) {
			const targetCellX = this._playerPos.x + direction.x
			const targetCellY = this._playerPos.y + direction.y

			if (cellVisuals[targetCellX] && cellVisuals[targetCellX][targetCellY]) {
				const cell = cellVisuals[targetCellX][targetCellY]
				cell.highlight(this.highlightColor)
				this._highlightedCells.push(cell)
			}
		} else {
			const cell = cellVisuals[hoveredCellPos.x][hoveredCellPos.y]
			cell.highlight(this.highlightColor)
			this._highlightedCells.push(cell)
		}
	}

	private highlightCircle(hoveredCellPos: Position): void {
		const cellVisuals = this._gridOfCellsVisual.cellsVisual

		if (this.isBindedToCharacter) {
			for (let dx = -this.maxFeetsLength; dx <= this.maxFeetsLength; dx++) {
				for (let dy = -this.maxFeetsLength; dy <= this.maxFeetsLength; dy++) {
					if (dx * dx + dy * dy <= this.maxFeetsLength * this.maxFeetsLength) {
						const x = this._playerPos.x + dx
						const y = this._playerPos.y + dy

						if (cellVisuals[x] && cellVisuals[x][y]) {
							const cell = cellVisuals[x][y]
							cell.highlight(this.highlightColor)
							this._highlightedCells.push(cell)
						}
					}
				}
			}
		} else {
			for (let dx = -this.maxFeetsLength; dx <= this.maxFeetsLength; dx++) {
				for (let dy = -this.maxFeetsLength; dy <= this.maxFeetsLength; dy++) {
					// Проверяем, находится ли ячейка в пределах круга с радиусом maxFeetsLength
					if (dx * dx + dy * dy <= this.maxFeetsLength * this.maxFeetsLength) {
						const x = hoveredCellPos.x + dx
						const y = hoveredCellPos.y + dy

						if (cellVisuals[x] && cellVisuals[x][y]) {
							const cell = cellVisuals[x][y]
							cell.highlight(this.highlightColor)
							this._highlightedCells.push(cell)
						}
					}
				}
			}
		}
	}

	private highlightLine(hoveredCellPos: Position): void {
		const cellVisuals = this._gridOfCellsVisual.cellsVisual
		const direction = this.getDirection(this._playerPos, hoveredCellPos)

		if (this.isBindedToCharacter) {
			for (let i = 1; i <= this.maxFeetsLength; i++) {
				const x = this._playerPos.x + direction.x * i
				const y = this._playerPos.y + direction.y * i

				if (cellVisuals[x] && cellVisuals[x][y]) {
					const cell = cellVisuals[x][y]
					cell.highlight(this.highlightColor)
					this._highlightedCells.push(cell)
				} else {
					break
				}
			}
		} else {
			throw new Error(
				'AreaHighlighter -> highlightLine(): not implemented for isBindedToCharacter = false'
			)
		}
	}

	private setupPointerInteractions(): void {
		for (let x = 0; x < this._gridOfCellsVisual.width; x++) {
			for (let y = 0; y < this._gridOfCellsVisual.height; y++) {
				const cell = this._gridOfCellsVisual.cellsVisual[x][y]
				cell.on('pointerenter', () => {
					if (this._isEnabled) this.highlight({ x: x, y: y })
				})

				cell.on('pointerleave', () => {
					if (this._isEnabled) this.clearHighlightedCells()
				})
			}
		}
	}
}
