import { EntityType } from '../../Entities/Entity.ts'
import Cell from '../Cell.ts'
import PriorityQueue from './PriorityQueue.ts'

export default class AStarPathFinder {
	private _maxPathLength: number
	private _stepCost: number

	constructor(maxPathLength: number, stepCost: number) {
		this._maxPathLength = maxPathLength
		this._stepCost = stepCost
	}

	public shortestPath(start: Cell, end: Cell): Map<Cell, Cell | undefined> {
		const path: Map<Cell, Cell | undefined> = new Map()
		path.set(start, undefined)
		if (start === end) return path

		const costs: Map<Cell, number> = new Map()
		costs.set(start, 0)

		const frontier: PriorityQueue<Cell> = new PriorityQueue()
		frontier.put(start, 0)

		const steps: Map<Cell, number> = new Map()
		steps.set(start, 0)

		while (true) {
			const current = frontier.get()
			if (current === end || current === undefined) break

			const currentSteps = steps.get(current)!
			if (currentSteps >= this._maxPathLength) break

			current.neighbors.forEach((neighbor: Cell) => {
				const newCost = costs.get(current)! + this.defineCellCost(neighbor)
				if (!costs.has(neighbor) || newCost < costs.get(neighbor)!) {
					steps.set(neighbor, currentSteps + 1)
					costs.set(neighbor, newCost)
					const priority = newCost + this.euclideanDistance(neighbor, end)
					frontier.put(neighbor, priority)
					path.set(neighbor, current)
				}
			})
		}

		return path
	}

	private defineCellCost(cell: Cell): number {
		switch (cell.contentType) {
			case EntityType.ENEMY:
			case EntityType.PLAYER:
				return this._stepCost * 2
			case EntityType.BOUNDARY:
				return Infinity
			case undefined:
				return this._stepCost
		}
	}

	private euclideanDistance(first: Cell, second: Cell): number {
		const dx = first.x - second.x
		const dy = first.y - second.y
		return Math.sqrt(dx * dx + dy * dy)
	}
}
