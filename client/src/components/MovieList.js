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
import ArrowRight from '@material-ui/icons/ArrowRight';
// import MovieIcon from '@material-ui/icons/Movie';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import InfoIcon from '@material-ui/icons/Info';

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
  gridroot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 700,
    height: 1000,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
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
    var fetchURL = '';
    console.log('this.props');
    console.log(this.props.routerProps.fetchURL);
    if (this.props.routerProps.fetchURL){
      fetchURL = this.props.routerProps.fetchURL;
      fetch(fetchURL, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(res => res.json())
      .then(res => res['movies'])
      .then(movies => movies.map((movie) => {return {'name': movie.name, 'id': movie._id, 'image': movie.image,'rating':movie.rating}}))
      .then(movies => this.setState({movies: movies}));
    }else{
      fetchURL = 'https://web-final-demo.azurewebsites.net/api/movie/search' + this.props.routerProps.location.search;
      fetch(fetchURL, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(res => res.json())
      .then(res => res['result'])
      .then(movies => movies.map((movie) => {return {'name': movie.name, 'id': movie._id, 'image': movie.image,'rating':movie.rating}}))
      .then(movies => this.setState({movies: movies}));
    }
  }

  render(){
    return (
      <div>
      <div className={this.props.classes.gridroot}>
              <GridList cellHeight={300} className={this.props.classes.gridList}>
                <GridListTile key="Header" cols={2} style={{ height: 70 }}>
                  <h2 component="div">What we found</h2>
                </GridListTile>
                {this.state.movies.map(m => (
                  <GridListTile key={m.img} >
                     <img src={m.image} alt={m.name} />
                     <GridListTileBar
                      title={m.name}
              subtitle={<span>rating: {m.rating}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${m.name}`}  onClick ={(e) => {e.preventDefault(); window.location.href=('/detail/'+m.id)}} className={this.props.classes.icon}>
                  <InfoIcon />
                </IconButton>
              }/>
                </GridListTile>
                ))}
              </GridList>
            </div>
      {/* <div className={this.props.classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" className={this.props.classes.title}/>
            <div className={this.props.classes.demo}>
              <List>
                {this.state.movies.map(movie => (
                  <ListItem key={movie.id}>
                    <ListItemAvatar>
                      <Avatar alt={movie.name} src={movie.image} />
                    </ListItemAvatar>
                    <ListItemText primary={movie.name} />
                    <ListItemSecondaryAction>
                      <IconButton href={'/detail/'+ movie.id} edge="start" aria-label="update">
                        <ArrowRight />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                }
              </List>
            </div>
          </Grid>
        </Grid>
      </div> */}
      </div>
    );
  }
}

export default function Hook(props) {
  const classes = useStyles();
  return <MovieList classes={classes} routerProps={props}>Hook</MovieList>;  
}