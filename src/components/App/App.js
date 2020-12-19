import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Details from '../Details/Details';
import Home from '../Home/Home';
import MovieForm from '../MoiveForm/MovieForm';
import './App.css';

class App extends Component {
  // Renders the entire app on the DOM


  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path='/' component={Home} />
          <Route path='/movieForm' component={MovieForm} />
          <Route path='/details/:id' component={Details} />
        </Router>
      </div>
    );
  }
}

export default App;
