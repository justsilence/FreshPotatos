import React from 'react';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import MovieModify from './components/MovieModify';
import Login from './components/Login';
import Signup from './components/Signup';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const movieInfo = {
  name: 'name',
  image: 'https://images-na.ssl-images-amazon.com/images/I/613nOicuzxL._SL1000_.jpg',
  genre: ['genre'],
  actor: ['actor'],
  director: ['director'],
  description: 'description',
  datePublished: 'datePublished',
  rating: 5,
  duration: 'duration',
  trailer: 'trailer'
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/detail" component={() => <MovieDetail movieInfo={movieInfo} />} />
          <Route path="/list" component={() => <MovieList  texts={['movie1', 'movie2', 'movie3', 'for the sake of demo, dummy movies are there']} />}/>
          <Route path="/modify" component={MovieModify}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
        </Switch>
      </div>
      </BrowserRouter>
  );
}

export default App;
