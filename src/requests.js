const BASE_URL = 'https://my-cool-projectest-server.herokuapp.com';

const request = (url) => fetch(`${BASE_URL}/${url}/`)
  .then((response) => response.json());

export const loadProducts = (url) => request(url);

export const loadIngredients = (url) => request(url);
