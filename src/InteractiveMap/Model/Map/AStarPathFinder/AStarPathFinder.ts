import { EntityType } from '../../../_Enums/EntityType.ts'
import Cell from '../Cell.ts'
import PriorityQueue from './PriorityQueue.ts'

export default class AStarPathFinder {
	public maxPathLength: number = 5
	public stepCost: number = 5

	public shortestPath(start: Cell, end: Cell): Cell[] {
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

				if (!costs.has(neighbor) || newCost < costs.get(neighbor)!) {
					costs.set(neighbor, newCost)
					const priority = newCost + this.euclideanDistance(neighbor, end)
					frontier.put(neighbor, priority)
					cameFrom.set(neighbor, current)
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

		return result.slice(0, this.maxPathLength)
	}

	private defineStepCost(cell: Cell): number {
		switch (cell.contentType) {
			case EntityType.ENEMY:
			case EntityType.PLAYER:
				return this.stepCost * 2
			case EntityType.BOUNDARY:
				return Infinity
			case undefined:
				return this.stepCost
		}
	}

	private euclideanDistance(first: Cell, second: Cell): number {
		const dx = first.x - second.x
		const dy = first.y - second.y
		return Math.sqrt(dx * dx + dy * dy)
	}
}
