import EquipmentManager from '../EquipmentManager'
import { DNDArmourType } from './Armour/DNDArmourType'
import { DNDEquipmentSlotType } from './DNDEquipmentSlotType'
import { DNDItemData } from './DNDItemData'
import { DNDWeaponType } from './Weapon/DNDWeaponType'

export default class DNDEquipmentManager extends EquipmentManager {
	private _slots!: Map<DNDEquipmentSlotType, DNDItemData | null>

	constructor(equipment?: DNDItemData[]) {
		super()

		this.init()
		if (equipment && equipment.length > 0) this.equipItems(equipment)
	}

	public equip(slot: DNDEquipmentSlotType, item: DNDItemData): void {
		if (!this._slots.has(slot))
			throw new Error(`DNDEquipmentManager -> equip(): Unknown slot ${slot}`)

		if (this.canEquip(slot, item)) this._slots.set(slot, item)
		else
			throw new Error(
				`DNDEquipmentManager -> equip(): You can't equip ${item} to ${slot} (bcs he's not empty or you choose wrong slot)!`
			)
	}

	public unequip(slot: DNDEquipmentSlotType): DNDItemData | null {
		if (!this._slots.has(slot))
			throw new Error(`DNDEquipmentManager -> unequip(): Unknown slot ${slot}`)

		const item = this._slots.get(slot)!
		this._slots.set(slot, null)
		return item
	}

	public slotItem(slot: DNDEquipmentSlotType): DNDItemData | null {
		if (!this._slots.has(slot))
			throw new Error(`DNDEquipmentManager -> slotItem(): Unknown slot ${slot}`)

		return this._slots.get(slot)!
	}

	public canEquip(slot: DNDEquipmentSlotType, item: DNDItemData): boolean {
		switch (slot) {
			case DNDEquipmentSlotType.ARMOUR:
				if (item.type !== DNDArmourType.ARMOUR) return false
				if (this._slots.get(DNDEquipmentSlotType.ARMOUR) !== null) return false
				break
			case DNDEquipmentSlotType.MAIN_HAND:
				if (
					item.type !== DNDWeaponType.ONE_HANDED &&
					item.type !== DNDWeaponType.TWO_HANDED
				)
					return false
				if (this._slots.get(DNDEquipmentSlotType.MAIN_HAND) !== null)
					return false
				break
			case DNDEquipmentSlotType.OFF_HAND:
				if (
					item.type !== DNDWeaponType.ONE_HANDED &&
					item.type !== DNDWeaponType.TWO_HANDED
				)
					return false
				if (this._slots.get(DNDEquipmentSlotType.OFF_HAND) !== null)
					return false
				break
		}

		return true
	}

	private init(): void {
		this._slots = new Map()

		this._slots.set(DNDEquipmentSlotType.ARMOUR, null)
		this._slots.set(DNDEquipmentSlotType.MAIN_HAND, null)
		this._slots.set(DNDEquipmentSlotType.OFF_HAND, null)
	}

	private equipItems(equipment: DNDItemData[]): void {
		for (const item of equipment) {
			switch (item.type) {
				case DNDArmourType.ARMOUR:
					this.equip(DNDEquipmentSlotType.ARMOUR, item)
					break
				case DNDWeaponType.ONE_HANDED:
					if (this.canEquip(DNDEquipmentSlotType.MAIN_HAND, item))
						this.equip(DNDEquipmentSlotType.MAIN_HAND, item)
					else if (this.canEquip(DNDEquipmentSlotType.OFF_HAND, item))
						this.equip(DNDEquipmentSlotType.OFF_HAND, item)
					break
				case DNDWeaponType.TWO_HANDED:
					this.equip(DNDEquipmentSlotType.MAIN_HAND, item)
					this.equip(DNDEquipmentSlotType.OFF_HAND, item)
					break
			}
		}
	}
}
