import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from '../IdleItem/IdleItem.module.css';

const ResolvedItem = ({ images, onClick }) => {
  return (
    <section className={s.GallerySection}>
      <ul className={s.ImageGallery}>
        <ImageGalleryItem images={images} onImageClick={onClick} />
      </ul>
    </section>
  );
};

export default ResolvedItem;

ResolvedItem.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
