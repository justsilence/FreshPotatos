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
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
  movieInfo: {
    height: 600,
    position: 'relative',
    backgroundColor: theme.palette.grey[600],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(0),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    [theme.breakpoints.down('md')]: {
      height: 800,
    },
    [theme.breakpoints.down('sm')]: {
      height: 1000,
    },
    [theme.breakpoints.down('xs')]: {
      height: 1000,
    },
  },
  trailer: {
    align: 'right'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.8)',
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
  form: {
    margin: theme.spacing(4, 1, 1, 1),
    "& .MuiTextField-root": {
      margin: theme.spacing(1, 1, 1, 1),
      width: '100%',
    },
    alignItems: 'center',
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
  },
  addCommentIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2, 2, 2, 2),
  },
  addCommentTypography: {
    margin: theme.spacing(2, 2, 2, 2),
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
          contentRating: '',
          trailer: {
            description: '',
            url: '',
          }
        },
          review:[],
        },
      title: '',
      comments: '',
    }
    this.adminButton = this.adminButton.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
    this.addReview = this.addReview.bind(this);
    this.showMovieInfo = this.showMovieInfo.bind(this);
    this.showTrailer = this.showTrailer.bind(this);
    this.showAddComment = this.showAddComment.bind(this);
    this.showAllComments = this.showAllComments.bind(this);
  }

  componentDidMount(){
    fetch(this.state.fetchURL, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(movieInfo => {
      this.setState({movieInfoReview: movieInfo});
    });
  }

  showMovieInfo(){
    return (
      <Grid item md={4} key={1}>
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
    )
  }

  showTrailer(){
    if (this.state.movieInfoReview.movie.hasOwnProperty('trailer')){
      return (
        <Grid item key='movie-trailer'>
        <div className={this.props.classes.movieInfoContent}>
          <iframe
            title={this.state.movieInfoReview.movie.name}
            src={this.state.movieInfoReview.movie.trailer.url}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          >
          </iframe>
        </div>
      </Grid>
      )
    }else{ return }
  }

  showAddComment(){
    return (
      <Paper component="form" className={this.props.classes.form} noValidate autoComplete="off">
        <Typography variant='subtitle2' className={this.props.classes.addCommentTypography}>
          Comment:
        </Typography>
        <Grid container spacing={5}>
          <Grid item md={3}>
            <TextField
            id="review-title"
            label="Title"
            placeholder="Title"
            variant="outlined"
            onChange={(e) => {e.preventDefault(); this.setState({title: e.target.value})}}
            className={this.props.classes.addCommentField}
            required
            >
            </TextField>
          </Grid>
          <Grid item md={9}>
            <TextField
              id="review-content"
              label="Comment"
              placeholder="Comment"
              multiline
              variant="outlined"
              onChange={(e) => {e.preventDefault(); this.setState({comments: e.target.value})}}
              className={this.props.classes.addCommentField}
              required
            >
            </TextField>
          </Grid>
        </Grid>
        <IconButton
          className={this.props.classes.addCommentIcon}
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            if (window.sessionStorage.getItem('is_login')){
              this.addReview(this.state.movieInfoReview.movie._id, this.state.title, this.state.comments)
            }else{
              window.alert('Please login in to comment movie.')
            }
          }}
        >
          <ArrowForwardIcon/>
        </IconButton>
      </Paper>
    )
  }

  showAllComments(){
    return (
      <>
      <Typography variant='h4'>
        Reviews
      </Typography>
      <List className={this.props.classes.root}>
        {this.state.movieInfoReview.review.map((r) => {
          return (
            <div key={r._id}>
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
                {this.adminButton(r._id)}
              </ListItem>
              <Divider variant="fullWidth" component="li" />
            </div>
          )
        })}
      </List>
      </>
    )
  }

  addReview(movieId, reviewTitle, reviewContent){
    if (reviewTitle === '' || reviewContent === ''){
      window.alert('Please input title or comment')
    }else{
      fetch('https://web-final-demo.azurewebsites.net/api/movie/'+movieId, {
        method: 'POST',
        body: JSON.stringify({'title': reviewTitle, 'content': reviewContent}),
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('token')
        })
      })
      .then(res => res.json())
      .then(res => {window.alert(res.message); window.location.reload(true)})
    }
  }

  deleteReview(movie_id){
    fetch('https://web-final-demo.azurewebsites.net/api/movie/' + movie_id, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      })
    })
    .then(res => window.location.reload(true))
  }

  adminButton(movie_id){
    if (!window.sessionStorage.getItem('is_login') === 'true'){ return }
    if (window.sessionStorage.getItem('is_admin') === 'true'){
      return (
        <ListItemSecondaryAction key='button'>
          <IconButton onClick={(e) => {e.preventDefault(); this.deleteReview(movie_id)}} edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )
    }else{ return }
  }

  render() {
    return (
      <Grid>
        {/* movie information section */}
        <Grid item md={12}>
          <Paper className={this.props.classes.movieInfo} style={{ backgroundImage: `url(${this.state.movieInfoReview.movie.image})` }}>
            <div className={this.props.classes.overlay} />
            <Grid container>
              {/* movie information */}
              {this.showMovieInfo()}
              {/* movie trailer */}
              {this.showTrailer()}
            </Grid>
          </Paper>
        </Grid>

        {/* user comments section */}
        <Grid item md={12}>
          <Paper>
            <Grid container>
              <Grid item md={12}>
                {/* add comment section */}
                {this.showAddComment()}
                {/* all user comments */}
                {this.showAllComments()}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
      </Grid>
    );
  }
  
}

// use Hook to wrap styles classes with MovieDetail component
export default function Hook(props) {
  const classes = useStyles();
  return <MovieDetail classes={classes} routerProps={props}>Hook</MovieDetail>;
}