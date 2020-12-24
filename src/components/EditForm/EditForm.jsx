import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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


class EditForm extends Component {

    state = {
        editMovie: {
            id: this.props.details[0]?.id,
            title: this.props.details[0]?.title,
            description: this.props.details[0]?.description,
        }
    }

    handleCancel = (event, id) => {
        this.props.history.push(`/details/${id}`);
        alert('Movie not Updated');
    }

    handleChange = (event, inputProperty) => {
        this.setState({
            editMovie: {
                ...this.state.editMovie,
                [inputProperty]: event.target.value
            },
        });
    }

    handleSubmit = (event, id) => {
        event.preventDefault()
        this.props.dispatch({ type: 'UPDATE_MOVIE', payload: this.state.editMovie })
        this.props.dispatch({ type: 'FETCH_DETAIL', payload: id })
        this.props.history.push(`/details/${id}`)
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <h2>Edit your movie</h2>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={(e) => this.handleSubmit(e, this.props.details[0]?.id)} >
                    <TextField
                        id="outlined-title"
                        label="Movie Title"
                        className={classes.textField}
                        value={this.state.editMovie.title}
                        onChange={(event) => this.handleChange(event, 'title')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Movie Description"
                        rowsMax='10'
                        multiline
                        className={classes.textField}
                        value={this.state.editMovie.description}
                        onChange={(event) => this.handleChange(event, 'description')}
                        margin="normal"
                        variant="outlined"
                    />

                    <Button variant="contained" color="primary" type='submit' className={classes.button}>Save</Button>
                    <Button variant="contained" color="secondary" onClick={(event) => this.handleCancel(event, this.props.details[0]?.id)} className={classes.button}>Cancel</Button>
                </form>
            </div >
        )
    }
}

const mapStateToProps = reduxState => ({
    genres: reduxState.genres,
    details: reduxState.details
});

export default withStyles(styles)(connect(mapStateToProps)(EditForm));