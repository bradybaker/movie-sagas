import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom'

const styles = {
    card: {
        maxWidth: 500,
        marginLeft: 40,
        marginRight: 200,
        marginBottom: 50,
    },
    media: {
        height: 500,
        width: 346,
        justifyContent: 'center'
    },
};

class MovieCard extends Component {

    goToDetails = (event, id) => {
        console.log('This is the movie ID I am clicking on', id)
        this.props.dispatch({ type: 'FETCH_DETAIL', payload: id })
        this.props.history.push(`/details/${id}`)
    }

    render() {
        const classes = this.props.classes
        const { id, poster, title } = this.props.movie
        return (
            <div>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={poster}
                            title={title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {title}
                            </Typography>
                            {/* <Typography component="h4">
                                {this.props.movie.description}
                            </Typography> */}
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button onClick={(event) => this.goToDetails(event, id)} className='button' size="small" color="primary">
                            Go to Details
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(connect()(MovieCard)));