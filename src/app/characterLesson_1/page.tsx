import CharacterLessonOne from '@/components/CharacterLessons/CharacterLessonOne/CharacterLessonOne'
import { CONFIG } from '../config'

export default async function CharacterLessonOnePage() {
	const lessonDataRes = await fetch(
		`${CONFIG.siteURL}/CharacterLessons/lesson_1.json`
	)
	const lessonData = await lessonDataRes.json()

	return <CharacterLessonOne data={lessonData} />
}
