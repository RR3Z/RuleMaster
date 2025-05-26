import DNDActionsManager from '@/InteractiveLessons/ActionsManager/DND/DNDActionsManager'
import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import { DNDEquipmentSlotType } from '@/InteractiveLessons/EquipmentManager/DND/DNDEquipmentSlotType'
import { DNDWeaponData } from '@/InteractiveLessons/EquipmentManager/DND/Weapon/DNDWeaponData'
import { DNDWeaponRangeType } from '@/InteractiveLessons/EquipmentManager/DND/Weapon/DNDWeaponRangeType'
import GridOfCellsAreaHighlighter from '@/InteractiveLessons/InteractiveMap/Visual/AreaHighlighter/GridOfCellsAreaHighlighter'
import { GeometricShape } from '@/InteractiveLessons/Types/GeometricShape'
import { Position } from '@/InteractiveLessons/Types/Position'
import styled from 'styled-components'
import ActionButton from './ActionButton'

const PanelWrapper = styled.div`
	position: fixed;
	left: 20px;
	bottom: 0;
	background: #00000079;
	z-index: 1000;
	padding: 5px;
	display: flex;
	flex-direction: row;
	gap: 5px;
`

type Props = {
	player: DNDCharacter
	actionsManager: DNDActionsManager
	areaHighlighter: GridOfCellsAreaHighlighter
}

export function DNDActionsPanel({
	player,
	actionsManager,
	areaHighlighter,
}: Props) {
	const isMeleeWeapon =
		player.equipmentManager.slotItem(DNDEquipmentSlotType.MAIN_HAND) &&
		(
			player.equipmentManager.slotItem(
				DNDEquipmentSlotType.MAIN_HAND
			) as DNDWeaponData
		).rangeType === DNDWeaponRangeType.MELEE

	const isRangedWeapon =
		player.equipmentManager.slotItem(DNDEquipmentSlotType.MAIN_HAND) &&
		(
			player.equipmentManager.slotItem(
				DNDEquipmentSlotType.MAIN_HAND
			) as DNDWeaponData
		).rangeType === DNDWeaponRangeType.RANGE

	return (
		<PanelWrapper>
			{isMeleeWeapon && (
				<ActionButton
					buttonActivity={true}
					tooltipText='Атака в ближнем бою'
					imageFilePath=''
					onClick={() => {
						let onAreaSelectedSubscription =
							areaHighlighter.onAreaSelected$.subscribe(
								(centerPos: Position) => {
									actionsManager.perform(
										player,
										actionsManager.meleeAttackAction,
										centerPos
									)
									onAreaSelectedSubscription.unsubscribe()
									onAreaSelectionDisabledSubscription.unsubscribe()
								}
							)
						let onAreaSelectionDisabledSubscription =
							areaHighlighter.onAreaSelectionDisabled$.subscribe(() => {})

						areaHighlighter.enterSelectionMode(GeometricShape.CELL, 1, 0xff0000)
					}}
				/>
			)}

			{isRangedWeapon && (
				<ActionButton
					buttonActivity={true}
					tooltipText='Атака в дальнем бою'
					imageFilePath=''
					onClick={() => {
						let onAreaSelectedSubscription =
							areaHighlighter.onAreaSelected$.subscribe(
								(centerPos: Position) => {
									actionsManager.perform(
										player,
										actionsManager.rangedAttackAction,
										centerPos
									)
									onAreaSelectedSubscription.unsubscribe()
									onAreaSelectionDisabledSubscription.unsubscribe()
								}
							)
						let onAreaSelectionDisabledSubscription =
							areaHighlighter.onAreaSelectionDisabled$.subscribe(() => {})

						areaHighlighter.enterSelectionMode(GeometricShape.CELL, 1, 0xff0000)
					}}
				/>
			)}
		</PanelWrapper>
	)
}
