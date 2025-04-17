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

	public isEmpty(): boolean {
		return this.elements.length === 0
	}
}
