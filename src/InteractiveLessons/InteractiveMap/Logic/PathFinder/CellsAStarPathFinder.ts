import { EntityType } from '@/InteractiveLessons/Entities/EntityType'
import { Position } from '@/InteractiveLessons/Types/Position'
import Cell from '../Grid/Cell'
import GridOfCells from '../Grid/GridOfCells'
import PriorityQueue from './PriorityQueue'

export default class CellsAStarPathFinder {
	// Fields
	public readonly stepCost: number = 5
	public maxPathCost: number = 0

	// Dependencies
	private _gridOfCells: GridOfCells

	constructor(gridOfCells: GridOfCells) {
		this._gridOfCells = gridOfCells
	}

	public shortestPath(
		startPos: Position,
		endPos: Position
	): { path: Cell[]; cost: number } {
		if (this.maxPathCost <= 0) {
			throw new Error(
				'CellsAStarPathFinder -> shortestPath(): Max Path Cost wrong value!'
			)
		}

		if (this._gridOfCells.cell(endPos).contentType !== null) {
			throw new Error(
				'CellsAStarPathFinder -> shortestPath(): End Cell is not empty!'
			)
		}

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

		const resultPath = this.reconstructPath(cameFrom, start, end)
		const resultCost = costs.get(resultPath[resultPath.length - 1])!

		return {
			path: resultPath,
			cost: resultCost,
		}
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
			case EntityType.BOUNDARY:
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
