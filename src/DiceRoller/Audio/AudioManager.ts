export default class AudioManager {
	constructor() {}

	public playSound(audioFile: string = '/audio/dice-hit.mp3'): void {
		const sound = new Audio(audioFile)
		sound.play()
	}
}
