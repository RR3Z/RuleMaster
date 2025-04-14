import ViewModel from '../ViewModel/ViewModel.ts'

export default class View {
	private _viewModel: ViewModel

	constructor(viewModel: ViewModel) {
		this._viewModel = viewModel
	}
}
