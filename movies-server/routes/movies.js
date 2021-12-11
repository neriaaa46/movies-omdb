var express = require('express');
var router = express.Router();
const MoviesControllers = require("../api/controllers/movies")
const {checkCache} = require("../middleware/cache")


router.get('/', checkCache, MoviesControllers.getMovies)

router.get('/details', checkCache, MoviesControllers.movieDetails)


module.exports  = router;
