const axios = require('axios');
const {moviesIds} = require("../../utils/constants")

const url = "https://www.omdbapi.com"

const getMovies = async (req, res, next) => {
    const {title} = req.query

    if(!title){
        const movies = []

        try {
            for (const id of moviesIds) {
                const {data} = await axios.get(`${url}/?apikey=${process.env.API_KEY}&i=${id}`)
                const {Title, Year, imdbID, Type, Poster} = data
                const movie = {Title, Year, imdbID, Type, Poster}
                movies.push(movie)
            }
            res.status(200).json({movies})
    
        } catch (error) {
            res.status(500).json({message: 'Error getting requested data'})
        }

    } else {
        try {
            const {data} = await axios.get(`${url}/?apikey=${process.env.API_KEY}&s=${title}`)
            if(data.Response === "False"){
                throw Error(data.Error)
            } 
            const movies = data.Search
            res.status(200).json({movies})
    
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}

const movieDetails = async (req, res, next) => {
    try {
        const {id} = req.query
        const {data} = await axios.get(`${url}/?apikey=${process.env.API_KEY}&i=${id}`)
        const {Title, Year, Runtime, Genre, Actors, Plot, Language, imdbVotes, Poster} = data
        const movie = {Title, Year, Runtime, Genre, Actors, Plot, Language, imdbVotes, Poster}
        res.status(200).json({movie})

    } catch (error) {
        res.status(500).json({message: "Error getting requested data"})
    }
}

module.exports  = {getMovies, movieDetails}