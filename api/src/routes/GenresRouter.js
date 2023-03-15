const {Router} = require("express");
const getGenres = require('./controllers/Genres.js');
const {Genre} = require('../db.js')

const genresRouter = Router();

genresRouter.get('/', async(req, res) => {
    let genres = await getGenres();
    genres.forEach(element => {
        Genre.findOrCreate({
            where: { name: `${element.name}` },
          })
    });
    const allGenres = await Genre.findAll();
    res.status(200).send(allGenres)
});

module.exports = genresRouter;