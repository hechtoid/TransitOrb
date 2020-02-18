import React, { useState } from 'react';
import Union from './union';
import Stockton from './stockton';
import Sansome from './sansome';
import VanNess from './vanNess';
import Broadway from './broadway';
import TransitStop from './transitstop';

function Transit() {
  let [pane, setPane] = useState('user');
  return (
    <div className="transit-master">
      <div className="transit-switcher">
        <div className="busemoji">🚌</div>
        <div id='marin' className={pane === 'marin' ? 'transit-switch-on' : 'transit-switch-off'} onClick={() => setPane('marin')}>MARIN</div>
        <div className={pane === 'frisco' ? 'transit-switch-on' : 'transit-switch-off'} onClick={() => setPane('frisco')}>FRISCO</div>
        <div className={pane === 'user' ? 'transit-switch-on' : 'transit-switch-off'} onClick={() => setPane('user')}>USER</div>
      </div>
    <div className="transit">
        <div className={pane === 'marin' ? 'transit-on' : 'transit-off'} >
          <Sansome />
          <VanNess />
      </div>
        <div className={pane === 'frisco' ? 'transit-on' : 'transit-off'}>
          <Stockton />
          <Union />
          <Broadway />
      </div>
      <div className={pane === 'user' ? 'transit-on' : 'transit-off'}>
          <TransitStop />
      </div>
    </div>
    </div>
  );
}

export default Transit;
