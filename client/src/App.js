import React from 'react';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import MovieModify from './components/MovieModify';
import Register from './components/Register';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://images-na.ssl-images-amazon.com/images/I/613nOicuzxL._SL1000_.jpg',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/detail" component={() => <MovieDetail post={mainFeaturedPost} />} />
          <Route path="/list" component={() => <MovieList  texts={['movie1', 'movie2', 'movie3', 'for the sake of demo, dummy movies are there']} />}/>
          <Route path="/modify" component={MovieModify}/>
          <Route path="/register" component={Register}/>
        </Switch>
      </div>
      </BrowserRouter>
  );
}

export default App;
