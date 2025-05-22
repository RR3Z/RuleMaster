import InteractiveLessonComponent from '@/components/InteractiveLessons/InteractiveLessonComponent'
import { Game } from '@/InteractiveLessons/Types/Game'

export default async function DNDInitiativeLesson() {
	return (
		<InteractiveLessonComponent
			game={Game.DND}
			interactiveMapDataFilePath='/lessons/dnd/battle_1.json'
			dicesModelsFilePath='/dices/3dModels/dices.gltf'
			tutorialDataFilePath=''
			playerVisualFilePath='/tokens/warrior_token.png'
			enemiesVisualFilePath={['/tokens/dummy_token.png']}
		/>
	)
}
