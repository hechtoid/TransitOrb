import React, { useState } from 'react';
import AnyStop from './anyStop';
import TransitStop from './transitstop';
import { Link } from 'react-router-dom';



function Transit() {
  let [pane, setPane] = useState('user');
  document.title="transitYourself"
  return (
    
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

  );
}

export default Transit;
