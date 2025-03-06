export default class AudioManager {
	constructor() {}

	public playSound(audioFile: string = "/public/audio/dice-hit.mp3"): void {
		const sound = new Audio(audioFile)
		sound.play()
	}
}
