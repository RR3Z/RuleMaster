import { Container, FederatedPointerEvent, Graphics, Text } from 'pixi.js'
import { EntityType } from '../../InteractiveMap/Logic/Entities/EntityType.ts'
import { CellSettings } from '../MapEditor.ts'
import MapEditorGUI from '../MapEditorGUI.ts'

export default class CellVisual extends Container {
	private _editor: MapEditorGUI
	private _visual: Graphics
	private _cellSettings: CellSettings
	private _cellSize: number

	constructor(
		editor: MapEditorGUI,
		cellSettings: CellSettings,
		cellSize: number
	) {
		super()

		this._editor = editor
		this._cellSettings = cellSettings
		this._cellSize = cellSize
		this._visual = new Graphics()
		this.addChild(this._visual)

		this.interactive = true
		this.update()

		this.on('pointerdown', this.onPointerDown.bind(this))
	}

	public update() {
		this._visual.clear()
		this.draw()

		switch (this._cellSettings.contentType) {
			case undefined:
				this._visual.fill(0xffffff)
				this.alpha = 0
				break
			case EntityType.BOUNDARY:
				this._visual.fill(0xffc500)
				this.addText('B')
				this.alpha = 0.5
				break
			case EntityType.ENEMY:
				this._visual.fill(0xff0000)
				this.addText('E')
				this.alpha = 0.5
				break
			case EntityType.PLAYER:
				this._visual.fill(0x55ff00)
				this.addText('P')
				this.alpha = 0.5
				break
		}
	}

	private draw(): void {
		this._visual.rect(
			this._cellSettings.x * this._cellSize,
			this._cellSettings.y * this._cellSize,
			this._cellSize,
			this._cellSize
		)
	}

	private addText(text: string): void {
		const cellText = new Text({
			text: text,
			style: {
				fontSize: this._cellSize / 2,
				fill: 0xffffff,
				align: 'center',
			},
		})
		cellText.x =
			this._cellSettings.x * this._cellSize +
			this._cellSize / 2 -
			cellText.width / 2
		cellText.y =
			this._cellSettings.y * this._cellSize +
			this._cellSize / 2 -
			cellText.height / 2
		this.addChild(cellText)

		console.log(cellText.position)
	}

	private onPointerDown(event: FederatedPointerEvent) {
		if (event.button === 0)
			this._cellSettings.contentType = this._editor.selectedEntityType
		if (event.button === 2) this._cellSettings.contentType = undefined

		this.update()
	}
}
