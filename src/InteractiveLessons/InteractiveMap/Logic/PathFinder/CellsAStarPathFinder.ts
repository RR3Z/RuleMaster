import { EntityType } from '@/InteractiveLessons/Entities/EntityType'
import { Position } from '@/InteractiveLessons/Types/Position'
import Cell from '../Grid/Cell'
import GridOfCells from '../Grid/GridOfCells'
import PriorityQueue from './PriorityQueue'

export default class CellsAStarPathFinder {
	// Fields
	public readonly stepCost: number = 5
	public maxPathCost: number = 0
	public needChecksForCellsContent: boolean = true

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

		if (
			this.needChecksForCellsContent &&
			this._gridOfCells.cell(endPos).contentType !== null
		) {
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

		const resultPath = this.reconstructPath(cameFrom, costs, start, end)
		const resultCost = costs.get(resultPath[resultPath.length - 1])!

		return {
			path: resultPath,
			cost: resultCost,
		}
	}

	private reconstructPath(
		cameFrom: Map<Cell, Cell | undefined>,
		costs: Map<Cell, number>,
		start: Cell,
		end: Cell
	): Cell[] {
		if (cameFrom.has(end)) return this.buildPath(cameFrom, start, end)

		let bestCell: Cell | null = null
		let minDist = Infinity
		let minCost = Infinity

		for (const cell of cameFrom.keys()) {
			let cur: Cell | undefined = cell
			let reachable = false
			while (cur !== undefined) {
				if (cur === start) {
					reachable = true
					break
				}
				cur = cameFrom.get(cur)
			}
			if (!reachable) continue

			const dx = cell.pos.x - end.pos.x
			const dy = cell.pos.y - end.pos.y
			const distToEnd = Math.hypot(dx, dy)
			const cost = costs.get(cell) ?? Infinity

			if (distToEnd < minDist || (distToEnd === minDist && cost < minCost)) {
				minDist = distToEnd
				minCost = cost
				bestCell = cell
			}
		}

		if (!bestCell) return []

		return this.buildPath(cameFrom, start, bestCell)
	}

	private buildPath(
		cameFrom: Map<Cell, Cell | undefined>,
		start: Cell,
		end: Cell
	): Cell[] {
		const result: Cell[] = []
		let current: Cell | undefined = end

		while (current !== undefined) {
			result.push(current)
			if (current === start) break
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
