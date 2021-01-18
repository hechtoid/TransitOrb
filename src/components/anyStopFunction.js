import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Bus from './bus'

function AnyStop(props) {
    const [buss, setBuss] = useState([])
    const [error, setError] = useState('')
    const loadBusss = () => {
        axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${props.agency}&stopCode=${props.stopCode}`)
            .then(res => {
                let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                if (props.filterIN){buss = buss.filter( bus => props.filterIN.includes(bus.MonitoredVehicleJourney.LineRef))} 
                if (props.filterOUT){buss = buss.filter( bus => !props.filterOUT.includes(bus.MonitoredVehicleJourney.LineRef))}
                if (props.limit){buss = buss.slice(0,props.limit)}
                setBuss(buss);
            }).catch(exception => setError(exception.toString()))
    }
    useEffect(loadBusss)

    let busss = <div className="bust">
                    No Tracked Vehicles to show. 
                        <br></br>
                    <span className='update' onClick={loadBusss}>
                        Check again
                    </span>, check your inputs, or check the schedule. <span className='error'>[{error}]</span>
                </div>
    let stopName
    if (buss[0]) {
        stopName = buss[0].MonitoredVehicleJourney.MonitoredCall.StopPointName
        let key = 0 
        busss = buss.map(bus => {
            return <Bus bus={bus} key={key++} /> 
        })   
    }
    return (
        <div className="any-stop">
            <div className="header">
                <Link to={`/anystop/${props.agency}/${props.stopCode}`}>
                    <div className="map-link">
                        <span title="bus stop" role="img" aria-label="bus stop emoji">🚏</span>                  
                        { props.title 
                        ? props.title
                        : stopName
                            ? stopName
                            : `${props.agency}#${props.stopCode}` }
                    </div>
                </Link> 
            </div>
            {busss}
        </div>
    );
}
export default AnyStop;