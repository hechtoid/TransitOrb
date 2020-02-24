import React from 'react';

function Bus(props) {
if (props.bus.MonitoredVehicleJourney.OperatorRef !== "BA") {
    return (
        <div className="bus" key={props.key}>
            <div><span className="bold">
{props.bus.MonitoredVehicleJourney.LineRef} => </span> 
{props.bus.MonitoredVehicleJourney.DestinationName} 
            </div><span className="gray">
{new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)).toLocaleTimeString()}
            </span>
<span className="bold"> => {new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)).toLocaleTimeString()}
            </span>
        </div>
    )} else {
    return (
        <div className="bus" key={props.key}><div>
<span>{props.bus.MonitoredVehicleJourney.OriginName}</span>
<span className="bold"> => {props.bus.MonitoredVehicleJourney.DestinationName}</span>
            </div><span className="gray">
{new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)).toLocaleTimeString()}
            </span>
<span className="bold"> => {new Date(Date.parse(props.bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)).toLocaleTimeString()}
            </span>
        </div>
    )}
}
export default Bus;
