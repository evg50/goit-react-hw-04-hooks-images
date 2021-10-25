import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function Searchbar({ onSubmit }) {
	const [search, setSearch] = useState('');
	const changeSearch = (e) => {
		setSearch(e.target.value);
	};

	const submitHeandler = (e) => {
		e.preventDefault();
		if (search === '') {
			toast('Введите запрос.');
			return;
		}

		onSubmit(search);
		setSearch('');
	};

	return (
		<header className="Searchbar">
			<form className="SearchForm" onSubmit={submitHeandler}>
				<button type="submit" className="SearchForm-button">
					<span className="SearchForm-button-label">Search</span>
				</button>

				<input
					name="inputSearch"
					value={search}
					className="SearchForm-input"
					type="text"
					autoComplete="off"
					autoFocus
					placeholder="Search images and photos"
					onChange={changeSearch}
				/>
			</form>
		</header>
	);
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
