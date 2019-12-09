import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
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
    this.showMovies = this.showMovies.bind(this);
  }

  showMovies(movies){
    if (movies.length === 0) {
      return (<Typography variant="h6">Sorry, no movie found.</Typography>)
    }else{
      return (
        movies.map(m => (
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
            ))
            )
    }
  }

  componentDidMount(){
    // mount the date fetch from the specific URL
    var fetchURL = '';
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
              <GridList cellHeight={370} className={this.props.classes.gridList}>
                <GridListTile key="Header" cols={2} style={{ height: 0 }}>
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
                {this.state.movies.length === 0?(<Typography variant="h6">Sorry, no movie found.</Typography>):(<div></div>)}
              </GridList>
            </div>
      </div>
    );
  }
}

export default function Hook(props) {
  const classes = useStyles();
  return <MovieList classes={classes} routerProps={props}>Hook</MovieList>;  
}