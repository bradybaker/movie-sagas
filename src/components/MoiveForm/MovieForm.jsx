import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './MovieForm.css'


const styles = theme => ({
    container: {
        display: 'grid',
        marginLeft: '50em',
        marginRight: '50em'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        backgroundColor: 'white',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
        backgroundColor: 'white'
    },
    button: {
        margin: theme.spacing.unit,
    },
});


class MovieForm extends Component {

    state = {
        newMovie: {
            title: '',
            poster: '',
            description: '',
            genre_id: ''
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_GENRE' })
    }

    handleCancel = () => {
        this.props.history.push('/');
        alert('Movie not submitted');
    }

    handleChange = (event, inputProperty) => {
        this.setState({
            newMovie: {
                ...this.state.newMovie,
                [inputProperty]: event.target.value
            },
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.dispatch({ type: 'ADD_MOVIE', payload: this.state.newMovie })
        this.props.history.push('/')
    }

    render() {
        const { classes } = this.props;
        const { title, poster, description, genre_id } = this.state.newMovie
        return (
            <div>
                <h2>Add a Movie to the Homepage!</h2>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit} >
                    <TextField
                        id="outlined-title"
                        label="Movie Title"
                        className={classes.textField}
                        value={title}
                        onChange={(event) => this.handleChange(event, 'title')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Movie Poster URL"
                        className={classes.textField}
                        value={poster}
                        onChange={(event) => this.handleChange(event, 'poster')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Movie Description"
                        rowsMax='10'
                        multiline
                        className={classes.textField}
                        value={description}
                        onChange={(event) => this.handleChange(event, 'description')}
                        margin="normal"
                        variant="outlined"
                    />
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel htmlFor="filled-genre-simple">Genres</InputLabel>
                        <Select
                            value={genre_id}
                            onChange={(event) => this.handleChange(event, 'genre_id')}
                            input={<FilledInput name="Genres" id="filled-genre-simple" />}
                        >
                            {this.props.genres.map(genre => {
                                return (
                                    <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>

                    <Button variant="contained" color="primary" type='submit' className={classes.button} >Submit Movie</Button>
                    <Button variant="contained" color="secondary" onClick={this.handleCancel} className={classes.button} >Cancel</Button>
                </form>
            </div >
        )
    }
}

const mapStateToProps = reduxState => ({
    genres: reduxState.genres
});

export default withStyles(styles)(connect(mapStateToProps)(MovieForm));