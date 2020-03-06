import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import TransitStop from './components/transitstop';
import TransitHeader from './components/transitheader';
import Vehicular from './components/vehicular'
import AnyStop from './components/anyStop';
import AnyStopWildCard from './components/anyStopWildCard';

import AA from './components/aa';
import DA from './components/da';

function App(props) {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
      <div className="transit-master">
      <TransitHeader />
      <div className="transit-switcher">
      <div className="transit">
      <Route exact path="/">
        <Redirect to="/anywherer" />
      </Route>
        <Route exact path="/anywherer" component={TransitStop} />
        <Route exact path="/vehicular" component={Vehicular} />
        <Route exact path="/weekender">
            <AnyStop agency="GG" stop="42006" />
            <AnyStop agency="GG" stop="40032" />
        </Route>
        <Route exact path="/commuter">
            <AnyStop agency="SF" stop="16513" filterOUT={['8','8BX']} />
            <AnyStop agency="SF" stop="16750" filterIN={['45']} title="Across from Mario's"/>
            <AnyStop agency="SF" stop="13082" />
        </Route>
        <Route exact path="/multi">

            <AnyStop agency="SF" stop="16513" />
            <AnyStop agency="SF" stop="16513" />
            <AnyStop agency="SF" stop="16513" />
            <AnyStop agency="SF" stop="16513" />
            <AnyStop agency="SF" stop="16513" />
            <AnyStop agency="SF" stop="16513" />
            
        </Route>
        <Route path="/anystop/:agency/:stop" render={(props) => (
        <AnyStopWildCard {...props} /> )}
      />
        <Route exact path="/aa" component={AA} />
        <Route exact path="/da" component={DA} />

    </div>
    </div>
    </div>
    </div>
    </Router>
  );
}

export default App;
