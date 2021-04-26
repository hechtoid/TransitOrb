import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function TransitHeader(props) {
  let title=props.location.pathname.substring(1)
  document.title=`TransitOrb - ${title}`
  return (
    <div className="transit-header">
      <Link to="/search">
        <div title="Search" className={
          props.location.pathname === '/search' 
          ? 'transit-switch-on' 
          : 'transit-switch-off' }>
<span title="Search" role="img" aria-label="magnifying glass emoji">🔍</span>
        </div>
      </Link>
      <Link to= "/saved" >
        <div title="My Stops" className={
        props.location.pathname.includes('/saved')
        ? 'transit-switch-on' 
        : 'transit-switch-off' }>
<span title="My Stops" role="img" aria-label="map pin emoji">📍</span>
        </div>
      </Link>
      <Link to= "/vehicular" >
        <div id="busemoji" className={
          props.location.pathname.includes('/vehicular')
          ? 'transit-switch-on' 
          : 'transit-switch-off' }>
<span title="Vehicular Tracking" role="img" aria-label="bus emoji">🚌</span>
        </div>
      </Link>
      <Link to= "/anystop" >
        <div title="Stop Departures" className={
          props.location.pathname.includes('/anystop')
          ? 'transit-switch-on' 
          : 'transit-switch-off' }>
<span title="Live Departures" role="img" aria-label="bus stop emoji">🚏</span>
        </div>
      </Link>
      <Link to= "/user" >
        <div title="User" className={
          props.location.pathname === '/user'
          ? 'transit-switch-on' 
          : 'transit-switch-off' }>
<span title="User Settings" role="img" aria-label="user emoji">👤</span>
        </div>
      </Link>
    </div>
  );
}

export default withRouter(TransitHeader);
