import React, { Component } from 'react'
import { connect } from 'react-redux'

class Details extends Component {

    getGenres = () => {
        let genreString = this.props.details.map((movie, i) => {
            return this.props.details.length - 1 === i ? `and ${movie.genre}` : `${movie.genre}, `
        })
        return genreString
    }

    backToHome = () => {
        this.props.history.push('/');
    }

    render() {
        console.log('This is reduxState details-->', this.props.details[0]?.title)
        return (
            <div className='descriptionCardContainer'>
                <div className='descriptionCard'>
                    <h1>{this.props.details[0]?.title}</h1>
                    <img alt='Moive Poster' src={this.props.details[0]?.poster} />
                    <h2>Genres: {this.getGenres()}</h2>
                    <h3>Description</h3>
                    <h4>{this.props.details[0]?.description}</h4>
                    <button onClick={this.backToHome}>Back To List</button>
                </div>
            </div >
        )
    }
}

const mapStateToProps = reduxState => ({
    details: reduxState.details
});

export default connect(mapStateToProps)(Details);