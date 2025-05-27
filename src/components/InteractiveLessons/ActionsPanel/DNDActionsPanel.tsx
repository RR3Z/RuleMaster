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
			<ActionButton
				buttonActivity={isMeleeWeapon ? true : false}
				id='meleeAttackActionButton'
				tooltipText='Атака в ближнем бою'
				imageFilePath='/actionsIcons/Main_Hand_Attack.webp'
				onClick={() => {
					let onAreaSelectedSubscription =
						areaHighlighter.onAreaSelected$.subscribe((area: Position[]) => {
							areaHighlighter.exitSelectionMode()
							actionsManager.perform(
								player,
								actionsManager.meleeAttackAction,
								area
							)
							onAreaSelectedSubscription.unsubscribe()
						})

					areaHighlighter.enterSelectionMode(GeometricShape.CELL, 1, 0xff0000)
				}}
			/>
			<ActionButton
				buttonActivity={isRangedWeapon ? true : false}
				id='rangedAttackActionButton'
				tooltipText='Атака в дальнем бою'
				imageFilePath='/actionsIcons/Ranged_Attack.webp'
				onClick={() => {
					let onAreaSelectedSubscription =
						areaHighlighter.onAreaSelected$.subscribe((area: Position[]) => {
							areaHighlighter.exitSelectionMode()
							actionsManager.perform(
								player,
								actionsManager.meleeAttackAction,
								area
							)
							onAreaSelectedSubscription.unsubscribe()
						})

					areaHighlighter.enterSelectionMode(GeometricShape.CELL, 1, 0xff0000)
				}}
			/>
			{player.spells.map((spell, index) => (
				<ActionButton
					key={`spell-${index}-${spell.name}`}
					buttonActivity={true}
					id={`spellButton_${index}`}
					tooltipText={spell.name}
					imageFilePath={spell.iconPath || '/noImage.webp'}
					onClick={() => {
						let onAreaSelectedSubscription =
							areaHighlighter.onAreaSelected$.subscribe((area: Position[]) => {
								areaHighlighter.exitSelectionMode()
								actionsManager.perform(
									player,
									actionsManager.spellAttackAction,
									spell,
									area
								)
								onAreaSelectedSubscription.unsubscribe()
							})

						areaHighlighter.enterSelectionMode(
							spell.form,
							spell.radius,
							0xff0000
						)
					}}
				/>
			))}
		</PanelWrapper>
	)
}
