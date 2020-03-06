import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Vehicular extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.location.state || {vehicleNumber: '', agency: 'SF'}
    
        this.loadVehicle = this.loadVehicle.bind(this)
        this.updateVehicleNumber = this.updateVehicleNumber.bind(this)
        this.updateAgency = this.updateAgency.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.selectID = this.selectID.bind(this)
    }
    selectID = (e) => e.target.select();

    componentDidMount() {
        this.loadVehicle()
    }
    handleSubmit(e){
        e.preventDefault()
        this.loadVehicle()
    }
    loadVehicle() { 
        let vehicle = {}
        let agency = this.state.agency.toUpperCase()
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
            let firstStop = ''
            let futureStops = <div className="future-stops">No Future Stops</div>
            let key = 0
            let gFrame
            if (this.state.vehicle && this.state.vehicle.VehicleLocation) { 
                gFrame = <iframe title="gFrame" frameBorder="1"
src={`https://www.google.com/maps/embed/v1/place?zoom=14&q=${this.state.vehicle.VehicleLocation.Latitude},${this.state.vehicle.VehicleLocation.Longitude}&key=AIzaSyAIe8CQdaU5qYMgUBimNtNLtz6MKhODsNU`}>Loading Map...</iframe> 
            }
            if (this.state.vehicle && this.state.vehicle.MonitoredCall) {
                vehicleInfo =
                    <div className="vehicle-info">
                    Route <span className="bold">
                        {this.state.vehicle.LineRef}
                    </span> to <span className="bold">
                        {this.state.vehicle.DestinationName}
                    </span>
                    </div>
                firstStop =  
                <div className="stop" >
                <div className="stop-top">
                        <div>
                            <span>
                            {this.state.vehicle.MonitoredCall.StopPointName}
                            </span>
                        <Link 
            to={`/anystop/${this.state.agency}/${this.state.vehicle.MonitoredCall.StopPointRef}`}>
                        <div className="map-link">
                            #{this.state.vehicle.MonitoredCall.StopPointRef}
                        </div>
                        </Link>
                        {this.state.vehicle.MonitoredCall.ExpectedArrivalTime
                        ? <>
                        <span className="bold">
            {new Date(Date.parse(this.state.vehicle.MonitoredCall.ExpectedArrivalTime)).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric' })}
                        </span>
                        <span className="gray">
            {new Date(Date.parse(this.state.vehicle.MonitoredCall.AimedArrivalTime)).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric' })}
                        </span>
                        </>
                        : <span className="bold">
            Scheduled {new Date(Date.parse(this.state.vehicle.MonitoredCall.AimedArrivalTime)).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric' })}
                        </span>}
                    </div>
                    <div className="countdown">
                    <div className="min">in</div>
                {this.state.vehicle.MonitoredCall.ExpectedArrivalTime
                ? <div className="min-math">
            {Math.floor(((new Date(Date.parse(this.state.vehicle.MonitoredCall.ExpectedArrivalTime))-new Date()))/60000)}</div>
                : <div className="min-math">
            {Math.floor(((new Date(Date.parse(this.state.vehicle.MonitoredCall.AimedArrivalTime))-new Date()))/60000)}</div>}               
                    <div className="min">min</div>
                    </div>
                </div>   
                </div>
            }
            if (this.state.vehicle && this.state.vehicle.OnwardCalls && this.state.vehicle.OnwardCalls.OnwardCall[0]) {
                futureStops = 
                    <div className="future-stops">
                        {firstStop}
                        {this.state.vehicle.OnwardCalls.OnwardCall.map(stop => {
                            return (
                        <div className="stop" key={key++}>
                        <div className="stop-top">
                            <div>
                                <span>
                                    {stop.StopPointName}
                                </span>
                            <Link to={`/anystop/${this.state.agency}/${stop.StopPointRef}`}>
                            <div className="map-link">
                                #{stop.StopPointRef}
                            </div>
                            </Link>
                            <span className="bold">
            {new Date(Date.parse(stop.ExpectedArrivalTime)).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric' })}
                            </span>
                            <span className="gray">
            {new Date(Date.parse(stop.AimedArrivalTime)).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric' })}
                            </span>
                            </div>
                    <div className="countdown">
                    <div className="min">in</div>
                {stop.ExpectedArrivalTime
                ?<div className="min-math">
            {Math.floor(((new Date(Date.parse(stop.ExpectedArrivalTime))-new Date()))/60000)}</div>
                :<div className="min-math">
            {Math.floor(((new Date(Date.parse(stop.AimedArrivalTime))-new Date()))/60000)}</div>}               
                    <div className="min">min</div>
                </div>
                        </div> 
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
                        }
                    </div>             
                    {vehicleInfo}
                <form onSubmit={this.handleSubmit}>
                <input type="text"
                    id="vehicle-agency"
                    placeholder="Agency"
                    value={this.state.agency}
                    onChange={this.updateAgency()}
                    />
                 <input type="number"
                    id="vehicle-number"
                    placeholder="Vehicle #"
                    value={this.state.vehicleNumber}
                    onFocus={this.selectID}
                    onChange={this.updateVehicleNumber()}
                    />
                {this.state.vehicle && this.state.vehicle.Monitored
                ?<input type="submit" value="ReLoad" />
                :<input type="submit" value="Load" />}
                <br></br>
                     <a href="https://www.sfmta.com/getting-around/muni/muni-feedback" className="vehicular-feedback" target="_blank" rel="noopener noreferrer">
                SFMUNI Vehicle Numbers</a>
            </form>
            <div className='g-frame'>
            {gFrame}
            </div> 
            {futureStops}
            </div>
        );
    }
}
export default Vehicular;
