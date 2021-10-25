import { useState, useEffect } from 'react';
import PixabayFetchObj from '../sevices/PixabayFetch';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../Components/ImageGalleryItem';
import MyButton from '../Components/MyButton';
const base_url = 'https://pixabay.com/api/';
const api_key = '23915322-b5091aa0ad0b72709b6c0de72';
const myPixabayFetchObj = new PixabayFetchObj(base_url, api_key);

function ImageGallery({ searchText }) {
	const [status, setStatus] = useState('idle');
	const [images, setImages] = useState([]);

	useEffect(() => {
		if (!searchText.trim()) return;
		setStatus('pending');
		myPixabayFetchObj.resetPage();
		myPixabayFetchObj.searchQuery = searchText;
		myPixabayFetchObj
			.searchPhotos()
			.then((firstImageList) => {
				if (firstImageList.length) {
					setImages(firstImageList);
					setStatus('resolved');
				}
			})
			.catch((err) => {
				console.log(err);
				setStatus('rejected');
			});
	}, [searchText]);

	const pageClickHeandler = () => {
		myPixabayFetchObj.page = 1;
		myPixabayFetchObj.searchPhotos().then((nextImageList) => {
			setImages([...images, ...nextImageList]);
			setStatus('resolved');
		});
	};

	if (status === 'idle') {
		return <h1>Hello! Search something</h1>;
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
				<MyButton onClick={pageClickHeandler}></MyButton>)
			</div>
		);
	}
}

ImageGallery.propTypes = {
	searchText: PropTypes.string.isRequired,
};

export default ImageGallery;
