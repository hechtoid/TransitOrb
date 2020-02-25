import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Transit from './components/transit';
import AnyStopWildCard from './components/anyStopWildCard';
import AA from './components/aa';

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Route exact path="/" component={Transit} />
        <Route path="/anystop/:agency/:stop" render={(props) => (
        <AnyStopWildCard {...props} /> )}
      />
        <Route exact path="/aa" component={AA} />

      </Router>
    </div>
  );
}

export default App;
