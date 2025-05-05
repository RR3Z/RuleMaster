import { Position } from '../_Types/Position.ts'
import { EntityType } from '../Entities/EntityType.ts'
import Cell from '../Grid/Cell.ts'
import GridOfCells from '../Grid/GridOfCells.ts'
import PriorityQueue from './PriorityQueue.ts'

export default class CellsAStarPathFinder {
	public maxPathCost: number = 0
	public stepCost: number = 5

	private _gridOfCells: GridOfCells

	constructor(gridOfCells: GridOfCells) {
		this._gridOfCells = gridOfCells
	}

	public shortestPath(startPos: Position, endPos: Position): Cell[] {
		if (this.maxPathCost <= 0)
			throw new Error(
				'CellsAStarPathFinder -> shortestPath(): Max Path Cost have wrong value!'
			)

		if (this._gridOfCells.cell(endPos).contentType !== null)
			throw new Error(
				'CellsAStarPathFinder -> shortestPath(): End Cell is not empty!'
			)

		const start = this._gridOfCells.cell(startPos)
		const end = this._gridOfCells.cell(endPos)

		const cameFrom: Map<Cell, Cell | undefined> = new Map()
		cameFrom.set(start, undefined)

		const costs: Map<Cell, number> = new Map()
		costs.set(start, 0)

		const frontier: PriorityQueue<Cell> = new PriorityQueue()
		frontier.put(start, 0)

		while (true) {
			const current = frontier.get()
			if (current === undefined || current === end) break

			for (const neighbor of current.neighbors) {
				const newCost = costs.get(current)! + this.defineStepCost(neighbor)

				if (newCost <= this.maxPathCost) {
					if (!costs.has(neighbor) || newCost < costs.get(neighbor)!) {
						costs.set(neighbor, newCost)
						const priority = newCost + this.euclideanDistance(neighbor, end)
						frontier.put(neighbor, priority)
						cameFrom.set(neighbor, current)
					}
				}
			}
		}

		return this.reconstructPath(cameFrom, start, end)
	}

	private reconstructPath(
		cameFrom: Map<Cell, Cell | undefined>,
		start: Cell,
		end: Cell
	): Cell[] {
		const result: Cell[] = []
		let current: Cell | undefined = end
		let steps = 0

		while (current !== undefined) {
			if (current === start) break
			steps++
			result.push(current)
			current = cameFrom.get(current)
		}

		result.reverse()

		return result
	}

	private defineStepCost(cell: Cell): number {
		switch (cell.contentType) {
			case EntityType.ENEMY:
			case EntityType.PLAYER:
				return this.stepCost * 2
			case EntityType.WALL:
				return Infinity
			case null:
				return this.stepCost
		}
	}

	private euclideanDistance(first: Cell, second: Cell): number {
		const dx = first.pos.x - second.pos.x
		const dy = first.pos.y - second.pos.y
		return Math.sqrt(dx * dx + dy * dy)
	}
}
