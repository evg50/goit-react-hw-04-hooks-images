import axios from 'axios';

export default class PixabayFetchObj {
	constructor(base_url, api_key) {
		this.base_url = base_url;
		this.api_key = api_key;
		this._searchQuery = 'dog';
		this._page = 1;
		this.perPage = 12;
	}
	get searchQuery() {
		return this._searchQuery;
	}
	set searchQuery(value) {
		return (this._searchQuery = value);
	}
	get page() {
		return this._page;
	}
	set page(value) {
		return (this._page += value);
	}
	resetPage() {
		return (this._page = 1);
	}

	async searchPhotos() {
		axios.defaults.baseURL = this.base_url;

		let url = `?q=${this._searchQuery}&page=${this._page}&per_page=${this.perPage}&key=${this.api_key}`;
		try {
			const result = await axios.get(url);
			const data = result.data.hits;
			return data;
		} catch (err) {
			return err.message;
		}
	}
}
