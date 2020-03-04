import React from 'react';
import { Link } from 'react-router-dom';


function Bus(props) {
if (props.bus.MonitoredVehicleJourney.OperatorRef === "BA") {
    return (
            <div className="bus"><div>
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
        </>
        : <span className="bold">
{new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)).toLocaleTimeString()}
        </span>}
    </div>
    )} else if (['SF', 'AC', 'GG', 'SM', 'MA', 'SC'].includes(props.bus.MonitoredVehicleJourney.OperatorRef)){
        return(
        <div className="bus">
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
    )} else {
        return(
        <div className="bus">
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
    )}
}
export default Bus;

