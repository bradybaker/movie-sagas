import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Details.css'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});


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

    goEdit = (id) => {

        this.props.history.push(`/editForm/${id}`);
    }

    render() {
        const classes = this.props.classes
        console.log('This is reduxState details-->', this.props.details[0]?.title)
        return (
            <div className='descriptionCardContainer'>
                <div className='descriptionCard'>
                    <h1>{this.props.details[0]?.title}</h1>
                    <img className='images  hvr-grow-shadow' alt='Moive Poster' src={this.props.details[0]?.poster} />
                    <h2>Genres: {this.formatGenres()}</h2>
                    <p className='movieDescriptionTitle'>Description</p>
                    <p className='movieDescriptionContent'>{this.props.details[0]?.description}</p>
                    <Button variant="outlined" color="inherit" className={classes.button} onClick={this.backToHome}>Back To List</Button>
                    <Button variant="outlined" color="inherit" className={classes.button} onClick={(event) => this.goEdit(event, this.props.details[0]?.id)}>Edit</Button>
                </div>
            </div >
        )
    }
}

const mapStateToProps = reduxState => ({
    details: reduxState.details
});

export default withStyles(styles)(connect(mapStateToProps)(Details));