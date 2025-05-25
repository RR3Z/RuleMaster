export function arraysShallowEqualUnordered<T>(a: T[], b: T[]): boolean {
	if (a.length !== b.length) return false

	const bCopy = [...b]

	return a.every(itemA => {
		const indexInB = bCopy.findIndex(
			itemB => JSON.stringify(itemB) === JSON.stringify(itemA)
		)
		if (indexInB === -1) return false
		bCopy.splice(indexInB, 1) // удаляем, чтобы не сравнивать дважды
		return true
	})
}
