import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll} from 'react-scroll'

import Searchbar from './Searchbar/Searchbar';
import { getImages } from './api';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export const App = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [urlLargeImg, setUrlLargeImg] = useState('');
  const [loadingPage, setLadingPage] = useState(1);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    const fetchData = async () => {
      try {
        setLoader(true);
        const resp = await getImages(searchQuery, loadingPage);
        setImages(prevState => [...prevState, ...resp.hits]);

        if (!(loadingPage < Math.ceil(resp.totalHits / 12))) {
          setAllImagesLoaded(true)
        }
        if (resp.hits.length===0) {
          toast.error(`There is no images find by ${searchQuery} request`);
        }

      } catch (error) {
        toast.error(`Something was wrong. Try to refresh the page`);
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, [loadingPage, searchQuery]);
  
  const getSearchQuery = query => {
    setSearchQuery(query);
    setImages([]);
    setLadingPage(1);
    setAllImagesLoaded(false);
    setShowModal(false);
  };

  const getLargeImg = url => {
    setUrlLargeImg(url);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const changeLoadingPage = () => {
    setLadingPage(prevState => prevState + 1);
    scroll.scrollMore(600);
  };

  return (
    <>
      {loader && <Loader />}
      {showModal && (
        <Modal
          onClose={toggleModal}>
          <img src={urlLargeImg} alt='img' />
        </Modal>
      )}

      <ToastContainer
        autoClose={3000}
      />
      <Searchbar
        getSearchQuery={getSearchQuery}
      />
      <ImageGallery
        images={images}
        getLargeImg={getLargeImg}
        toggleModal={toggleModal}
      />
      {images.length > 0 && !allImagesLoaded && (
        <Button
          type='button'
          onClick={changeLoadingPage}
        />
      )}
    </>
  );
}