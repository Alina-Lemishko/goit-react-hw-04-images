import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ images, onImageClick }) => {
  return (
    <>
      {images.map(image => (
        <li
          key={image.id}
          className={s.ImageGalleryItem}
          onClick={() => onImageClick(image.largeImageURL)}
        >
          {
            <img
              className={s.ImageGalleryItemImage}
              src={image.webformatURL}
              alt={image.tags}
            />
          }
        </li>
      ))}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  images: PropTypes.array,
  onImageClick: PropTypes.func.isRequired,
};
