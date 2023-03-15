require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame } = require('../../db.js')
const { Op } = require('sequelize')

const getGamesFromApi = async (name) => {
    try {
        if (name) {
            let firstGames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)
            let gamesApi = [];
            gamesApi.push(...firstGames.data.results)
            return gamesApi;
        } else {
            let gamesApi = [];
            let firstGames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
            gamesApi.push(...firstGames.data.results)
            let next = firstGames.data.next
            for (let i = 0; i < 4; i++) {
                let moreGames = await axios.get(next);
                gamesApi.push(...moreGames.data.results);
                next = moreGames.data.next
            }
            return gamesApi;
        }

    } catch (err) {
        console.error(err)
    }
};

const getGamesFromDb = async (name) => {
    try {
        if (name) {
            let gamesDb = await Videogame.findAll({ where: { name: { [Op.iLike]: `%${name}%` } } });
            return gamesDb
        } else {
            let gamesDb = await Videogame.findAll();
            return gamesDb;
        }
    } catch (err) {
        console.error(err)
    }
};


const getGameByIdApi = async (id) => {
    try {
        let gameId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        return gameId.data;
    } catch (err) {
        console.error(err)
    }
};

const getGameByIdDb = async (id) => {
    try {
        let gameId = await Videogame.findByPk(id);
        return gameId;
    } catch (err) {
        console.error(err)
    }
};

const postGame = async (name, description, platforms, background_image, released, rating) => {
    let newGame = await Videogame.create({ name, description, platforms, background_image, released, rating })
    return newGame;
}
module.exports = { getGamesFromApi, getGamesFromDb, getGameByIdApi, getGameByIdDb, postGame }