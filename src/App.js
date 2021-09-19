import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './App.css';
import fetchImages from './services/api';

import Searchbar from './components/Searchbar/Searchbar.js';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';

export default function App(params) {
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showModalWindow, setShowModalWindow] = useState(false);
  const [modalImg, setModalImg] = useState('');

  useEffect(() => {
    if (!name) {
      return;
    }

    showLoadMoreBtn(true);
    fetchImages(name, page)
      .then(images => {
        setHits(images.data.hits.length);
        if (images.data.hits.length === 0) {
          Notiflix.Notify.failure(
            'There is no images due to your request. Please specify your query',
          );
          setHits(0);
        }
        setImages(prevImages => [...prevImages, ...images.data.hits]);
      })
      .catch(error => {
        Notiflix.Notify.failure(
          'There is no images due to your request. Please specify your query',
        );
        setHits(0);
      })
      .finally(() => {
        showLoadMoreBtn(false);
        bottomScroll();
      });
  }, [name, page]);

  // ---------- show button Load More ----------

  const showLoadMoreBtn = status => {
    return setShowLoader(status);
  };

  // ---------- show Modal window ----------

  const showModal = value => {
    setShowModalWindow(value);
  };

  // ---------- image link in Modal window ----------

  const addImageSrc = data => {
    setModalImg(data);
  };

  // ---------- state update due to Input or Load more btn click ----------

  const addValues = value => {
    if (value.image) {
      setImages([]);
      setName(value.image);
      setPage(value.page);
    } else {
      setPage(value.page);
    }
  };

  // ---------- scroll down to current page ----------

  const bottomScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  // ---------- render ----------

  return (
    <div className="App">
      <Searchbar onSubmit={addValues} />

      <ImageGallery>
        <ImageGalleryItem
          imageGallery={images}
          showModal={showModal}
          addImageSrc={addImageSrc}
        />
      </ImageGallery>

      {showLoader && (
        <Loader
          type="Puff"
          color="rgba(250, 128, 114)"
          height={80}
          width={80}
          className="Loader"
        />
      )}

      {!showLoader && hits >= 12 && (
        <Button totalHits={hits} onSubmit={addValues} currentPage={page} />
      )}

      {showModalWindow && (
        <Modal
          modalImg={modalImg}
          showLoader={showModal}
          showModal={showModal}
        />
      )}
    </div>
  );
}

// class App extends Component {
//   state = {
//     images: [],
//     name: '',
//     page: null,
//     hits: 0,

//     modalImg: '',

//     showLoader: false,
//     showModal: false,
//   };
//   // ---------- show button Load More ----------
//   showLoadMoreBtn = status => {
//     this.setState({ showLoader: status });
//   };
//   // ---------- show Modal window ----------
//   showModal = value => {
//     this.setState({ showModal: value });
//   };
//   // ---------- image link in Modal window ----------
//   addImageSrc = data => {
//     this.setState({ modalImg: data });
//   };
//   // ---------- state update due to Input or Load more btn click ----------
//   addValues = value => {
//     value.image
//       ? this.setState({
//           images: [],
//           name: value.image,
//           page: value.page,
//           hits: value.hits,
//         })
//       : this.setState({
//           page: value.page,
//           hits: value.hits,
//         });
//   };
//   // ---------- scroll down to current page ----------
//   bottomScroll = () => {
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: 'smooth',
//     });
//   };
//   // ---------- backend request with axios ----------
//   dataRequestAPI = () => {
//     const API_URL = 'https://pixabay.com/api/';
//     const API_KEY = '19797525-803e10272823be06aee41a8f4';
//     const API = `${API_URL}?q=${this.state.name}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

//     this.showLoadMoreBtn(true);

//     axios
//       .get(API)
//       .then(images => {
//         if (images.data.hits.length === 0) {
//           Notiflix.Notify.failure(
//             'There is no images due to your request. Please specify your query',
//           );
//         }

//         this.setState(prevState => {
//           return {
//             images: [...prevState.images, ...images.data.hits],
//             hits: prevState.hits + images.data.hits.length,
//           };
//         });

//         if (this.state.hits >= images.data.totalHits) {
//           this.setState({ hits: 0 });
//         }

//         this.bottomScroll();
//       })
//       .catch(error => {
//         Notiflix.Notify.failure(
//           'There is no images due to your request. Please specify your query',
//         );
//       })
//       .finally(() => this.showLoadMoreBtn(false));
//   };
//   // ---------- new backend request if changed Input or Page ----------
//   componentDidUpdate(prevProps, prevState) {
//     if (
//       this.state.name !== prevState.name ||
//       this.state.page !== prevState.page
//     ) {
//       this.dataRequestAPI();
//     }
//   }
//   // ---------- render ----------
//   render() {
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.addValues} />

//         <ImageGallery>
//           <ImageGalleryItem
//             imageGallery={this.state.images}
//             showModal={this.showModal}
//             addImageSrc={this.addImageSrc}
//           />
//         </ImageGallery>

//         {this.state.showLoader && (
//           <Loader
//             type="Puff"
//             color="rgba(250, 128, 114)"
//             height={80}
//             width={80}
//             className="Loader"
//           />
//         )}

//         <Button
//           totalHits={this.state.hits}
//           onSubmit={this.addValues}
//           currentPage={this.state.page}
//         />

//         {this.state.showModal && (
//           <Modal
//             modalImg={this.state.modalImg}
//             showLoader={this.state.showModal}
//             showModal={this.showModal}
//           />
//         )}
//       </div>
//     );
//   }
// }

// export default App;
