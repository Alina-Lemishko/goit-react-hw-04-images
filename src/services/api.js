export const API_KEY = '27935706-58376e41d3c547772de5a9830';

const ImagesFetch = query => {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Sorry, nothing was find for ${query}`));
  });
};

const Api = {
  ImagesFetch,
};

export default Api;
