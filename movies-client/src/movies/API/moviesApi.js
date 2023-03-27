const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3100/api"
    : "https://movies-omdb.onrender.com/api"

async function getMovies(title) {
  let response = await fetch(`${URL}/movies?title=${title}`)
  let data = await response.json()
  return data
}

async function getMovie(imdbID) {
  let response = await fetch(`${URL}/movies/details?id=${imdbID}`)
  let data = await response.json()
  return data
}

export { getMovies, getMovie }
