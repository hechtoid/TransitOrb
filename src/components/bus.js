import React from 'react';
import { Link } from 'react-router-dom';


function Bus(props) {
if (props.bus.MonitoredVehicleJourney.OperatorRef === "BA") {
        return (
        <div className="bus" id={props.bus.MonitoredVehicleJourney.LineRef} origin={props.bus.MonitoredVehicleJourney.OriginName}>
                <div>
                        {/* <span>{props.bus.MonitoredVehicleJourney.OriginName}=> </span> */}
                        <span className="bold">
                                {props.bus.MonitoredVehicleJourney.DestinationName}
                        </span>
                </div>
                <hr></hr>
                <div>
                        {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime
                        ? <><span className="gray">
        {new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric' })}
                        </span>
                        <span className="bold">
        {new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric' })}
                        </span></> 
                        : <span className="bold">
        {new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric' })}
                        </span>}
                        <div className="countdown">
        {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime
? <div className="min-math">{Math.floor(((new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime))-new Date()))/60000)}</div>
: <div className="min-math">{Math.floor(((new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime))-new Date()))/60000)}</div>}               
                                <div className="min">min</div>
                        </div>
                </div>
        </div>
)} else if (props.bus.MonitoredVehicleJourney.OperatorRef === "CT") {
        let caltrainLine = 'GY-N'
                if (props.bus.MonitoredVehicleJourney.LineRef === 'Limited') {caltrainLine = 'YL-N'}
                if (props.bus.MonitoredVehicleJourney.LineRef === 'Bullet') {caltrainLine = 'RD-N'}
        return (
        <div className="bus" id={caltrainLine}>
                <div className="bus-left">
                        <div>
                                <span title="Track Vehicle" className="bold">
                        {props.bus.MonitoredVehicleJourney.VehicleRef
                                ? <Link className="gps" to={{pathname: "/vehicular", state: {
                vehicleNumber: props.bus.MonitoredVehicleJourney.VehicleRef,
                agency: props.bus.MonitoredVehicleJourney.OperatorRef}}} >
                                {props.bus.MonitoredVehicleJourney.LineRef}<sup>GPS</sup>
                                </Link>
                                : <span className="no-gps">{props.bus.MonitoredVehicleJourney.LineRef}</span>}
                                </span>=> {props.bus.MonitoredVehicleJourney.DestinationName} 
                        </div>
                        {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime 
                        && props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime 
                        !== props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime
                        ? <><span className="bold">
        {new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime)).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric' })}
                        </span>
                        <span className="gray">
        {new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric' })}
                        </span></>
                        : <span className="bold">
        {new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric' })}
                        </span>}
                </div>
                <div className="countdown">
        {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime
? <div className="min-math">{Math.floor(((new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime))-new Date()))/60000)}</div>
: <div className="min-math">{Math.floor(((new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime))-new Date()))/60000)}</div>}    
                        <div className="min">min</div>
                </div>
        </div>
    )} else {
    //if (['SF', 'AC', 'GG', 'SM', 'MA', 'SC'].includes(props.bus.MonitoredVehicleJourney.OperatorRef)){
        return(
        <div className="bus">
                <div>
                        <span>
                                <span title="Track Vehicle" className="bold">
                        {props.bus.MonitoredVehicleJourney.VehicleRef
                                ? <Link className="gps" to={{pathname: "/vehicular", state: {
                vehicleNumber: props.bus.MonitoredVehicleJourney.VehicleRef,
                agency: props.bus.MonitoredVehicleJourney.OperatorRef}}} >
                                {props.bus.MonitoredVehicleJourney.LineRef}<sup>GPS</sup>
                                </Link>
                                : <span className="no-gps">{props.bus.MonitoredVehicleJourney.LineRef}</span>}
                                </span>=> <span className="bold">
                                        {props.bus.MonitoredVehicleJourney.DestinationName}
                                </span>
                        </span>
                </div>
                <hr></hr>
                <div>
                       
                {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime
                        ? <><span className="gray">
                        {new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric' })}
                                        </span>
                        <span className="bold">
        {new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric' })}
                        </span></>
                        : <span className="bold">
        {new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric' })}
                        </span>}
                        <div className="countdown">
        {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime
? <div className="min-math">{Math.floor(((new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime))-new Date()))/60000)}</div>
: <div className="min-math">{Math.floor(((new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime))-new Date()))/60000)}</div>}
                        <div className="min">min</div>
                </div>
                        </div>
        </div>
    )} 
}
export default Bus;

