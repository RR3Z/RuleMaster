import { Object3D } from "three"

export default class World extends Object3D {
	private objects: Object3D[] = []

	constructor(visuals?: Object3D[]) {
		super()
		if (visuals) this.addVisuals(visuals)
		// this.initPhysic(colliders)
	}

	public addVisuals(visuals: Object3D[]): void {
		visuals.forEach(visual => {
			visual.receiveShadow = true
			visual.castShadow = true
			this.add(visual)
			if (!this.objects.includes(visual)) this.objects.push(visual)
		})

		console.log("World -> Add Visuals: ", this.objects, this)
	}

	public removeVisuals(visuals: Object3D[]): void {
		visuals.forEach(visual => {
			this.objects.splice(this.objects.indexOf(visual), 1)
			this.remove(visual)
		})

		console.log("World -> Remove Visuals: ", this.objects, this)
	}

	public clearWorld(): void {
		this.objects.forEach(object => {
			this.remove(object)
		})
		this.objects.splice(0, this.objects.length)

		console.log("World -> Clear World: ", this.objects, this)
	}
}
