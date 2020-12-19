import React, { Component } from 'react'
import { connect } from 'react-redux'

class Details extends Component {

    componentDidMount() {
        // this.props.dispatch({ type: 'SET_DETAIL' })
    }

    render() {
        console.log('This is reduxState details-->', this.props.details)
        return (
            <div>
                <h1>This is the details page for the movie {this.props.details.map(movie => {
                    return (
                        <>
                            {movie.title}
                        </>
                    )
                })}</h1>
            </div >
        )
    }
}

const mapStateToProps = reduxState => ({
    details: reduxState.details
});

export default connect(mapStateToProps)(Details);