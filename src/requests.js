const BASE_URL = 'https://heroku-api-json.herokuapp.com';

const request = (url) => fetch(`${BASE_URL}/${url}/`)
  .then((response) => response.json());

export const loadBurgers = (url) => request(url);

export const loadIngredients = (url) => request(url);
