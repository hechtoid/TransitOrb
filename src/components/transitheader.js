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
      <Link to= "/anystop" >
        <div title="Any Stop" className={
          props.location.pathname.includes('/anystop')
          ? 'transit-switch-on' 
          : 'transit-switch-off' }>
            <span title="bus stop" role="img" aria-label="bus stop emoji">🚏</span>
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
      <Link to="/search">
        <div title="Search" className={
          props.location.pathname === '/search' 
          ? 'transit-switch-on' 
          : 'transit-switch-off' }>
          <span title="Search" role="img" aria-label="magnifying glass emoji">🔍</span>
        </div>
      </Link>
     
    </div>
  );
}

export default withRouter(TransitHeader);
