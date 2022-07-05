import React, { Component } from 'react';
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

class ImageGallery extends Component {
  static propTypes = {
    searchImg: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    page: 1,
    totalHits: null,
    modalOpen: false,
    image: [],
    error: null,
    status: 'idle',
  };

  componentDidMount() {
    Api.ImagesFetch('flo').then(result =>
      this.setState({ images: result.hits })
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { searchImg } = this.props;
    if (this.state.page > prevState.page) {
      fetch(
        `https://pixabay.com/api/?q=${searchImg}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => response.json())
        .then(result =>
          this.setState(prevState => ({
            images: [...prevState.images, ...result.hits],
            status: 'resolved',
          }))
        );
    }

    if (prevProps.searchImg !== searchImg) {
      this.setState({ status: 'pending' });

      Api.ImagesFetch(searchImg)
        .then(result =>
          this.setState({
            images: result.hits,
            totalHits: result.total,
            status: 'resolved',
            page: 1,
          })
        )
        .catch(error =>
          this.setState({
            error: error.message,
            status: 'rejected',
          })
        );
    }
  }

  onHandleClick = () => {
    return this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onImageClick = id => {
    return fetch(`https://pixabay.com/api/?id=${id}&key=${API_KEY}`)
      .then(response => response.json())
      .then(result =>
        this.setState(prevState => ({
          image: result.hits,
          modalOpen: !prevState.modalOpen,
        }))
      );
  };

  toggleModal = () => {
    this.setState(({ modalOpen }) => ({ modalOpen: !modalOpen }));
  };

  render() {
    const { status, error, images, image, modalOpen, totalHits, page } =
      this.state;
    const isNextPage = Math.ceil(totalHits / page);

    if (status === 'idle') {
      return (
        <>
          <IdleItem images={images} onClick={this.onImageClick} />
          {modalOpen && <Modal images={image} onClose={this.toggleModal} />}
        </>
      );
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolved') {
      if (images.length === 0) {
        return <h2 className={s.container}>Sorry, nothing was find</h2>;
      }
      return (
        <>
          <ResolvedItem images={images} onClick={this.onImageClick} />
          {totalHits > 12 && isNextPage > 12 ? (
            <Button onClick={this.onHandleClick} />
          ) : null}
          {modalOpen && <Modal images={image} onClose={this.toggleModal} />}
        </>
      );
    }

    if (status === 'rejected') {
      return <RejectedItem error={error.message} />;
    }
  }
}

export default ImageGallery;
