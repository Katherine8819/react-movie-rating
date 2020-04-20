import React from 'react'

class MovieList extends React.Component {
  render() {

    const { movieWillWatch } = this.props


    return (
      <li className="list-group-item">
        <div>{movieWillWatch.title}</div>
        <div className="mt-3">Rating: {movieWillWatch.vote_average}</div>
      </li>
    )
  }
}

export default MovieList

