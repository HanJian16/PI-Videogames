require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');

async function getGenres() {
    let genres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    return genres.data.results
}

module.exports = getGenres;