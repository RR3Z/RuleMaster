import CharacterLessonOne from '@/components/CharacterLessons/CharacterLessonOne/CharacterLessonOne'
import { LessonOneData } from '@/types/CharacterLesson/LessonOneData'
import fs from 'fs'
import path from 'path'

export default function CharacterLessonOnePage() {
	const filePath = path.join(
		process.cwd(),
		'/public/CharacterLessons/lesson_1.json'
	)
	const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as LessonOneData

	return <CharacterLessonOne data={data} />
}
