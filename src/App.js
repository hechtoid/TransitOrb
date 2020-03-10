import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import TransitSearch from './components/transitsearch';
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
          <Redirect to="/saved" />
        </Route>
                        
        <Route exact path="/saved">
          <div>
            <AnyStop agency='SF' stopCode='16513' limit="2" filterOUT={['8','8BX']} />
            <AnyStop agency="SF" stopCode="13082" limit="4"/>
          </div>
            <AnyStop agency='BA' stopCode='EMBR' limit="9" />
          <div>
            <AnyStop title="frisco train" agency='CT' stopCode='70012' />
            <AnyStop title='CalTrain MillBrae' agency='CT' stopCode='70062' />
          </div>
          <div>
            <AnyStop agency="GG" stopCode="42006" filterIN={['4']} />
            <AnyStop agency="SF" stopCode="16750" limit="2" filterIN={['45']} title="Across from Mario's" />
          </div>
        </Route>

        <Route exact path="/vehicular" component={Vehicular} />

        <Route path="/anystop/:agency?/:stopCode?" render={(props) => <AnyStopWildCard {...props} /> }/>

        <Route exact path="/cookies">
            <div className="bus">COMING SOON</div>
        </Route>

        <TransitSearch />

        <Route exact path="/aa" component={AA} />
        <Route exact path="/da" component={DA} />

        <Route exact path="/weekender">
            <AnyStop agency="GG" stopCode="42006" filterIN={['4']} />
            <AnyStop agency="GG" stopCode="40032" />
        </Route>
        <Route exact path="/commuter">
            <AnyStop agency="SF" stopCode="16513" filterOUT={['8','8BX']} />
            <AnyStop agency="SF" stopCode="16750" filterIN={['45']} title="Across from Mario's" />
            <AnyStop agency="SF" stopCode="13082" />
        </Route>
      </div>
      </div>
      <div className="five-eleven">
        <div>
          <a href="https://511.org/open-data/transit" title="Powered by 511 Open Data" target="_blank" rel="noopener noreferrer">
            <img className="five-eleven" src="https://proxy-prod.511.org/assets/img/branding/511_original_web.png" alt="511 logo"></img>
          </a>
        </div>
        <span>Powered by 511 Open Data</span>
      </div>
    </div>
    </div>
    </Router>
  );
}

export default App;
