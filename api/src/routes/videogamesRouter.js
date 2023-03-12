const { Router } = require('express');
const { getGamesFromApi, getGameByIdApi, getGamesFromDb, getGameByIdDb, postGame } = require('./controllers/videogames.js')

const videogamesRouter = Router()

videogamesRouter.get('/', async (req, res) => {
    try {
        let { name } = req.query;
        if (name) {
            let gamesApi = await getGamesFromApi(name);
            let gamesDb = await getGamesFromDb(name);
            let games = [...gamesApi, ...gamesDb];
            res.send(games)
        } else {
            let gamesApi = await getGamesFromApi();
            let gamesDb = await getGamesFromDb();
            let games = [...gamesApi, ...gamesDb];
            res.status(200).json(games);
        }
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});
videogamesRouter.get('/:idVideogame', async (req, res) => {
    try {
        let { idVideogame } = req.params;
        let gameApi = await getGameByIdApi(idVideogame);
        res.status(200).json(gameApi)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
});

videogamesRouter.post("/", async (req, res) => {
    try {
        let { name, description, platforms, imagen, released, rating } = req.body;
        let newGame = await postGame(name, description, platforms, imagen, released, rating);
        res.status(200).json(newGame)
    } catch (err) {
        console.error(err)
    }
})
module.exports = videogamesRouter;