import {Modal} from "react-bootstrap"

function ModalMovies(props){
    return <>
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header className="modal-header">
                <h3 className="text-center">{props.movieDetails.Title}</h3>
            </Modal.Header>

            <Modal.Body className="modal-body">
            <div className="container-img">
                <img src={props.movieDetails.Poster}/>
            </div>
            <div className="modal-body-text">
                <h6>Actors:</h6>
                <p>{props.movieDetails.Actors}</p>
                <h6>Genre:</h6>
                <p>{props.movieDetails.Genre}</p>
                <h6>Language:</h6>
                <p>{props.movieDetails.Language}</p>
                <h6>Summary:</h6>
                <p>{props.movieDetails.Plot}</p>
            </div>
            </Modal.Body>

            <Modal.Footer className="modal-footer">
                <p>Time: {props.movieDetails.Runtime}</p>
                <p>Year: {props.movieDetails.Year}</p>
                <p>Votes: {props.movieDetails.imdbVotes}</p>
            </Modal.Footer>
      </Modal>
    </>
}


export default ModalMovies