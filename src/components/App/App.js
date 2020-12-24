import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Details from '../Details/Details';
import EditForm from '../EditForm/EditForm';
import Header from '../Header/Header';
import Home from '../Home/Home';
import MovieForm from '../MoiveForm/MovieForm';
import './App.css';

class App extends Component {
  // Renders the entire app on the DOM


  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <nav>
            <ul>
              <li><Link to='/'>Movie List</Link></li>
              <li><Link to='/movieForm'>Add a Movie!</Link></li>
            </ul>
          </nav>
          <Route exact path='/' component={Home} />
          <Route path='/movieForm' component={MovieForm} />
          <Route path='/details/:id' component={Details} />
          <Route path='/editForm/:id' component={EditForm} />
        </Router>
      </div>
    );
  }
}

export default App;
