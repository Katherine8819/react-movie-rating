import React from 'react'

class MovieItem extends React.Component {

  state = {
    willWatch: false
  }

  render() {
    const { movie, removeMovie, addMovieToWillWatch, removeMovieFromWillWatch } = this.props

    function getAddress() {
      if (movie.backdrop_path || movie.poster_path) {
        return `https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`
      } else { return '../img/camera.jpg' }
    }

    return (
      <div className="card ">
        <div className="card-img-top card__img-wrap">
          <img
            className="card__img"
            src={getAddress()}
            alt=""
          />
        </div>
        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>
          <div>
            <p className="mb-3">Rating: {movie.vote_average}</p>
            <div className="buttons d-flex justify-content-between">
              {this.state.willWatch ?
                (<button type='button'
                  className="btn btn-success"
                  onClick={() => {
                    this.setState({
                      willWatch: false
                    });
                    removeMovieFromWillWatch(movie)
                  }}>
                  <img className="btn-img" src="../img/heartbreak.svg" alt="Delete from Favourite"></img>
                </button>) : (<button type='button'
                  className="btn btn-primary"
                  onClick={() => {
                    this.setState({
                      willWatch: true
                    });
                    addMovieToWillWatch(movie)
                  }}>
                  <img className="btn-img" src="../img/heart.svg" alt="Add from Favourite"></img>

                </button>)}
              <button type="button" className="btn btn-secondary" onClick={removeMovie.bind(null, movie)}>
                <img className="btn-img" src="../img/bin.svg" alt="Add from Favourite"></img>
              </button>
            </div>

          </div>

        </div>
      </div>
    )
  }
}


export default MovieItem