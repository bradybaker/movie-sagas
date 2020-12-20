import React, { Component } from 'react'
import { connect } from 'react-redux'

class Details extends Component {

    formatGenres = () => {
        let genreString = this.props.details.map((movie, i) => {
            if (this.props.details.length === 1) {
                return `${movie.genre}`
            } else if (this.props.details.length - 1 === i) {
                return `and ${movie.genre}`
            } else {
                return `${movie.genre}, `
            }
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
                    <h2>Genres: {this.formatGenres()}</h2>
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