export default class PriorityQueue<T> {
	private elements: { element: T; priority: number }[]

	constructor() {
		this.elements = []
	}

	public put(element: T, priority: number): void {
		this.elements.push({ element: element, priority: priority })
		this.elements.sort((a, b) => a.priority - b.priority)
	}

	public get(): T | undefined {
		return this.elements.shift()?.element
	}

	public peek(): T | undefined {
		return this.elements[0]?.element
	}

	public values(): Map<T, number> {
		const map = new Map<T, number>()
		for (let i = 0; i < this.elements.length; i++) {
			map.set(this.elements[i].element, this.elements[i].priority)
		}
		return map
	}

	public isEmpty(): boolean {
		return this.elements.length === 0
	}
}
