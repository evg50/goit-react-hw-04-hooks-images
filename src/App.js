import React, { Component } from 'react';
import Searchbar from './hooks/Searchbar';
// import ImageGallery from './Components/ImageGallery';
import ImageGallery from './hooks/imageGallery';
import './styles.css';
import Modal from './Components/Modal';
import { ToastContainer } from 'react-toastify';

class App extends Component {
	state = {
		searchWord: '',
		showModal: false,

		showButton: false,
	};
	formSubmitHeandler = (searchWord) => {
		console.log('inputApp', searchWord);
		this.setState({ searchWord });
	};
	onShowButton = (show) => {
		console.log(show);

		// this.setState({ showButton: show });
	};
	toggleModal = (e) => {
		console.log(e);
		this.setState(({ showModal }) => ({
			showModal: !showModal,
		}));
	};
	pageClickHeandler = (e) => {
		console.log('клик', e);
	};

	render() {
		return (
			<>
				<Searchbar onSubmit={this.formSubmitHeandler}></Searchbar>
				<ToastContainer autoClose={3000} />

				{/* < onClick={this.toggleModal}> */}
				<ImageGallery
					searchText={this.state.searchWord}
					// showBatton={this.onShowButton}
				/>

				{this.state.showModal && <Modal />}
			</>
		);
	}
}
export default App;
