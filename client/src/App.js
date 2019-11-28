import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import MovieModify from './components/MovieModify';
import Register from './components/Register';

import {BrowserRouter,Route,Switch} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/detail" component={MovieDetail}/>
          <Route path="/list" component={MovieList}/>
          <Route path="/modify" component={MovieModify}/>
          <Route path="/register" component={Register}/>
        </Switch>
      </div>
      </BrowserRouter>
  );
}

export default App;
