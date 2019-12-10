import React, { Component } from 'react';
import '../css/Home.css';
import { Slide } from 'react-slideshow-image';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


import { Button } from '@material-ui/core';
 
const useStyles = makeStyles(theme => ({
  topMovies: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 650,
  },
  genreIconButton: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  button: {
    marginRight: theme.spacing(0),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: theme.spacing(1),
    border: theme.spacing(0),
    color: 'white',
    height: theme.spacing(5),
    width: theme.spacing(5)*4,
    padding: theme.spacing(1, 5, 1, 5),
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
}));

const slideProperties = {
  duration: 1000000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
}

class Home extends Component{

  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      movies: [],
      top: []
    }
    this.showTrailerSlider = this.showTrailerSlider.bind(this);
    this.showTopMovies = this.showTopMovies.bind(this);
    this.showAllGenres = this.showAllGenres.bind(this);
  }

  showTrailerSlider(){
    return (
      <div className="slide-container">
        <Slide {...slideProperties}>
          {this.state.movies.map(movie => (
            <div key={movie.id}>
            <iframe title={movie.id} src={movie.trailerURL}allowFullScreen></iframe>
          <h2>{movie.name}</h2>
            <br/> 
            <Button className={this.props.classes.button} onClick = {(e)=>{e.preventDefault(); window.location.href=('/detail/'+movie.id)}}>Detail</Button>
            </div>
          ))}
        </Slide>
      </div>
    )
  }

  showTopMovies(){
    return (
      <GridList cellHeight={230} className={this.props.classes.gridList}>
        <GridListTile key="Header" cols={2} style={{ height: 70 }}>
          <h2 component="div">Top10</h2>
        </GridListTile>
        {this.state.top.map(m => (
          <GridListTile key={m.img} >
              <img src={m.img} alt={m.name} onClick ={(e) => {e.preventDefault(); window.location.href=('/detail/'+m.id)}}/>
              <GridListTileBar
              title={m.name}
              subtitle={<span>rating: {m.rating}</span>}
              actionIcon={
                <IconButton 
                  aria-label={`info about ${m.name}`}
                  onClick ={(e) => {e.preventDefault(); window.location.href=('/detail/'+m.id)}}
                  className={this.props.classes.genreIconButton}
                >
                  <InfoIcon />
                </IconButton>
              }/>
        </GridListTile>
        ))}
      </GridList>
    )
  }

  showAllGenres(){
    return (
      <GridList cellHeight={50} className={this.props.classes.gridList}>
        <GridListTile key="Header" cols={2} style={{ height: 70 }}>
          <h2 component="div">Search By Genre</h2>
        </GridListTile>
        {this.state.genres.map(genre => (
          <GridListTile key={genre} style={{ height: 50 }}>
            {<Button className={this.props.classes.button}  onClick ={(e) => {e.preventDefault(); window.location.href=('/search?genre='+genre)}} >
              {genre}
            </Button>}
          </GridListTile>
        ))}
      </GridList>
    )
  }

  componentDidMount(){
    // fetch all movie genres (used for all movie genres section)
    const fetchGenreURL = 'https://web-final-demo.azurewebsites.net/api/index';
    fetch(fetchGenreURL, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(res => res['genres'])
    .then(genres => this.setState({genres: genres}));

    // fetch top 3 movies information (used for movie trailer section)
    const fetchTrailerURL = 'https://web-final-demo.azurewebsites.net/api/movie/top';
    fetch(fetchTrailerURL,{
      method : 'GET',
      headers: new Headers({
        'Content-type':'application/json'
      })
    })
      .then(res => res.json())
      .then(res => res['movies'])
      .then(movies => movies.map(m => {return {'id': m._id,  'name': m.name, 'trailerURL': m.trailer.url}}))
      .then(res => {this.setState({movies: res})});

      // fetch top 10 movies information (used for to 10 movies section)
      const fetchTopURL = 'https://web-final-demo.azurewebsites.net/api/movie/top?n=10';
      fetch(fetchTopURL,{
        method : 'GET',
        headers: new Headers({
          'Content-type':'application/json'
        })
      })
      .then(res => res.json())
      .then(res => res['movies'])
      .then(top => top.map(m => {return {'id': m._id, 'name': m.name, 'img':m.image,'rating':m.rating}}))
      .then(res => {this.setState({top: res})});
     
    }

    render() {
        return (
          <div><br/>
            {/* trailer slider section */}
            {this.showTrailerSlider()}<br/>
            <div className={this.props.classes.topMovies}>
              {/* Top 10 movies section */}
              {this.showTopMovies()}
              {/* movie genres section */}
              {this.showAllGenres()}
            </div>
          </div>
      );
  }
}

// use Hook to wrap styles classes with Home component
export default function Hook(props) {
  const classes = useStyles();
  return <Home classes={classes} routerProps={props}>Hook</Home>;
}