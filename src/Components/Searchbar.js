import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

class Searchbar extends Component {
	state = {
		inputSearch: '',
	};

	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
	};
	changeSearch = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	submitHeandler = (e) => {
		e.preventDefault();
		if (!this.state.inputSearch.trim()) {
			toast('Введите запрос.');
			return;
		}
		this.props.onSubmit(this.state);
		this.setState({ inputSearch: '' });
	};
	resetSearch = () => {
		this.seState({ inputSearch: '' });
	};
	render() {
		return (
			<header className="Searchbar">
				<form className="SearchForm" onSubmit={this.submitHeandler}>
					<button type="submit" className="SearchForm-button">
						<span className="SearchForm-button-label">Search</span>
					</button>

					<input
						name="inputSearch"
						value={this.state.inputSearch}
						className="SearchForm-input"
						type="text"
						autoComplete="off"
						autoFocus
						placeholder="Search images and photos"
						onChange={this.changeSearch}
					/>
				</form>
			</header>
		);
	}
}
export default Searchbar;
