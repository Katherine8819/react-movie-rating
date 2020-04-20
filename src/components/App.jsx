import React from 'react'
// import { moviesData } from '../moviesData'
import MovieItem from './MovieItem'
import { API_URL, API_KEY_3 } from '../utils/api'
import MovieTabs from './MovieTabs'
import Pages from './Pages'
import MovieList from './MovieList'


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      totalPages: null,
      currentPage: 1
    }
    // console.log("constructor state", this.state)
  }

  updatePageNumber = value => {
    if (this.state.currentPage === 1 && value === -1) {
      this.setState({
        currentPage: 1
      })
    } else {
      this.setState({
        currentPage: this.state.currentPage + value
      })
    }
    this.componentDidMount()
    // this.componentDidUpdate()
  }

  componentDidMount() {
    // console.log('didMount')
    this.getMovies()
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('didUpdate')
    // console.log("prev", prevProps, prevState)
    // console.log("this.prev", this.props, this.state)
    if (prevState.sort_by !== this.state.sort_by) {
      this.setState({
        currentPage: 1
      })
      this.getMovies()
    }

    if (prevState.currentPage !== this.state.currentPage) {
      this.getMovies()
    }
  }



  getMovies = () => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${
      this.state.sort_by}&page=${this.state.currentPage}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        // console.log(data)
        this.setState({
          movies: data.results,
          totalPages: data.total_pages
        })
      })
  }


  removeMovie = movie => {
    const updateMovies = this.state.movies.filter(function (item) {
      return item.id !== movie.id;
    })

    this.setState({
      movies: updateMovies,
    })
    this.removeMovieFromWillWatch(movie)
  }

  addMovieToWillWatch = movie => {
    // console.log(movie)
    const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie]

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    })

  }

  removeMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(function (item) {
      return item.id !== movie.id;
    })

    this.setState({
      moviesWillWatch: updateMoviesWillWatch,
    })
  }

  updateSortBy = value => {
    this.setState({
      sort_by: value
    })
  };


  render() {
    // console.log('render')
    // console.log("render state", this.state)

    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 col-md-7 col-lg-9">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTabs sort_by={this.state.sort_by} updateSortBy={this.updateSortBy} />

              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <Pages updatePageNumber={this.updatePageNumber}
                  totalPages={this.state.totalPages}
                  currentPage={this.state.currentPage} />
              </div>
            </div>
            <div className="row">
              {this.state.movies.map(movie => {
                return (
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
                    <MovieItem
                      key={movie.id}
                      movie={movie}
                      removeMovie={this.removeMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      removeMovieFromWillWatch={this.removeMovieFromWillWatch} />
                  </div>)
              })}
            </div>
            <div className="row">
              <div className="col-4 col-lg-6">
                <Pages updatePageNumber={this.updatePageNumber}
                  totalPages={this.state.totalPages}
                  currentPage={this.state.currentPage} />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 col-lg-3">
            <div className="card-header font-weight-bold">
              Favourite: {this.state.moviesWillWatch.length} movies
            </div>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movieWillWatch => {
                return (
                  <MovieList movieWillWatch={movieWillWatch} />
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default App