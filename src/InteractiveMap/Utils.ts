export default class Utils {
	public static async loadFileData(filePath: string): Promise<any> {
		const data = await fetch(filePath)
		const json = await data.json()
		return json
	}
}
