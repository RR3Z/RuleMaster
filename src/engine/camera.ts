import { PerspectiveCamera } from "three"

export default class Camera extends PerspectiveCamera {
	constructor() {
		super(75, innerWidth / innerHeight)
		this.position.set(0, 30, 0)
		this.rotation.set(-Math.PI / 2, 0, 0)
	}
}
