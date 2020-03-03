import React, { useState } from 'react';
import AnyStop from './anyStop';
import TransitStop from './transitstop';
import { Link } from 'react-router-dom';



function Transit() {
  let [pane, setPane] = useState('user');
  document.title="transitYourself"
  return (
    <div className="transit-master">
      <div className="transit-switcher">
        <div className="busemoji">
          <Link to={{
            pathname: "/vehicular", 
            state: {
              vehicleNumber:"8612"
              }
              }} >
            <span role="img" aria-label="bus emoji">🚌</span>
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
      <div className="transit">
          <div className={pane === 'marin' ? 'transit-on' : 'transit-off'} >
            <br></br>
            {pane === 'marin' 
            ? <>
            <AnyStop agency="GG" stop="42006" />
            <AnyStop title="Van Sess" agency="GG" stop="40032" />
            </> 
            : ''}
          </div>
          <div className={pane === 'frisco' ? 'transit-on' : 'transit-off'}>
          <br></br>
            {pane === 'frisco' 
            ? <>
            <AnyStop agency="SF" stop="16513" />
            <AnyStop agency="SF" stop="16750" />
            <AnyStop title="BroadWay" agency="SF" stop="13082" />
            </>
            : ''}
          </div> 
          <div className={pane === 'user' ? 'transit-on' : 'transit-off'}>
            <TransitStop />
          </div>
      </div>
    </div>
  );
}

export default Transit;
