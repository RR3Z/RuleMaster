import { Container, FederatedPointerEvent, Graphics, Text } from 'pixi.js'
import { EntityType } from '../../InteractiveMap/Logic/Entities/EntityType.ts'
import { CellSettings } from '../MapEditor.ts'
import MapEditorGUI from '../MapEditorGUI.ts'

export default class CellVisual extends Container {
	private _editor: MapEditorGUI
	private _visual: Graphics
	private _text!: Text
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
		this.draw()

		switch (this._cellSettings.contentType) {
			case undefined:
				this._visual.fill(0xffffff)
				this.alpha = 0
				break
			case EntityType.BOUNDARY:
				this._visual.fill(0xffc500)
				this.sign('Boundary')
				this.alpha = 0.5
				break
			case EntityType.ENEMY:
				this._visual.fill(0xff0000)
				this._text.text = 'E'
				this.alpha = 0.5
				break
			case EntityType.PLAYER:
				this._visual.fill(0x55ff00)
				this._text.text = 'P'
				this.alpha = 0.5
				break
		}
	}

	private draw(): void {
		this._visual.clear()

		this._visual.rect(
			this._cellSettings.x * this._cellSize,
			this._cellSettings.y * this._cellSize,
			this._cellSize,
			this._cellSize
		)
	}

	private sign(text: string): void {
		if (this._text) this.removeChild(this._text)
		this._text = new Text({
			style: {
				fontSize: this._cellSize / 2,
				fill: 0xffffff,
				align: 'center',
			},
		})
		this._text.position.set(
			this._cellSettings.x * this._cellSize +
				this._cellSize / 2 -
				this._text.width / 2,
			this._cellSettings.y * this._cellSize +
				this._cellSize / 2 -
				this._text.height / 2
		)
		this.addChild(this._text)
	}

	private onPointerDown(event: FederatedPointerEvent) {
		if (event.button === 0)
			this._cellSettings.contentType = this._editor.selectedEntityType
		if (event.button === 2) this._cellSettings.contentType = undefined

		this.update()
	}
}
