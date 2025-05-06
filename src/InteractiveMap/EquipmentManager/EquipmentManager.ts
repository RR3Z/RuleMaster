import { ArmourData } from '../_Types/ArmourData'
import { ArmourType } from '../_Types/ArmourType'
import { ItemData } from '../_Types/ItemData'
import { SlotType } from '../_Types/SlotType'
import { WeaponData } from '../_Types/WeaponData'
import { WeaponType } from '../_Types/WeaponType'

export default class EquipmentMaanger {
	private _equipmentSlots: Map<SlotType, ItemData | null>

	constructor(equipment?: ItemData[]) {
		this._equipmentSlots = new Map()
		this._equipmentSlots.set(SlotType.ARMOUR, null)
		this._equipmentSlots.set(SlotType.BOOTS, null)
		this._equipmentSlots.set(SlotType.MAIN_HAND, null)
		this._equipmentSlots.set(SlotType.OFF_HAND, null)

		if (equipment) this.equipStartItems(equipment)
	}

	public equip(equipment: ItemData, slot: SlotType): void {
		if (this._equipmentSlots.get(slot) !== null)
			throw new Error('EquipmentManager -> equip(): This slot is not empty!')

		if (
			equipment.id === 'weapon' &&
			slot !== SlotType.MAIN_HAND &&
			slot !== SlotType.OFF_HAND
		)
			throw new Error(
				"EquipmentManager -> equip() -> WEAPON: You can't equip a weapon into that slot!"
			)

		if (
			equipment.id === 'armour' &&
			slot !== SlotType.ARMOUR &&
			slot !== SlotType.BOOTS
		)
			throw new Error(
				"EquipmentManager -> equip() -> ARMOUR: You can't equip an armour into that slot!"
			)

		switch (slot) {
			case SlotType.ARMOUR:
			case SlotType.BOOTS:
				this._equipmentSlots.set(slot, equipment)
				break
			case SlotType.MAIN_HAND:
			case SlotType.OFF_HAND:
				if ((equipment as WeaponData).type === WeaponType.TWO_HANDED) {
					this._equipmentSlots.set(SlotType.MAIN_HAND, equipment)
					this._equipmentSlots.set(SlotType.OFF_HAND, equipment)
				} else {
					this._equipmentSlots.set(slot, equipment)
				}
				break
		}
	}

	public unequip(slot: SlotType): ItemData {
		let item = this._equipmentSlots.get(slot)

		switch (slot) {
			case SlotType.ARMOUR:
				if (item === null)
					throw new Error(
						'EquipmentManager -> unequip() -> ARMOUR: Armour slot is empty!'
					)
				else {
					this._equipmentSlots.set(slot, null)
					return item!
				}
			case SlotType.BOOTS:
				if (item === null)
					throw new Error(
						'EquipmentManager -> unequip() -> BOOTS: Boots slot is empty!'
					)
				else {
					this._equipmentSlots.set(slot, null)
					return item!
				}
			case SlotType.MAIN_HAND:
				if (item === null)
					throw new Error(
						'EquipmentManager -> unequip() -> MAIN_HAND: Main Hand slot is empty!'
					)
				else {
					this._equipmentSlots.set(slot, null)
					if (item!.type === WeaponType.TWO_HANDED)
						this._equipmentSlots.set(SlotType.OFF_HAND, null)
					return item!
				}
			case SlotType.OFF_HAND:
				if (item === null)
					throw new Error(
						'EquipmentManager -> unequip() -> OFF_HAND: Off Hand slot is empty!'
					)
				else {
					this._equipmentSlots.set(slot, null)
					if (item!.type === WeaponType.TWO_HANDED)
						this._equipmentSlots.set(SlotType.MAIN_HAND, null)
					return item!
				}
		}
	}

	private equipStartItems(equipment: ItemData[]): void {
		equipment.forEach((item: ItemData) => {
			if (item.id === 'weapon') {
				const weaponItem = item as WeaponData

				switch (weaponItem.type) {
					case WeaponType.ONE_HANDED:
					case WeaponType.TWO_HANDED:
						this.equip(weaponItem, SlotType.MAIN_HAND)
						break
					default:
						throw new Error(
							'EquipmentManager -> equipStartItems(): Unknown Slot for Weapon'
						)
				}
			}

			if (item.id === 'armour') {
				const armourItem = item as ArmourData

				switch (armourItem.type) {
					case ArmourType.ARMOUR:
						this.equip(armourItem, SlotType.ARMOUR)
						break
					case ArmourType.BOOTS:
						this.equip(armourItem, SlotType.BOOTS)
						break
					default:
						throw new Error(
							'EquipmentManager -> equipStartItems(): Unknown Slot for Armour'
						)
				}
			}
		})
	}
}
