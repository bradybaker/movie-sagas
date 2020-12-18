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

const styles = {
    card: {
        maxWidth: 345,
        marginLeft: 40,
        marginRight: 200,
        marginBottom: 50,
    },
    media: {
        height: 400,
    },
};

class MovieCard extends Component {
    render() {
        const classes = this.props.classes
        return (
            <div>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={this.props.movie.poster}
                            title={this.props.movie.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.movie.title}
                            </Typography>
                            <Typography component="h4">
                                {this.props.movie.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {/* TODO - still need to add to add the name of the menu item to the moviesName so it can add to the state */}
                        <Button className='button' size="small" color="primary">
                            Go to Details
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(connect()(MovieCard));