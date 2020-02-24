import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Transit from './components/transit'

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Route exact path="/" component={Transit} />
      </Router>
    </div>
  );
}

export default App;
