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

const styles = theme => ({
    container: {
        display: 'grid',
        flexWrap: 'wrap',
        marginLeft: 400,
        marginRight: 400
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit * 3,
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
            genre: ''
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_GENRE' })
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
    }

    render() {
        const { classes } = this.props;
        const { title, poster, description, genre } = this.state.newMovie
        console.log('This is reduxState', this.props.genres)
        return (
            <div>
                {JSON.stringify(this.state.newMovie)}
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
                        id="outlined-name"
                        label="Movie Description"
                        className={classes.textField}
                        value={description}
                        onChange={(event) => this.handleChange(event, 'description')}
                        margin="normal"
                        variant="outlined"
                    />
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel htmlFor="filled-genre-simple">Genre</InputLabel>
                        <Select
                            value={genre}
                            onChange={(event) => this.handleChange(event, 'genre')}
                            input={<FilledInput name="Genre" id="filled-genre-simple" />}
                        >
                            {this.props.genres.map(genre => {
                                return (
                                    <MenuItem key={genre.id} value={genre.name}>{genre.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" type='submit' className={classes.button} >Submit Movie</Button>
                </form>
            </div >
        )
    }
}

const mapStateToProps = reduxState => ({
    genres: reduxState.genres
});

export default withStyles(styles)(connect(mapStateToProps)(MovieForm));