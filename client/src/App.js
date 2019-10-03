import React from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import LandingPage from './Components/LandingPage';
import Login from './Components/Editorial/Login';
import Editorial from './Components/Editorial';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/editorial" exact component={Editorial} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
