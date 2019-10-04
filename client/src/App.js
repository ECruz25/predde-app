import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage';
import Editorial from './Components/Editorial';
import NotFoundPage from './Components/NotFoundPage';
import CompleteOrder from './Components/Editorial/CompleteOrder';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/editorial" exact component={Editorial} />
          <Route
            path="/editorial/completar-orden"
            exact
            component={CompleteOrder}
          />
          <Route path="*" exact component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
