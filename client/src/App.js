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
  name: 'Terminator 2: Judgment Day',
  image: 'https://images-na.ssl-images-amazon.com/images/I/613nOicuzxL._SL1000_.jpg',
  genre: [
    "Action",
    "Sci-Fi"
  ],
  actor: [
    "Arnold Schwarzenegger",
    "Linda Hamilton",
    "Edward Furlong",
    "Robert Patrick"
  ],
  director: ['James Cameron'],
  description: "Terminator 2: Judgment Day is a movie starring Arnold Schwarzenegger, Linda Hamilton, and Edward Furlong. A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her teenage son, John Connor, from a more...",
  datePublished: '1991-07-03',
  rating: 8.5,
  duration: 'PT2H17M',
  trailer: 'trailer',
  contentRating: 'R',
  review: [{
    "userName": "gabriellasofia123",
    "title": "Lagaan Once Upon A Time In India",
    "content": "This  movie not only opened my eyes to the beatuies of india but also the hearts of India. I fell in love with this movie at once and I feel very close to all of the characters I know them and feel for them. The dancing and singing made my heart pound and my heart overwhelmed by the matchless beauty and I was imagining myself following along with Gauri. I love this story and I could watch it daily and never tire of the beauty it holds. I have always loved indian people and the culture which they live, I am American and have never visited India,soon I will visit in person and dreams of going there will no longer tug at me . I hope to one day perform the dances as well as those in the movie.   I really loved that in the movie the characters were faced with such hardship but somehow they were of cheer and sang together and lifted one anothers spirits.I love this movie some may tire of its length but I wish it would continue forever. I want to be a part of it."
  },{
    "userName": "gabriellasofia412",
    "title": "Lagaan Once Upon A Time In India",
    "content": "This  movie not only opened my eyes to the beatuies of india but also the hearts of India. I fell in love with this movie at once and I feel very close to all of the characters I know them and feel for them. The dancing and singing made my heart pound and my heart overwhelmed by the matchless beauty and I was imagining myself following along with Gauri. I love this story and I could watch it daily and never tire of the beauty it holds. I have always loved indian people and the culture which they live, I am American and have never visited India,soon I will visit in person and dreams of going there will no longer tug at me . I hope to one day perform the dances as well as those in the movie.   I really loved that in the movie the characters were faced with such hardship but somehow they were of cheer and sang together and lifted one anothers spirits.I love this movie some may tire of its length but I wish it would continue forever. I want to be a part of it."
  },]
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/detail/:id" component={MovieDetail} />
          <Route path="/list" component={() => <MovieList fetchURL='https://web-final-demo.azurewebsites.net/api/index'/>}/>
          <Route path="/modify" component={MovieModify}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
        </Switch>
      </div>
      </BrowserRouter>
  );
}

export default App;
