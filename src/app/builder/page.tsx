import CharacterBuilder from '@/components/CharacterBuilder/CharacterBuilder'
import { BuilderData } from '@/types/CharacterBuilder/BuilderData'
import fs from 'fs'
import path from 'path'

export default function CharacterBuilderPage() {
	const filePath = path.join(
		process.cwd(),
		'/public/CharacterBuilder/data.json'
	)
	const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as BuilderData

	return <CharacterBuilder data={data} />
}
