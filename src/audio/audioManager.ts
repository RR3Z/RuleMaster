export default class AudioManager {
	private dicesCollisionSound: string = "/public/audio/dice-hit.mp3"

	constructor() {}

	public playCollisionSound(): void {
		const sound = new Audio(this.dicesCollisionSound)
		sound.play()
	}
}
