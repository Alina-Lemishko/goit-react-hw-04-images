import { useState } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';

export default function App() {
  const [searchImg, setSearchImg] = useState('');
  const [page, setPage] = useState(1);

  const handleSubmit = image => {
    setSearchImg(image);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} setPage={setPage} />
      <ImageGallery searchImg={searchImg} page={page} setPage={setPage} />
    </>
  );
}
