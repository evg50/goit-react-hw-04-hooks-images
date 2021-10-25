import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import ImageGalleryItem from './ImageGalleryItem';
import MyButton from './MyButton';

import PixabayFetchObj from '../sevices/PixabayFetch';
const base_url = 'https://pixabay.com/api/';
const api_key = '23915322-b5091aa0ad0b72709b6c0de72';
const myPixabayFetchObj = new PixabayFetchObj(base_url, api_key);

export default class ImageGallery extends Component {
	state = {
		images: [],
		error: null,
		status: 'idle',
	};

	componentDidUpdate(prevProps, prevState) {
		const prevSearch = prevProps.searchText;

		const nextSearch = this.props.searchText;

		if (prevSearch !== nextSearch) {
			myPixabayFetchObj.resetPage();
			console.log(nextSearch);
			myPixabayFetchObj.searchQuery = nextSearch;
			// myPixabayFetchObj.page = 0;

			myPixabayFetchObj.searchPhotos().then((firstImageList) => {
				if (firstImageList.length) {
					return this.setState({ images: firstImageList, status: 'resolved' });
				}
			});
		}
	}
	pageClickHeandler = () => {
		myPixabayFetchObj.page = 1;
		myPixabayFetchObj.searchPhotos().then((nextImageList) => {
			return this.setState((prev) => ({
				images: [...prev.images, ...nextImageList],
				status: 'resolved',
			}));
		});
	};
	scrol = () => {
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: 'smooth',
		});
	};

	render() {
		const { loading, images, error, status } = this.state;

		if (status === 'idle') {
			return <div>введите поиск</div>;
		}
		if (status === 'pending') {
			return <div>загружаем</div>;
		}
		if (status === 'rejected') {
			return <h1>Нет картинок с таким названием !</h1>;
		}
		if (status === 'resolved') {
			return (
				<div className="moreButtton">
					<ul className="ImageGallery ">
						{images.map((image) => (
							<ImageGalleryItem
								key={image.id}
								imgUrl={image.webformatURL}
								imgTitle={image.tags}
								imgLargeUrl={image.largeImageURL}
							/>
						))}
					</ul>
					{status === 'rejected'} (
					<MyButton onClick={this.pageClickHeandler}></MyButton>)
				</div>
			);
		}
	}
}
