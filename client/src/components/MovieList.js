import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UpdateIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MovieIcon from '@material-ui/icons/Movie';
import { useAuth } from "../context/auth";


// self defined styles
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

class MovieList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    }
  }

  componentDidMount(){
    // mount the date fetch from the specific URL
    fetch(this.props.fetchURL, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(res => res['movies'])
    .then(movies => movies.map((movie) => {return {'name': movie.name, 'id': movie._id}}))
    .then(movies => this.setState({movies: movies}));
  }

  render(){
    console.log(authTokens);
    return (
      <div className={this.props.classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" className={this.props.classes.title}>
              Movie List
            </Typography>
            <div className={this.props.classes.demo}>
              <List>
                {this.state.movies.map(movie => (
                  <ListItem key={movie.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <MovieIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={movie.name} />
                    <ListItemSecondaryAction>
                      <IconButton href={'/detail/'+ movie.id} edge="start" aria-label="update">
                        <UpdateIcon />
                      </IconButton>
                      <IconButton onClick={() => {window.alert("delete")}} edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default function Hook(props) {
  const classes = useStyles();
  const { authTokens } = useAuth();
  return <MovieList classes={classes} authTokens={authTokens} fetchURL={props.fetchURL}>Hook</MovieList>;
}