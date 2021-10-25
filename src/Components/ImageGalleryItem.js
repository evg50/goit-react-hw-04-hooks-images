import React, { Component } from "react";
import Modal from "./Modal";
export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { imgUrl, imgTitle, imgLargeUrl } = this.props;
    const { showModal } = this.state;
    console.log(imgLargeUrl);

    return (
      <li className="ImageGalleryItem">
        <img
          src={imgUrl}
          alt={imgTitle}
          className="ImageGalleryItem-image"
          onClick={this.toggleModal}
        />
        {showModal && (
          <Modal onClose={this.toggleModal} src={imgLargeUrl} alt={imgTitle} />
        )}
      </li>
    );
  }
}
