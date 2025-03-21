import GUI from 'lil-gui'
import Swal from 'sweetalert2'
import { EntityType } from '../InteractiveMap/Logic/Entities/EntityType.ts'
import MapEditor, { GridSettings } from './MapEditor.ts'

type GUIElements = {
	createNewMap: () => void
	saveMap: () => void
	loadMap: () => void
	entityType: string
}

export default class MapEditorGUI extends GUI {
	private _editor: MapEditor
	private _selectedEntityType: EntityType | undefined

	private _guiElements: GUIElements = {
		createNewMap: () => this.createNewMap(),
		saveMap: () => this.saveMap(),
		loadMap: () => this.loadMap(),
		entityType: 'Empty',
	}

	constructor(editor: MapEditor) {
		super()

		this._editor = editor
		this._selectedEntityType = undefined
		this.init()
	}

	public get selectedEntityType(): EntityType | undefined {
		return this._selectedEntityType
	}

	private init(): void {
		// Cell Settings
		const cellSettingsFolder = this.addFolder('Cell Settings')
		cellSettingsFolder
			.add(this._guiElements, 'entityType', [
				'Empty',
				'Boundary',
				'Enemy',
				'Player',
			])
			.name('Content Type')
			.onChange(() => {
				switch (this._guiElements.entityType) {
					case 'Boundary':
						this._selectedEntityType = EntityType.BOUNDARY
						break
					case 'Enemy':
						this._selectedEntityType = EntityType.ENEMY
						break
					case 'Player':
						this._selectedEntityType = EntityType.PLAYER
						break
					case 'Empty':
						this._selectedEntityType = undefined
						break
				}
			})

		// Logic
		this.add(this._guiElements, 'createNewMap').name('Create New Map')
		this.add(this._guiElements, 'saveMap').name('Save Map')
		this.add(this._guiElements, 'loadMap').name('Load Map')
	}

	private createNewMap(): void {
		let grid: GridSettings = {
			width: -1,
			height: -1,
			cellSize: -1,
			cellColor: '',
		}
		let mapFilePath = ''

		Swal.fire({
			title: 'Grid Settings',
			theme: 'dark',
			showCloseButton: true,
			showCancelButton: true,
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancel',
			showConfirmButton: true,
			confirmButtonColor: 'green',
			confirmButtonText: 'Create',
			html: `
			<div class="newMapWindow">
				<label>Grid Width: <input id="gridWidth" type="number" value="10" min="10" max="100"></label>
				<label>Grid Height: <input id="gridHeight" type="number" value="10" min="10" max="100"></label>
				<label>Cell Sizes: <input id="cellSize" type="number" value="40" min="40" max="100"></label>
				<label>Cell Color: <input type="color" id="colorPicker" value="#ffffff"></label>
				<label>Map Background: <input id="backgroundFile" type="file" accept="image/*"></label>
			</div>
			`,
			preConfirm: () => {
				grid.width = parseInt(
					(document.getElementById('gridWidth')! as HTMLInputElement).value,
					10
				)
				grid.height = parseInt(
					(document.getElementById('gridHeight')! as HTMLInputElement).value,
					10
				)
				grid.cellSize = parseInt(
					(document.getElementById('cellSize')! as HTMLInputElement).value,
					10
				)
				grid.cellColor = (
					document.getElementById('colorPicker')! as HTMLInputElement
				).value

				const fileInput = document.getElementById(
					'backgroundFile'
				)! as HTMLInputElement
				if (fileInput.files && fileInput.files.length > 0)
					mapFilePath = '/mapsBackgrounds/' + fileInput.files[0].name
			},
		}).then(result => {
			if (result.isConfirmed) {
				this._editor.createNewMap(grid, mapFilePath)
			}
		})
	}

	private saveMap(): void {
		Swal.fire({
			theme: 'dark',
			title: 'Save Map',
			text: 'Are you sure you want to save the map?',
			showCancelButton: true,
			cancelButtonColor: 'red',
			showConfirmButton: true,
			confirmButtonColor: 'green',
			showCloseButton: true,
		}).then(result => {
			if (result.isConfirmed) this._editor.save()
		})
	}

	private loadMap(): void {
		let mapData: File

		Swal.fire({
			title: 'Map Load',
			theme: 'dark',
			showCloseButton: true,
			showCancelButton: true,
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancel',
			showConfirmButton: true,
			confirmButtonColor: 'green',
			confirmButtonText: 'Confirm',
			html: `
			<div class="loadMapWindow">
				<label>Map File: <input id="mapFile" type="file" accept="application/json"></label>
			</div>
			`,
			preConfirm: () => {
				const fileInput = document.getElementById(
					'mapFile'
				)! as HTMLInputElement
				if (fileInput.files && fileInput.files.length > 0)
					mapData = fileInput.files[0]
			},
		}).then(result => {
			if (result.isConfirmed) {
				this._editor.load(mapData)
			}
		})
	}
}
