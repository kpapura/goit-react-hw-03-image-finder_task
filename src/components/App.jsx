// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };

import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import {Loader  } from './Loader/Loader';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';
import axios from 'axios';
import { API_KEY } from '../services/imgApi';
import s from './styles/styles.module.scss';
import {  getSearchImgApi} from '../services/imgApi';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      totalHits: 0,
      loading: false,
      error: null,
      modalImageUrl: '',
      query: ''
    };
  }

  fetchImages = async (query, page = 1) => {
    try {
      this.setState({ loading: true });
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const { hits, totalHits: newTotalHits } = response.data;
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        totalHits: newTotalHits
      }));
    } catch (error) {
      this.setState({ error: 'Failed to fetch images' });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearchSubmit = query => {
    this.setState({ images: [], totalHits: 0, query });
    this.fetchImages(query);
  };

  handleLoadMore = async () => {
    const { images, query } = this.state;
    const nextPage = Math.ceil(images.length / 12) + 1;
    try {
      this.setState({ loading: true });

      const { totalHits: newTotalHits, images: newImages } = await getSearchImgApi(query, nextPage);

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        totalHits: newTotalHits
      }));
    } catch (error) {
      this.setState({ error: 'Failed to fetch images' });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleImageClick = imageUrl => {
    this.setState({ modalImageUrl: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ modalImageUrl: '' });
  };

  render() {
    const { images, totalHits, loading, error, modalImageUrl } = this.state;
    const showLoadMoreButton = images.length < totalHits;

    return (
      <div className={s.app}>
<Searchbar handleSearch={this.handleSearchSubmit} />

        {error && <div className="error">{error}</div>}

        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.handleImageClick} />
        )}

        {loading && <Loader />}

        {showLoadMoreButton && !loading && (
          <Button onClick={this.handleLoadMore} />
        )}

        {modalImageUrl && (
          <Modal imageUrl={modalImageUrl} onClose={this.handleCloseModal} />
        )}
      </div>
    );
  }
}

export default App;
