const { Router } = require('express');
const { getGameByIdApi, getGameByIdDb, postGame, getAllGames } = require('./controllers/videogames.js')

const videogamesRouter = Router()

videogamesRouter.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        let allGames = await getAllGames();

        if (name) {
            let gamesName = await allGames.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            res.status(200).send(gamesName)
        } else {
            res.status(200).json(allGames);
        }
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});

videogamesRouter.get('/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const allGames = await getAllGames();
        if(id){
            let gamesId = await allGames.filter(el => el.id == id);
            res.status(200).json(gamesId)
        }}catch(error){
        console.error(error)
    }
})

videogamesRouter.post("/", async (req, res) => {
    try {
        let { name, description, platforms, background_image, released, rating, genre } = req.body;
        let newGame = await postGame(name, description, platforms, background_image, released, rating, genre);
        res.status(200).json(newGame)
    } catch (err) {
        console.error(err)
    }
})
module.exports = videogamesRouter;
// videogamesRouter.get('/api/:idVideogame', async (req, res) => {
//     try {
//         let { idVideogame } = req.params;
//         let gameApi = await getGameByIdApi(idVideogame);
//         res.status(200).json(gameApi)
//     } catch (err) {
//         res.status(404).json({ error: err.message })
//     }
// });

// videogamesRouter.get("/db/:id", async (req, res) => {
//     try {
//         let { id } = req.params;
//         let gameDb = await getGameByIdDb(id);
//         res.status(200).json(gameDb)
//     } catch (err) {
//         console.error(err)
//     }
// })