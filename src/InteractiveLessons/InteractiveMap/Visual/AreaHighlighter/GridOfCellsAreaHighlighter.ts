import { Position } from '@/InteractiveLessons/Types/Position'
import { Container, FederatedPointerEvent } from 'pixi.js'
import { Observable, Subject } from 'rxjs'
import { GeometricShape } from '../../../Types/GeometricShape'
import CellVisual from '../Grid/CellVisual'
import GridOfCellsVisual from '../Grid/GridOfCellsVisual'
import GridOfCellsVisualUtils from '../Grid/GridOfCellsVisualUtils'

type GridOfCellsAreaHighlighterArgs = {
	gridOfCellsVisual: GridOfCellsVisual
	worldSpaceContainer: Container
	visualUtils: GridOfCellsVisualUtils
	cellPixelRadius: number
	gridWidth: number
	gridHeight: number
}

export default class GridOfCellsAreaHighlighter {
	// Fields
	public shape: GeometricShape = GeometricShape.CELL
	public highlightColor: number = 0xffffff
	public currentRadiusInCells: number = 0
	private _cellPixelRadius: number = 0
	private _isSelectionModeActive: boolean
	private _lastHoveredCellPos: Position | null = null
	private _gridWidth: number
	private _gridHeight: number
	private _highlightedCells: CellVisual[]

	// Dependencies
	private _gridVisual: GridOfCellsVisual
	private _worldSpaceContainer: Container
	private _visualUtils: GridOfCellsVisualUtils

	// Events
	private readonly _onAreaSelected$: Subject<Position[]>
	private readonly _onAreaSelectionEnabled$: Subject<void>
	private readonly _onAreaSelectionDisabled$: Subject<void>

	constructor(args: GridOfCellsAreaHighlighterArgs) {
		this._highlightedCells = []
		this._isSelectionModeActive = false
		this._cellPixelRadius = args.cellPixelRadius
		this._gridHeight = args.gridHeight
		this._gridWidth = args.gridWidth

		this._gridVisual = args.gridOfCellsVisual
		this._worldSpaceContainer = args.worldSpaceContainer
		this._visualUtils = args.visualUtils

		this._onAreaSelected$ = new Subject<Position[]>()
		this._onAreaSelectionEnabled$ = new Subject<void>()
		this._onAreaSelectionDisabled$ = new Subject<void>()

		this._worldSpaceContainer.on('pointermove', this.handlePointerMove, this)
		this._worldSpaceContainer.on('pointerdown', this.handlePointerDown, this)
	}

	public get onAreaSelected$(): Observable<Position[]> {
		return this._onAreaSelected$.asObservable()
	}

	public get onAreaSelectionEnabled$(): Observable<void> {
		return this._onAreaSelectionEnabled$.asObservable()
	}

	public get onAreaSelectionDisabled$(): Observable<void> {
		return this._onAreaSelectionDisabled$.asObservable()
	}

	public get isActive(): boolean {
		return this._isSelectionModeActive
	}

	public enterSelectionMode(
		shape: GeometricShape,
		radiusInCells: number,
		highlightColor: number
	): void {
		this._isSelectionModeActive = true
		this.shape = shape
		this.currentRadiusInCells = radiusInCells
		this._lastHoveredCellPos = null
		this.highlightColor = highlightColor

		this._onAreaSelectionEnabled$.next()
	}

	public exitSelectionMode(): void {
		if (!this._isSelectionModeActive) return

		this._isSelectionModeActive = false
		this._lastHoveredCellPos = null

		this.clearAllHighlights()
		this._onAreaSelectionDisabled$.next()
	}

	public highlightArea(currentCellPos: Position): void {
		this.clearAllHighlights()
		this.getCellsInShape(currentCellPos, this.shape, this.currentRadiusInCells)

		this._highlightedCells.forEach((cell: CellVisual) => {
			cell.highlight(this.highlightColor)
		})
	}

	public clearAllHighlights(): void {
		this._highlightedCells.forEach(cell => cell.clearHighlight())
		this._highlightedCells = []
	}

	private getCellsInShape(
		centerPos: Position,
		shape: GeometricShape,
		radiusInCells: number
	): void {
		const cells: CellVisual[][] = this._gridVisual.cellsVisual
		const affectedCells: CellVisual[] = []
		const { x: centerX, y: centerY } = centerPos

		const addCellIfValid = (x: number, y: number) => {
			if (x >= 0 && x < this._gridWidth && y >= 0 && y < this._gridHeight) {
				affectedCells.push(cells[x][y])
			}
		}

		switch (shape) {
			case GeometricShape.CELL:
				addCellIfValid(centerX, centerY)
				break
			case GeometricShape.CIRCLE:
				for (let dx = -radiusInCells; dx <= radiusInCells; dx++) {
					for (let dy = -radiusInCells; dy <= radiusInCells; dy++) {
						if (dx * dx + dy * dy <= radiusInCells * radiusInCells) {
							addCellIfValid(centerX + dx, centerY + dy)
						}
					}
				}
				break
			case GeometricShape.RECTANGLE:
				for (let dx = -radiusInCells; dx <= radiusInCells; dx++) {
					for (let dy = -radiusInCells; dy <= radiusInCells; dy++) {
						addCellIfValid(centerX + dx, centerY + dy)
					}
				}
				break
			default:
				throw new Error(
					`GridOfCellsAreaHighlighter -> getCellsInShape(): Unknown shape form: ${shape}`
				)
		}

		this._highlightedCells = affectedCells
	}

	private handlePointerMove(event: FederatedPointerEvent): void {
		if (!this._isSelectionModeActive) return

		const localPos = this._worldSpaceContainer.toLocal(event.global, undefined)
		const cellCoords = this._visualUtils.pixelToCoordinatesCursorPosition(
			localPos.x,
			localPos.y,
			this._cellPixelRadius
		)

		const clampedX = Math.max(0, Math.min(cellCoords.x, this._gridWidth - 1))
		const clampedY = Math.max(0, Math.min(cellCoords.y, this._gridHeight - 1))
		const currentCellPos: Position = { x: clampedX, y: clampedY }

		if (
			!this._lastHoveredCellPos ||
			this._lastHoveredCellPos.x !== currentCellPos.x ||
			this._lastHoveredCellPos.y !== currentCellPos.y
		) {
			this._lastHoveredCellPos = currentCellPos
			this.highlightArea(currentCellPos)
		}
	}

	private handlePointerDown(event: FederatedPointerEvent): void {
		if (!this._isSelectionModeActive || event.button !== 0) return

		this._onAreaSelected$.next(
			this._highlightedCells.map(cell => cell.position)
		)
	}
}
