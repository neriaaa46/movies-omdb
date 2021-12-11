const NodeCache = require( "node-cache" )
const moviesCache = new NodeCache()

const FIVE_MINUTES_IN_SECONDS = 300

function checkCache(req, res, next){
    const {id, title} = req.query
    if(id){
        cacheResponse(id, res, next)
    } else if(title){
        cacheResponse(title, res, next)
    }else {
        cacheResponse("myList", res, next)
    }
}

function cacheResponse(key, res, next){
    const cachedResponse = moviesCache.get(key)

    if(cachedResponse){
        res.json(cachedResponse)
    } else {
        res.originalJson = res.json
        res.json = movies => {
            res.originalJson(movies)
            moviesCache.set(key, movies, FIVE_MINUTES_IN_SECONDS)
        }
        next()
    }
}

module.exports = {checkCache}