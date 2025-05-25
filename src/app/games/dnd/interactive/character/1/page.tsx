import { CONFIG } from '@/app/config'
import CharacterCreationInteractiveLesson from '@/components/WebSite/Lessons/DND/CharacterCreationInteractiveLesson/CharacterCreationInteractiveLesson'

export default async function CharacterCreationInteractiveLessonPage() {
	const lessonDataRes = await fetch(
		`${CONFIG.siteURL}/CharacterLessons/lesson_5.json`
	)
	const lessonData = await lessonDataRes.json()

	return <CharacterCreationInteractiveLesson data={lessonData} />
}
