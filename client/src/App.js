import React, { useState }  from 'react';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App(props) {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/detail/:id" component={MovieDetail} />
          <Route path='/list' component={() => <MovieList fetchURL='https://web-final-demo.azurewebsites.net/api/index'/>}/>
          <Route path='/search' component={MovieList}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/profile" component={Profile}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
