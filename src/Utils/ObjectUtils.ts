export function areObjectsDataEqual(a: object, b: object): boolean {
	if (
		a === null ||
		b === null ||
		typeof a !== 'object' ||
		typeof b !== 'object'
	)
		return false

	if (a === b) return true

	const keysA = Object.keys(a)
	const keysB = Object.keys(b)
	if (keysA.length !== keysB.length) return false

	for (const key of keysA) {
		if (!keysB.includes(key)) return false

		const valA = a[key as keyof typeof a]
		const valB = b[key as keyof typeof b]

		if (
			typeof valA === 'object' &&
			valA !== null &&
			typeof valB === 'object' &&
			valB !== null
		) {
			if (!areObjectsDataEqual(valA, valB)) return false
		} else if (valA !== valB) {
			return false
		}
	}

	return true
}
