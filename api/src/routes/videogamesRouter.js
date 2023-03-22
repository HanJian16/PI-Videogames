const { Router } = require('express');
const { postGame, getAllGames } = require('./controllers/videogames.js');
const { Videogame } = require('../db.js')

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

videogamesRouter.delete('/:id', async (req, res) => {
    try{
        let id = req.params.id;
        Videogame.destroy({where: {
            id: id
        }})
        res.status(200).json({message: 'El personaje fue eliminado'})
    }catch(error){
        console.log(error)
    }
})

module.exports = videogamesRouter;