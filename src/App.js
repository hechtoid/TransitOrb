import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Transit from './components/transit';
import AnyStopWildCard from './components/anyStopWildCard';
import Vehicular from './components/vehicular'

import AA from './components/aa';

function App() {
  let [pane, setPane] = useState('user');

  return (
    
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
      <div className="transit-master">
      <div className="transit-switcher">
        <div className="busemoji">
            <Link to= "/vehicular" >
            <span title="Vehicle Tracker" role="img" aria-label="bus emoji">🚌</span>
            </Link>
        </div>
        <div className={
          pane === 'frisco' 
          ? 'transit-switch-on' 
          : 'transit-switch-off'
          } onClick={() => setPane('frisco')}>Commuter</div>
        <div id='marin' className={
          pane === 'marin' 
          ? 'transit-switch-on' 
          : 'transit-switch-off'} onClick={() => setPane('marin')}>Weekender</div>
        <div className={
          pane === 'user' 
          ? 'transit-switch-on' 
          : 'transit-switch-off'} onClick={() => setPane('user')}>Anywherer</div>
        <div className="five-eleven">
          <a href="https://511.org/open-data/transit" title="powered by 511 open data" target="_blank" rel="noopener noreferrer">
            <img className="five-eleven" src="https://proxy-prod.511.org/assets/img/branding/511_original_web.png" alt="511 logo">
            </img>
          </a>
        </div>
      </div>
        <Route exact path="/" component={Transit} />
        <Route exact path="/vehicular" component={Vehicular} />
        <Route path="/anystop/:agency/:stop" render={(props) => (
        <AnyStopWildCard {...props} /> )}
      />
        <Route exact path="/aa" component={AA} />

    </div>
    </div>
      </Router>
  );
}

export default App;
