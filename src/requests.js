const BASE_URL = 'http://localhost:8000';

const request = (url) => fetch(`${BASE_URL}/${url}/`)
  .then((response) => response.json());

const loadBurgers = (url) => request(url);

export default loadBurgers;
