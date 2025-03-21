import { EntityType } from '../InteractiveMap/Logic/Entities/EntityType.ts'
import MapEditorGUI from './MapEditorGUI.ts'

export type GridSettings = {
	width: number
	height: number
	cellSize: number
	cellColor: string
}
export type CellSettings = {
	x: number
	y: number
	contentType: EntityType | undefined
}

export type MapData = {
	mapFilePath?: string
	grid: GridSettings
	cells: CellSettings[][]
}

export default class MapEditor {
	private _map: MapData | undefined
	private _gui: MapEditorGUI

	constructor() {
		this._map = undefined
		this._gui = new MapEditorGUI(this)
	}

	}

	public load(mapData: File): void {
		const reader = new FileReader()
		reader.onload = () => {
			try {
				this._map = JSON.parse(reader.result as string)

				console.log('Map Editor -> Loaded map!\nMap Data: ', this._map)
			} catch (error) {
				alert(error)
			}
		}
		reader.readAsText(mapData)
	}

	public save(fileName: string = 'map.json'): void {
		if (this._map === undefined)
			throw new Error('Map Editor -> Trying save undefined map!')

		const data = JSON.stringify(this._map, null, 2)
		const blob = new Blob([data], { type: 'application/json' })
		const url = URL.createObjectURL(blob)

		const a = document.createElement('a')
		a.href = url
		a.download = fileName
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)

		console.log('Map Editor -> Saved map!')
	}

	public createNewMap(
		grid: GridSettings,
		mapBackgroundFilePath?: string
	): void {
		this._map = {
			mapFilePath: mapBackgroundFilePath,
			grid: grid,
			cells: this.createEmptyCells(grid.width, grid.height),
		}


		console.log('Map Editor -> Created new map!\nMap Data: ', this._map)
	}

	private createEmptyCells(
		gridWidth: number,
		gridHeight: number
	): CellSettings[][] {
		const cells: CellSettings[][] = []

		for (let x = 0; x < gridWidth; x++) {
			const row: CellSettings[] = []
			for (let y = 0; y < gridHeight; y++) {
				row.push({ x, y, contentType: undefined })
			}
			cells.push(row)
		}

		return cells
	}
}
