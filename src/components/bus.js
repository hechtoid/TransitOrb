import React from 'react';
import { Link } from 'react-router-dom';


function Bus(props) {
if (props.bus.MonitoredVehicleJourney.OperatorRef === "BA") {
    return (
            <div className="bus" id={props.bus.MonitoredVehicleJourney.LineRef}>
                    <div className="bus-left">
                    <div>
    <span>{props.bus.MonitoredVehicleJourney.OriginName}</span>
    <span className="bold"> => {props.bus.MonitoredVehicleJourney.DestinationName}</span>
            </div>
        {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime
        ? <>
        <span className="gray">
        {new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)).toLocaleTimeString()}
                </span>
        <span className="bold"> => {new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)).toLocaleTimeString()}
                </span>
        </> :
        <span className="bold">
                {new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)).toLocaleTimeString()}
        </span>}
        </div>
        <div className="countdown">
                <div className="min">in</div>
                {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime
?<div className="min-math">{Math.floor(((new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime))-new Date()))/60000)}</div>
:<div className="min-math">{Math.floor(((new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime))-new Date()))/60000)}</div>}               
 <div className="min">min</div></div>
    </div>
    )} else if (props.bus.MonitoredVehicleJourney.OperatorRef === "CT") {
        let caltrainLine = 'GY-N'
        if (props.bus.MonitoredVehicleJourney.LineRef === 'Limited') {caltrainLine = 'YL-N'}
        if (props.bus.MonitoredVehicleJourney.LineRef === 'Bullet') {caltrainLine = 'RD-N'}
        return (
        <div className="bus" id={caltrainLine}>
            <div className="bus-left"><div><span className="bold">
                {props.bus.MonitoredVehicleJourney.LineRef} => </span> 
                {props.bus.MonitoredVehicleJourney.DestinationName} 
                </div>
        {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime && props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime !== props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime
        ? <>
        <span className="gray">
{new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)).toLocaleTimeString()}
        </span>
<span className="bold"> => {new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime)).toLocaleTimeString()}
        </span>
        </>
        : <span className="bold">
{new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)).toLocaleTimeString()}
        </span>}
    </div>
    <div className="countdown">
    <div className="min">in</div>
    {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime
?<div className="min-math">{Math.floor(((new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime))-new Date()))/60000)}</div>
:<div className="min-math">{Math.floor(((new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime))-new Date()))/60000)}</div>}    
<div className="min">min</div></div></div>
    )} else if (['SF', 'AC', 'GG', 'SM', 'MA', 'SC'].includes(props.bus.MonitoredVehicleJourney.OperatorRef)){
        return(
        <div className="bus"><div className="bus-left">
            <div><span title="Track Vehicle" className="bold">
        { props.bus.MonitoredVehicleJourney.VehicleRef
        ? <Link className="gps"
                to={{
                pathname: "/vehicular", 
                state: {
        vehicleNumber: props.bus.MonitoredVehicleJourney.VehicleRef,
        agency: props.bus.MonitoredVehicleJourney.OperatorRef
                        }
                }} >
        {props.bus.MonitoredVehicleJourney.LineRef}<sup>GPS</sup>
        </Link>
        : <>{props.bus.MonitoredVehicleJourney.LineRef}</>
        } => </span> 
        {props.bus.MonitoredVehicleJourney.DestinationName} 
        </div>
        {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime
        ? <>
        <span className="gray">
{new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)).toLocaleTimeString()}
        </span>
<span className="bold"> => {new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)).toLocaleTimeString()}
        </span>
        </>
        : <span className="bold">
{new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)).toLocaleTimeString()}
        </span>}
    </div>
    <div className="countdown">
    <div className="min">in</div>
{props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime
?<div className="min-math">{Math.floor(((new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime))-new Date()))/60000)}</div>
:<div className="min-math">{Math.floor(((new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime))-new Date()))/60000)}</div>}
    <div className="min">min</div></div>
</div>
    )} else {
        return(
        <div className="bus"><div className="bus-left">
            <div><span className="bold">
{props.bus.MonitoredVehicleJourney.LineRef} => </span> 
{props.bus.MonitoredVehicleJourney.DestinationName} 
        </div>
        {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime
        ? <>
        <span className="gray">
{new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)).toLocaleTimeString()}
        </span>
<span className="bold"> => {new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)).toLocaleTimeString()}
        </span>
        </>
        : <span className="bold">
{new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)).toLocaleTimeString()}
        </span>}
    </div>
    <div className="countdown">
    <div className="min">in</div>
    {props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime
?<div className="min-math">{Math.floor(((new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime))-new Date()))/60000)}</div>
:<div className="min-math">{Math.floor(((new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime))-new Date()))/60000)}</div>}      
<div className="min">min</div></div>
</div>
    )}
}
export default Bus;

