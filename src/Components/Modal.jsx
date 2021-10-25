import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
	componentDidMount() {
		console.log('Modal component DID mount');
		window.addEventListener('keydown', this.handleKeyDown);
	}
	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
	}
	handleCLoseModal = (e) => {
		if (e.currentTarget === e.target) {
			this.props.onClose();
		}
	};
	handleKeyDown = (e) => {
		if (e.code === 'Escape') {
			this.props.onClose();
		}
	};
	render() {
		const { src, alt } = this.props;
		return createPortal(
			<div className="Overlay" onClick={this.handleCLoseModal}>
				<div className="Modal">
					<img src={src} alt={alt} />
				</div>
			</div>,
			modalRoot
		);
	}
}

export default Modal;
