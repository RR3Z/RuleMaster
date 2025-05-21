import InteractiveLessonComponent from '@/components/InteractiveLessons/InteractiveLessonComponent'

export default async function DNDInitiativeLesson() {
	return (
		<InteractiveLessonComponent
			mapDataFilePath=''
			dicesModelsFilePath='/dices/3dModels/dices.gltf'
			tutorialDataFilePath=''
		/>
	)
}
