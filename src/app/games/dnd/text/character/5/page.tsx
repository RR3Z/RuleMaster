import { CONFIG } from '@/app/config'
import CharacterLessonFifth from '@/components/CharacterLessons/CharacterLessonFifth/CharacterLessonFifth'

export default async function CharacterLessonFifthPage() {
	const lessonDataRes = await fetch(
		`${CONFIG.siteURL}/CharacterLessons/lesson_5.json`
	)
	const lessonData = await lessonDataRes.json()

	return <CharacterLessonFifth data={lessonData} />
}
