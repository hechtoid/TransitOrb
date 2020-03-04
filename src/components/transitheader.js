import React from 'react';
import { Link, withRouter } from 'react-router-dom';



function TransitHeader(props) {
  console.log(props.location.pathname)

  return (
    <div className="transit-header">
    <Link to= "/vehicular" >
      <div id="busemoji" className={
        props.location.pathname === '/vehicular'
        ? 'transit-switch-on' 
        : 'transit-switch-off'
        }>
<span title="Vehicle Tracker" role="img" aria-label="bus emoji">🚌</span>
      </div>
    </Link>
  <Link to= "/commuter" >
<div className={
  props.location.pathname === '/commuter' 
  ? 'transit-switch-on' 
  : 'transit-switch-off'
  }>Commuter</div>
  </Link>
  <Link to="/weekender">
<div id='marin' className={
  props.location.pathname === '/weekender' 
  ? 'transit-switch-on' 
  : 'transit-switch-off'}>Weekender</div>
  </Link>
  <Link to="/anywherer">
<div className={
  props.location.pathname === '/anywherer' 
  ? 'transit-switch-on' 
  : 'transit-switch-off'} >Anywherer</div>
  </Link>
<div className="five-eleven">
  <a href="https://511.org/open-data/transit" title="powered by 511 open data" target="_blank" rel="noopener noreferrer">
    <img className="five-eleven" src="https://proxy-prod.511.org/assets/img/branding/511_original_web.png" alt="511 logo">
    </img>
  </a>
</div>
</div>
  );
}

export default withRouter(TransitHeader);
