import React, { Component } from 'react'
//import { Route, Switch } from 'react-router'
import Home from './layouts/Home'
import Users from './layouts/Users'
import Farms from './layouts/Farms'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  render() {
    return (

      <Router>
        <div className="App">
        <Route exact path="/" component={Home}/>
        <Route exact path="/users/:address" component={Users} />
        <Route exact path="/farm" component={Farms} />
        </div>

      </Router>
    );
  }
}

export default App
