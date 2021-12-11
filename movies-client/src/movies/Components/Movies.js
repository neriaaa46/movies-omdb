import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {Container, Row, Card, Col, Spinner} from "react-bootstrap"
import {useState, useEffect} from "react"
import {getMovies, getMovie} from "../API/moviesApi"
import ModalMovies from "./ModalMovies"
import popcorn from "../Images/popcorn.png"


function Movies(){

    const [movies, setMovies] = useState([])
    const [searchMovie, setSearchMovie] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [spinner, setSpinner] = useState(true)

    const [show, setShow] = useState(false)
    const [movieDetails, setMovieDetails] = useState({})

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    useEffect(()=>{
        const serach = setTimeout(async()=>{
            setErrorMessage("")
            setSpinner(true)
            const {movies, message} = await getMovies(searchMovie)
            checkMoviesResponse(movies, message)
        }, 1000)

        return () => {
            clearTimeout(serach)
        }
    }, [searchMovie])

    function checkMoviesResponse(movies, message){
        setSpinner(false)
        if(message){
            setMovies([])
            setErrorMessage(message)
        } else {
            setMovies(movies)
        }
    }

    async function getDetailsMovie(imdbID){
        const {movie, message} = await getMovie(imdbID)
        if(message){
            setErrorMessage(message)
            setTimeout(()=>{
                setErrorMessage("")
            }, 2000)

        } else {
            setMovieDetails(movie)
            handleShow()
        }
    }


    return <>
        <Container className="mt-5">

            <ModalMovies handleClose={handleClose} show={show} movieDetails={movieDetails}/>

            <div className="serach-container">
                <div className="d-flex justify-content-center">
                    <div className="search-movies d-flex col-10 col-lg-5 col-md-6">
                        <input 
                        className="search-input"
                        type='text' 
                        placeholder="Search Movies ..."
                        onChange={(e)=>setSearchMovie(e.target.value)}></input>
                        <FontAwesomeIcon icon={faSearch} className="icon-search"/>
                    </div>
                </div>

                {!spinner&&errorMessage&&<div className="d-flex justify-content-center">
                    <p>{errorMessage}</p>
                </div>}
            </div>

            {spinner&&<div className="loader d-flex justify-content-center align-items-center">
                <h4 className="text-center mx-3">Loading</h4>
                <Spinner animation="grow" size="sm"/>
                <img className="popcorn" src={popcorn}/>
            </div>}

            {!spinner&&<Row>
                {movies.map((movie, index)=>{
                return <Col xs={12} md={6} lg={4} key={index}>
                        <Card className="card-movie mb-5 mx-auto" onClick={()=>getDetailsMovie(movie.imdbID)}>
                            <div>
                                <Card.Img variant="top" className="card-img" src={movie.Poster}/>
                            </div>

                            <Card.Body className="card-body">
                                <h5 className="card-title">{movie.Title}</h5>
                                <Card.Text className="card-text">
                                    <span>{movie.Year}</span>
                                    <span>{movie.Type}</span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>})}
            </Row>}

        </Container>
    </>
}

export default Movies