require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../../db.js')
const { Op } = require('sequelize')



const getGamesFromApi = async () => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    let gamesApi = await apiUrl.data.results.map(el => {
        return {
            id: el.id,
            name: el.name,
            background_image: el.background_image,
            platforms: el.platforms.map(el => el),
            released: el.released,
            rating: el.rating,
            genre: el.genres.map(el => el)
        }
    });
    let next = apiUrl.data.next
    for (let i = 0; i < 4; i++) {
        let moreGames = await axios.get(next);
        let resultGames = await moreGames.data.results.map(el => {
            return {
                id: el.id,
                name: el.name,
                background_image: el.background_image,
                platforms: el.platforms.map(el => el),
                released: el.released,
                rating: el.rating,
                genre: el.genres.map(el => el)
            }
        })
        gamesApi.push(...resultGames);
        next = moreGames.data.next
    }
    return gamesApi;
}

const getGamesFromDb = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

const getAllGames = async () => {
    let apiInfo = await getGamesFromApi();
    let dbInfo = await getGamesFromDb();
    let infoTotal = apiInfo.concat(dbInfo)
    return infoTotal;
}




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

const postGame = async (name, description, platforms, background_image, released, rating, genre) => {
    let newGame = await Videogame.create({ name, description, platforms, background_image, released, rating })
    let genreDb = await Genre.findAll({
        where: {
            name: genre
        }
    })
    await newGame.addGenre(genreDb)
    return newGame;
}
module.exports = { getGamesFromApi, getGamesFromDb, getGameByIdApi, getGameByIdDb, postGame, getAllGames }


// const getGamesFromApi = async (name) => {
//     try {
//         if (name) {
//             let firstGames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)
//             let gamesApi = await firstGames.data.results.map(el => {
//                 return{
//                     key: el.id,
//                     name: el.name,
//                     background_image: el.background_image,
//                     platforms: el.platforms.map(el=>el),
//                     released: el.released,
//                     rating: el.rating,
//                     genres: el.genres.map(el=>el)
//                 }
//             });
//             return gamesApi;
//         } else {
//             let firstGames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
//             let gamesApi = await firstGames.data.results.map(el => {
//                 return{
//                     key: el.id,
//                     name: el.name,
//                     background_image: el.background_image,
//                     platforms: el.platforms.map(el=>el),
//                     released: el.released,
//                     rating: el.rating,
//                     genres: el.genres.map(el=>el)
//                 }
//             });
//             let next = firstGames.data.next
//             for (let i = 0; i < 4; i++) {
//                 let moreGames = await axios.get(next);
//                 let resultGames = await moreGames.data.results.map(el => {
//                     return{
//                         key: el.id,
//                         name: el.name,
//                         background_image: el.background_image,
//                         platforms: el.platforms.map(el=>el),
//                         released: el.released,
//                         rating: el.rating,
//                         genres: el.genres.map(el=>el)
//                     }
//                 })
//                 gamesApi.push(...resultGames);
//                 next = moreGames.data.next
//             }
//             return gamesApi;
//         }

//     } catch (err) {
//         console.error(err)
//     }
// };



// const getGamesFromDb = async (name) => {
//     try {
//         if (name) {
//             let gamesDb = await Videogame.findAll({
//                 where: {
//                     name: {
//                         [Op.iLike]: `%${name}%`
//                     }
//                 },
//                 include: {
//                     model: Genre,
//                     attributes: ['name'],
//                     through: {
//                         attributes: [],
//                     }
//                 }
//             });
//             let allGamesDb = [];
//             gamesDb.forEach(inst => {
//                 allGamesDb.push(inst.dataValues)
//             });
//             return allGamesDb
//         } else {
//             let gamesDb = await Videogame.findAll({
//                 include: {
//                     model: Genre,
//                     attributes: ['name'],
//                     through: {
//                         attributes: [],
//                     }
//                 }
//             });
//             return gamesDb;
//         }
//     } catch (err) {
//         console.error(err)
//     }
// };