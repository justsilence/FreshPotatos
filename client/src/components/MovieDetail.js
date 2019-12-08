import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

// set 'is_admin' to check if a admin is login
localStorage.setItem('is_admin', true);

const useStyles = makeStyles(theme => ({
  movieInfo: {
    height: 800,
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
  },
  movieInfoContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  block: {
    display: 'block',
  },
}));

class MovieDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      fetchURL: 'https://web-final-demo.azurewebsites.net/api/movie/'+this.props.routerProps.match.params.id,
      movieInfoReview: {
        movie:{
          genre:[],
          actor:[],
          director:[],
          _id: '',
          name:'',
          image:'',
          description:'',
          datePublished:'',
          rating: 0,
          duration: '',
          contentRating: ''},
          review:[]}
    }
    this.adminButton = this.adminButton.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
  }

  componentDidMount(){
    // mount the date fetch from the specific URL
    fetch(this.state.fetchURL, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(movieInfoReview => this.setState({movieInfoReview: movieInfoReview}));
  }

  deleteReview(id){
    console.log(id);
    fetch('https://web-final-demo.azurewebsites.net/api/movie/' + id, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZGU0MTVjOGJlMTVmMjBjOTE1ZThkMjAiLCJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwiaWF0IjoxNTc1NzY0MzA3LCJleHAiOjE1NzU3Njc5MDd9.QUBYYX2HaS1GdBpjGKJUV7kRsgSsWILC3SYl36XiTS4"
      })
    })
    .then(res => window.location.reload(true))
  }

  adminButton(is_admin, id){
    if (is_admin){
      return (
        <ListItemSecondaryAction key='button'>
          <IconButton onClick={(e) => {e.preventDefault(); this.deleteReview(id)}} edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )
    }else{ return }
  }


  render() {
    return (
      <div>
        {/* movie information section */}
        <Paper className={this.props.classes.movieInfo} style={{ backgroundImage: `url(${this.state.movieInfoReview.movie.image})` }}>
          {/* Increase the priority of the hero background image */}
          <div className={this.props.classes.overlay} />
          <Grid container>
            <Grid item md={6}>
              <div className={this.props.classes.movieInfoContent}>
                <Typography align='left' component="h1" variant="h3" color="inherit" gutterBottom>
                  {this.state.movieInfoReview.movie.name}
                </Typography>
                <Typography align='left' variant="subtitle1" color="inherit" paragraph>
                  {'Genre:  ' + this.state.movieInfoReview.movie.genre.join(', ')}
                </Typography>
                <Typography align='left' variant="subtitle1" color="inherit" paragraph>
                  {'Actors:  ' + this.state.movieInfoReview.movie.actor.join(', ')}
                </Typography>
                <Typography align='left' variant="subtitle1" color="inherit" paragraph>
                  {'Directors:  ' + this.state.movieInfoReview.movie.director.join(', ')}
                </Typography>
                <Typography align='left' variant="subtitle1" color="inherit" paragraph>
                  {'PublishedDate:  ' + this.state.movieInfoReview.movie.datePublished}
                </Typography>
                <Typography align='left' variant="subtitle1" color="inherit" paragraph>
                  {this.state.movieInfoReview.movie.description}
                </Typography>
                <Typography align='left' variant="subtitle1" color="inherit" paragraph>
                  {'Rate:  ' + this.state.movieInfoReview.movie.rating}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Paper>
        {/* user comments section */}
        <Paper>
          <Grid container>
            <Grid item md={12}>
              <Typography variant='h4'>
                Reviews:
              </Typography>
              <List className={this.props.classes.root}>
                {this.state.movieInfoReview.review.map((r) => {
                  return (
                    <div key={r.movie_id}>
                      <ListItem alignItems='flex-start'>
                        <ListItemText
                          primary={
                            <Typography variant='h6'>
                              {r.title}
                            </Typography>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                component='span'
                                variant='button'
                                className={this.props.classes.block}
                                color='textPrimary'
                              >
                              {r.userName}
                              </Typography>
                              {r.content}
                            </React.Fragment>
                          }
                        />
                        {this.adminButton(localStorage.getItem('is_admin'), r._id)}
                      </ListItem>
                      <Divider variant="fullWidth" component="li" />
                    </div>
                  )
                })}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
  
}

export default function Hook(props) {
  const classes = useStyles();
  return <MovieDetail classes={classes} routerProps={props}>Hook</MovieDetail>;
}