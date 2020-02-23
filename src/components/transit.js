import React, { useState } from 'react';
import Union from './union';
import Stockton from './stockton';
import Sansome from './sansome';
import VanNess from './vanNess';
import Broadway from './broadway';
import TransitStop from './transitstop';

function Transit() {
  let [pane, setPane] = useState('user');
  document.title="transitYourself"
  return (
    <div className="transit-master">
      <div className="transit-switcher">
        <div className="busemoji">
          <a href="https://github.com/hechtoid/transitYourself" target="_blank">
            🚌
          </a>
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
          <a href="https://511.org/open-data/transit" target="_blank" title="powered by 511 open data">
            <img className="five-eleven" src="http://proxy-prod.511.org/assets/img/branding/511_original_web.png">
            </img>
          </a>
        </div>
      </div>
      <div className="transit">
          <div className={pane === 'marin' ? 'transit-on' : 'transit-off'} >
            <br></br>
            {pane === 'marin' ? <><Sansome /> <VanNess /></> : ''}
          </div>
          <div className={pane === 'frisco' ? 'transit-on' : 'transit-off'}>
          <br></br>
            {pane === 'frisco' ? <><Stockton /> <Union /> <Broadway /> </>: ''}
          </div> 
          <div className={pane === 'user' ? 'transit-on' : 'transit-off'}>
            <TransitStop />
          </div>
      </div>
    </div>
  );
}

export default Transit;
