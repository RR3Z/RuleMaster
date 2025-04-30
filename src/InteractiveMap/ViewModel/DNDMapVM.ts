import DNDMapModel from '../Model/DNDMapModel'
import MapVM from './MapVM'

export default class DNDMapVM extends MapVM {
	constructor(model: DNDMapModel) {
		super()

		this._model = model
	}
}
