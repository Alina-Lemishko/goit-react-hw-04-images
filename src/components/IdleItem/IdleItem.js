import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './IdleItem.module.css';

const IdleItem = ({ images, onClick }) => {
  return (
    <section className={s.GallerySection}>
      <h1 className={s.container}>Enter keywords to search</h1>
      <ul className={s.ImageGallery}>
        <ImageGalleryItem images={images} onImageClick={onClick} />
      </ul>
    </section>
  );
};

export default IdleItem;

IdleItem.propTypes = {
  images: PropTypes.array,
  onClick: PropTypes.func.isRequired,
};
