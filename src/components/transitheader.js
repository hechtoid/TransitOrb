import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function TransitHeader(props) {
  let title=props.location.pathname.substring(1)
  document.title=`transitYourself - ${title}`
  return (
    <div className="transit-header">
      <Link to= "/vehicular" >
        <div id="busemoji" className={
          props.location.pathname === '/vehicular'
          ? 'transit-switch-on' 
          : 'transit-switch-off'
        }>
<span title="Vehicular" role="img" aria-label="bus emoji">🚌</span>
        </div>
      </Link>
      <Link to="/weekender">
        <div id='marin' title="Weekender" className={
          props.location.pathname === '/weekender' 
          ? 'transit-switch-on' 
          : 'transit-switch-off'
        }>Weekender</div>
      </Link>
      <Link to= "/commuter" >
        <div title="Commuter" className={
          props.location.pathname === '/commuter' 
          ? 'transit-switch-on' 
          : 'transit-switch-off'
        }>Commuter</div>
      </Link>
      {/* <Link to= "/saved" >
        <div title="My Stops" className={
          props.location.pathname === '/saved' 
          ? 'transit-switch-on' 
          : 'transit-switch-off' }>
          <span title="My Stops" role="img" aria-label="map pin emoji">📍</span>
        </div>
      </Link> */}
      <Link to="/anywherer">
        <div title="Anywherer" className={
          props.location.pathname === '/anywherer' 
          ? 'transit-switch-on' 
          : 'transit-switch-off' }>
          <span title="Anywherer" role="img" aria-label="magnifying glass emoji">🔍</span>
          {/* <span title="Anywherer" role="img" aria-label="world map emoji">🗺️</span> */}
        </div>
      </Link>
     
    </div>
  );
}

export default withRouter(TransitHeader);
