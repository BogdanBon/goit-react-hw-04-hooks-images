import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '19797525-803e10272823be06aee41a8f4';

function fetchImages(name, page) {
  const API = `${API_URL}?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return axios.get(API).then(images => {
    return images;
  });
}

export default fetchImages;
