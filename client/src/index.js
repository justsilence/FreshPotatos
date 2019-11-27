import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/Home';
import MovieList from './components/MovieList';
import * as serviceWorker from './serviceWorker';



ReactDOM.render(<MovieList texts={['movie1', 'movie2', 'movie3']}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
