import DNDInteractiveLessonComponent from '@/components/InteractiveLessons/DNDInteractiveLessonComponent'
import { Game } from '@/InteractiveLessons/Types/Game'

export default async function DNDInitiativeLesson() {
	return (
		<DNDInteractiveLessonComponent
			game={Game.DND}
			interactiveMapDataFilePath='/lessons/dnd/battle_1.json'
			dicesModelsFilePath='/dices/3dModels/dices.gltf'
			tutorialDataFilePath='/lessons/dnd/tutorial_1.json'
			playerVisualFilePath='/tokens/warrior_token.png'
			enemiesVisualFilePath={['/tokens/dummy_token.png']}
		/>
	)
}
