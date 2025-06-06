import Boundary from '@/InteractiveLessons/Entities/Boundary'
import Character from '@/InteractiveLessons/Entities/Character/Character'
import { Position } from '@/InteractiveLessons/Types/Position'
import Cell from './Cell'
import { GridOfCellsLogicData } from './GridOfCellsLogicData'

export default class GridOfCells {
	private _width: number
	private _height: number
	private _cells: Cell[][]

	constructor(
		data: GridOfCellsLogicData,
		player: Character,
		enemies: Character[]
	) {
		this._width = data.sizes.width
		this._height = data.sizes.height
		this._cells = Array.from({ length: this._width }, () =>
			Array.from({ length: this._height } as Cell[])
		)

		this.fill(data, player, enemies)

		player.pos$.subscribe((newPos: Position) => {
			this.updateCharacterPosition(player, newPos)
		})

		for (const enemy of enemies) {
			enemy.pos$.subscribe((newPos: Position) => {
				this.updateCharacterPosition(enemy, newPos)
			})
		}
	}

	public get width(): number {
		return this._width
	}

	public get height(): number {
		return this._height
	}

	public cell(pos: Position): Cell {
		return this._cells[pos.x][pos.y]
	}

	public isCellExists(pos: Position): boolean {
		return (
			pos.x >= 0 && pos.x < this._width && pos.y >= 0 && pos.y < this._height
		)
	}

	private characterGridPosition(character: Character): Position {
		for (let x = 0; x < this._width; x++) {
			for (let y = 0; y < this._height; y++) {
				if (this._cells[x][y].content === character) return { x, y }
			}
		}

		throw new Error(
			"GridOfCells -> playerGridPosition(): Can't find Player on GridOfCells"
		)
	}

	private fill(
		data: GridOfCellsLogicData,
		player: Character,
		enemies: Character[]
	): void {
		for (let x = 0; x < this._width; x++) {
			for (let y = 0; y < this._height; y++) {
				const newCell = new Cell({ x, y })
				this._cells[x][y] = newCell

				for (let dx = -1; dx <= 1; dx++) {
					for (let dy = -1; dy <= 1; dy++) {
						if (dx === 0 && dy === 0) continue

						const nx = x + dx
						const ny = y + dy

						if (
							nx >= 0 &&
							nx < this._width &&
							ny >= 0 &&
							ny < this._height &&
							this._cells[nx][ny]
						) {
							const neighbor = this._cells[nx][ny]
							newCell.addNeighbor(neighbor)
							neighbor.addNeighbor(newCell)
						}
					}
				}
			}
		}

		// Add World Boundaries
		for (const boundaryPos of data.boundaries)
			this._cells[boundaryPos.x][boundaryPos.y].putContent(new Boundary())

		// Add Player
		this._cells[player.pos.x][player.pos.y].putContent(player)

		// Add enemies
		for (const enemy of enemies) {
			this._cells[enemy.pos.x][enemy.pos.y].putContent(enemy)
		}
	}

	private updateCharacterPosition(
		character: Character,
		newPos: Position
	): void {
		const oldPos = this.characterGridPosition(character)

		const cellContent = this.cell(oldPos).pullContent()
		this.cell(newPos).putContent(cellContent)
	}
}
