import React, { Component } from 'react'
import { connect } from 'react-redux'
import MovieCard from '../MovieCard/MovieCard'
import './Home.css'


class Home extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_MOVIE' })
    }

    render() {
        console.log('This is redux state', this.props.movies)
        return (
            <div>
                <h1>This is the Home/Movie list page</h1>
                <div className='movieCardContainer'>
                    {
                        this.props.movies.map(movie => {
                            return (
                                <MovieCard key={movie.id} movie={movie} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    movies: reduxState.movies
});

export default connect(mapStateToProps)(Home);