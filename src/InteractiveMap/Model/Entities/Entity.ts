export enum EntityType {
	ENEMY,
	PLAYER,
	BOUNDARY,
}

export default abstract class Entity {
	protected _type: EntityType

	constructor(type: EntityType) {
		this._type = type
	}

	public get type() {
		return this._type
	}
}
