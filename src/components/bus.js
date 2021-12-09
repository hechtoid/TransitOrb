import React from 'react';
import { Link } from 'react-router-dom';
import { niceDate, countDown } from '../utils/date';

function Bus(props) {
if (props.bus.MonitoredVehicleJourney.OperatorRef === "BA") {
        return (
        <div className="bus" id={props.bus.MonitoredVehicleJourney.LineRef} >
                <div>
                        <span className="bold">
                                {props.bus.MonitoredVehicleJourney.DestinationName}
                        </span>  
                        <span className="white">
                                {'<='} {props.bus.MonitoredVehicleJourney.OriginName}
                        </span>
                </div>
        <hr></hr>
                <div>
                        {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime
                        ? <><span className="gray">
                                {niceDate(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)}
                        </span>
                        <span className="bold">
                                {niceDate(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)}
                        </span></> 
                        : <span className="bold">
                                {niceDate(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)}
                        </span>}
                        <div className="countdown">
                                {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime
                                ? <div className="min-math">
                                        {countDown(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)}</div>
                                : <div className="min-math">
                                        {countDown(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)}</div>}               
                                <div className="min">min</div>
                        </div>
                </div>
        </div>
)} else if (props.bus.MonitoredVehicleJourney.OperatorRef === "CT") {
        let caltrainLine = 'GY-N'
                if (    props.bus.MonitoredVehicleJourney.LineRef[0] === 'L3'
                    ||  props.bus.MonitoredVehicleJourney.LineRef[0] === 'L4'
                    ||  props.bus.MonitoredVehicleJourney.LineRef[0] === 'L5' ) 
                    {caltrainLine = 'Yellow-N'}
                if (props.bus.MonitoredVehicleJourney.LineRef === 'B7') {caltrainLine = 'Red-N'}
        return (
        <div className="bus" id={caltrainLine}>
                <div>
                        <span title="Track Vehicle" className="bold">
                        {props.bus.MonitoredVehicleJourney.VehicleRef
                        ? <span className="gps">
                                <Link to={`/vehicular/${props.bus.MonitoredVehicleJourney.OperatorRef}/${props.bus.MonitoredVehicleJourney.VehicleRef}`}>
                        {props.bus.MonitoredVehicleJourney.LineRef}<sup>GPS</sup>
                        </Link></span>
                        : <span className="no-gps">
                                {props.bus.MonitoredVehicleJourney.LineRef}
                        </span>}
                        =></span>
                        {props.bus.MonitoredVehicleJourney.DestinationName} 
                </div>
        <hr></hr>
                <div>
                {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime 
                                && props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime 
                                !== props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime
                                ? <><span className="gray">
        {niceDate(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)}
                                </span>
                                <span className="bold">
        {niceDate(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime)}
                                </span></>
                                : <span className="bold">
        {niceDate(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)}
                                </span>}
                        <div className="countdown">
                                {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime
                                ? <div className="min-math">
                                        {countDown(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime)}</div>
                                : <div className="min-math">
                                        {countDown(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)}</div>}    
                                <div className="min">min</div>
                        </div>          
                </div>
        </div>
    )} else {
    //if (['SF', 'AC', 'GG', 'SM', 'MA', 'SC'].includes(props.bus.MonitoredVehicleJourney.OperatorRef)){
        return(
        <div className="bus">
                <div>
                        <span title="Track Vehicle" className="bold">
                        {props.bus.MonitoredVehicleJourney.VehicleRef
                        ? <span className="gps">
                                <Link to={`/vehicular/${props.bus.MonitoredVehicleJourney.OperatorRef}/${props.bus.MonitoredVehicleJourney.VehicleRef}`}>
                        {props.bus.MonitoredVehicleJourney.LineRef}<sup>GPS</sup>
                        </Link></span>
                        : <span className="no-gps">
                                {props.bus.MonitoredVehicleJourney.LineRef}
                        </span>}
                        =></span>
                        <span className="bold">
                                {props.bus.MonitoredVehicleJourney.DestinationName}
                        </span>
                </div>
        <hr></hr>
                <div>     
                        {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime
                        ? <><span className="gray">
                                {niceDate(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)}
                        </span>
                        <span className="bold">
                                {niceDate(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)}
                        </span></>
                        : <span className="bold">
                                {niceDate(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)}
                        </span>}
                        <div className="countdown">
                                {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime
                                ? <div className="min-math">
                                        {countDown(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)}</div>
                                : <div className="min-math">
                                        {countDown(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)}</div>}
                                <div className="min">min</div>
                        </div>
                </div>
        </div>
    )} 
}
export default Bus;

