import React from 'react';
import axios from 'axios';

class TransitStop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stopCode: '16513',
            agency: 'SF',
            buss: [],
            agencies: [],
            stops: [],
            stop: {}
        }
        this.dateParser = this.dateParser.bind(this)
        this.loadBusss = this.loadBusss.bind(this);
        this.loadStops = this.loadStops.bind(this);

    }

    componentDidMount() {
        axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.state.agency}&stopCode=${this.state.stopCode}`)
        .then(res => {
            let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
            this.setState({ buss });
        })
        axios.get(`https://api.511.org/transit/operators?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON`)
        .then(res => {
            let agencies = res.data;
            this.setState({ agencies });
        })
    }

    loadBusss(e) {
        axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.state.agency}&stopCode=${this.state.stopCode}`)
            .then(res => {
                let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                this.setState({ buss });
            })
    }
    loadStops(e) {
        axios.get(`https://api.511.org/transit/stops?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&operator_id=${this.state.agency}`)
            .then(res => {
                let stops = res.data.Contents.dataObjects.ScheduledStopPoint;
                this.setState({ stops });
            })
    }

    dateParser(zulu){
        return new Date(Date.parse(zulu)).toLocaleTimeString()
    }

    updateStopCode() {
        return e => this.setState({
            stopCode: e.currentTarget.value
        })
    }
    updateAgency() {
        return e => this.setState({
            agency: e.currentTarget.value
        })
    }
    updateStop() {
        return e => this.setState({
            stopCode: e.currentTarget.value
        })
    }


    render() {
        let busss
        let stop
        let stops
        let agencies
        if (this.state.agencies){
            agencies = this.state.agencies.map(agency => {
                return (
                        <option value={agency.Id}> 
 {agency.ShortName?agency.ShortName:agency.Name} {agency.ShortName&&agency.ShortName!==agency.Name?`(${agency.Name})`:''}
                         </option> 
                )
            })
        }
        if (this.state.stops){
            stops = this.state.stops.map(stop => {
                return (
                        <option key={stop.Id} value={stop.Id} obj={stop}>
                            {stop.name}
                        </option>
                )
            })
        }
        if (this.state.buss){
            let key = 0 
            busss = this.state.buss.map(bus => {
                stop = bus.MonitoredVehicleJourney.MonitoredCall.StopPointName
                return (
                    <div className="bus" key={key++}>
                        <span className="line">{bus.MonitoredVehicleJourney.LineRef}</span> => {bus.MonitoredVehicleJourney.DestinationName}
                        <br></br>
                        <span className="aimed">{this.dateParser(bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)}</span> => <span className="expected">{this.dateParser(bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)}</span>
                    </div>
                )
            })   
        }
        return (
            <div className = "stop" >
            <div className="stop-left">
                ShortList:
                <br></br>                
                <label id="sf"><input type="radio" onChange={this.updateAgency()} checked={this.state.agency==="SF"} value="SF" />SF Muni</label>
                <label><input type="radio" onChange={this.updateAgency()} checked={this.state.agency==="AC"} value="AC" />AC Transit</label>
                <br></br>
                <label><input type="radio" onChange={this.updateAgency()} checked={this.state.agency==="GG"} value="GG" />Golden Gate Transit</label>

            
            <div className="agencies-string">
                All {this.state.agencies.length} Transit Agencies:
                <span className="politics">
   (Too many! <a target="_blank" href="https://www.seamlessbayarea.org/">AB2057</a>)
            </span>
                </div>
                
                <select
                    className="agency-select"
                    value={this.state.agency}
                    onChange={this.updateAgency()}
                >
                    {agencies}
                </select>
            <button className="load-stops" onclick={this.loadStops}>Load Stops</button>
            <br></br>
            <select
                className="stop-select"
                value={this.state.stop.Name}
                onChange={this.updateStop()}
            >
                {stops}
            </select>
            <form onSubmit={this.loadBusss}>
                Stop ID:
                <input type="text"
                    value={this.state.stopCode}
                    onChange={this.updateStopCode()}
                    className="stop-id"
                />
                <input type="submit" value="Update Arrivals" />
                <br></br>
            </form>
            </div>
            <div className="stop-right">
                { stop }
                { busss }
            </div>
            </div>
        );
    }

}
export default TransitStop;
