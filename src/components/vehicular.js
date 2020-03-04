import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Vehicular extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.location.state || {vehicleNumber: '', agency: ''}
    
        this.loadVehicle = this.loadVehicle.bind(this)
        this.updateVehicleNumber = this.updateVehicleNumber.bind(this)
        this.updateAgency = this.updateAgency.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.loadVehicle()
    }
    handleSubmit(e){
        e.preventDefault()
        this.loadVehicle()
    }
    loadVehicle() { 
        let vehicle = {}
        let agency = this.state.agency.toUpperCase()||'SF'
        axios.get(`https://api.511.org/transit/VehicleMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&agency=${agency}&format=json&vehicleID=${this.state.vehicleNumber}`)
            .then(res => {
                vehicle = res.data.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity
                ? res.data.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity[0].MonitoredVehicleJourney
                : {}
                this.setState({ vehicle });
            })
    }

    updateVehicleNumber(e) {
        return e => {
            let vehicleNumber = e.currentTarget.value
            this.setState({
                vehicleNumber
            })
        }
    }
    updateAgency(e) {
        return e => {
            let agency = e.currentTarget.value
            if (agency.length <= 2){
            this.setState({
                agency
            })}
        }
    }
    render() {
            let vehicleInfo = <div className="vehicle-info">No Tracked Vehicle</div>
            let futureStops = <div className="future-stops">No Future Stops</div>
            let key = 0
            let gFrame
            if (this.state.vehicle && this.state.vehicle.VehicleLocation) { 
                gFrame = <iframe title="gFrame" frameBorder="1"
src={`https://www.google.com/maps/embed/v1/place?zoom=14&q=${this.state.vehicle.VehicleLocation.Latitude},${this.state.vehicle.VehicleLocation.Longitude}&key=AIzaSyAIe8CQdaU5qYMgUBimNtNLtz6MKhODsNU`}></iframe> 
            }
            if (this.state.vehicle && this.state.vehicle.MonitoredCall) {
                vehicleInfo = <div className="vehicle-info">
                      Route <span className="bold">
                            {this.state.vehicle.LineRef}
                        </span> to <span className="bold">
                            {this.state.vehicle.DestinationName}
                        </span>
                        <br></br>
                        <Link 
to={`/anystop/${this.state.agency||'SF'}/${this.state.vehicle.MonitoredCall.StopPointRef}`}>
                        NextStop</Link>: <span className="bold">
                            {this.state.vehicle.MonitoredCall.StopPointName}
                            </span>
                        <br></br>
                        <span className="gray">
{new Date(Date.parse(this.state.vehicle.MonitoredCall.AimedArrivalTime)).toLocaleTimeString()} </span>
                         <span className="bold">
=> {new Date(Date.parse(this.state.vehicle.MonitoredCall.ExpectedArrivalTime)).toLocaleTimeString()}
                        </span>
                        </div>
            }
            if (this.state.vehicle && this.state.vehicle.OnwardCalls && this.state.vehicle.OnwardCalls.OnwardCall[0]) {
                futureStops = <div className="future-stops">
                        Future Stops: 
                        <br></br>
                        {this.state.vehicle.OnwardCalls.OnwardCall.map(stop => {
                            return (
                        <div className="bus" key={key++}>
                            |  Stop <Link 
                            to={`/anystop/${this.state.agency||'SF'}/${stop.StopPointRef}`}>
                                #{stop.StopPointRef}
                            </Link>  |    &nbsp;&nbsp;&nbsp;  {stop.StopPointName}
                            <br></br>
                            <span className="gray">
                                {new Date(Date.parse(stop.AimedArrivalTime)).toLocaleTimeString()}
                                </span>
                            <span className="bold"> => {new Date(Date.parse(stop.ExpectedArrivalTime)).toLocaleTimeString()}
                                </span>
                        </div>
                                )
                            })
                        }
                        </div>
            }
        return (
            <div className="vehicular">
                <div className="short-title">
                    Live Tracking - Vehicle {
                             this.state.vehicle
                            ? this.state.vehicle.VehicleRef
                            : this.state.vehicleNumber
                        }</div>
                { gFrame }
                <form onSubmit={this.handleSubmit}>
                 <input type="text"
                    id="vehicle-number"
                    placeholder="Vehicle Number"
                    value={this.state.vehicleNumber}
                    onChange={this.updateVehicleNumber()}
                />
                <input type="text"
                    id="vehicle-agency"
                    placeholder="Agency Code"
                    value={this.state.agency}
                    onChange={this.updateAgency()}
                />
                <input type="submit" value="Load" />
            </form>
            <a href="https://www.sfmta.com/getting-around/muni/muni-feedback" className="vehicular-feedback" target="_blank" rel="noopener noreferrer">
                Vehicle Number Locations (SFMUNI)</a>
            {vehicleInfo}
            {futureStops}
            </div>
        );
    }
}
export default Vehicular;
