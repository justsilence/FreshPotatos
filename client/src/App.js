import React from 'react';
import './App.css';
import Home from './components/Home';
import Navbar from './components/navbar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import MovieModify from './components/movieModify';
import Register from './components/register';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/detail" component={MovieDetail}/>
          <Route path="/list" component={() => <MovieList  texts={['movie1', 'movie2', 'movie3', 'for the sake of demo, dummy movies are there']} />}/>
          <Route path="/modify" component={MovieModify}/>
          <Route path="/register" component={Register}/>
        </Switch>
      </div>
      </BrowserRouter>
  );
}

export default App;
