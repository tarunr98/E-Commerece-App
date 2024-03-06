import './App.css';
import React, { Component } from 'react';
import { LoginPage , UserPage , Cart , Buy } from './Components';
import {BrowserRouter as Router , Switch, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';



class App extends Component {

  render(){
    return (
      <Router>
      <div className="App"> 
        <Routes>
          <Route exact path = '/' component = {LoginPage} />
          <Route exact path = '/user' component = {UserPage} />
          <Route exact path = '/cart'  component = {Cart} />
          <Route exact path = '/checkOut'  component = {Buy} />
        </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
