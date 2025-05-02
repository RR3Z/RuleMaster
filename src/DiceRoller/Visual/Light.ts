import { AmbientLight, Object3D, PointLight } from 'three'

export default class Light extends Object3D {
	constructor() {
		super()

		const ambientLight = new AmbientLight(0xffffff, 0.7)
		const pointLight = new PointLight(0xfffffff)
		pointLight.position.set(1, 0, 4)

		this.add(ambientLight)
		this.add(pointLight)
	}
}
