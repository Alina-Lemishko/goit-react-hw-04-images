import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Api from 'services/api';
import { API_KEY } from 'services/api';
import RejectedItem from 'components/RejectedItem/RejectedItem';
import ResolvedItem from 'components/ResolvedItem/ResolvedItem';
import IdleItem from 'components/IdleItem/IdleItem';
import Loader from 'components/Loader/Loader';
import s from '../IdleItem/IdleItem.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGallery({ searchImg }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(
    () => {
      if (page > 1) {
        fetch(
          `https://pixabay.com/api/?q=${searchImg}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(response => response.json())
          .then(result => {
            setImages(prev => [...prev, ...result.hits]);
            setStatus(Status.RESOLVED);
          })

          .catch(error => {
            setStatus(Status.REJECTED);
            setError(error.message);
          });
      }
    },
    // eslint-disable-next-line
    [page]
  );

  useEffect(() => {
    if (!searchImg) {
      return;
    }
    setStatus(Status.PENDING);
    setPage(1);

    Api.ImagesFetch(searchImg)
      .then(result => {
        setImages(result.hits);
        setTotalHits(result.total);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
        setError(error.message);
      });
  }, [error, searchImg]);

  const onHandleClick = () => {
    return setPage(page + 1);
  };

  const onImageClick = (url, tag) => {
    setUrl(url);
    setModalOpen(!modalOpen);
    setAlt(tag);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const isNextPage = Math.ceil(totalHits / page);

  if (status === Status.IDLE) {
    return (
      <>
        <IdleItem images={images} onClick={onImageClick} />
        {modalOpen && (
          <Modal onClose={toggleModal}>
            <img src={url} alt={alt} />
          </Modal>
        )}
      </>
    );
  }

  if (status === Status.PENDING) {
    return <Loader />;
  }

  if (status === Status.RESOLVED) {
    if (images.length === 0) {
      return <h2 className={s.container}>Sorry, nothing was find</h2>;
    }
    return (
      <>
        <ResolvedItem images={images} onClick={onImageClick} />
        {totalHits > 12 && isNextPage > 12 ? (
          <Button onClick={onHandleClick} />
        ) : null}
        {modalOpen && (
          <Modal onClose={toggleModal}>
            <img src={url} alt="img" />
          </Modal>
        )}
      </>
    );
  }

  if (status === Status.REJECTED) {
    return <RejectedItem error={error.message} />;
  }
}

ImageGallery.propTypes = {
  searchImg: PropTypes.string.isRequired,
};
