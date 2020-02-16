import React from 'react';
import axios from 'axios';

class TransitStop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stopCode: '16513',
            agency: 'SF',
            buss: [],
            agencies: []
        }
        this.dateParser=this.dateParser.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        axios.get(`http://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.state.agency}&stopCode=${this.state.stopCode}`)
        .then(res => {
            // console.log(res.data)
            let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
            this.setState({ buss });
        })
        axios.get(`http://api.511.org/transit/operators?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON`)
        .then(res => {
            console.log(res.data)
            let agencies = res.data;
            this.setState({ agencies });
        })
    }

    handleSubmit(e) {
        axios.get(`http://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.state.agency}&stopCode=${this.state.stopCode}`)
            .then(res => {
                // console.log(res.data)
                let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                this.setState({ buss });
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


    render() {
        let busss
        let stop
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
                
                <br></br>
                
                Agency ShortList:
                <br></br>
                <label><input type="radio" onChange={this.updateAgency()} checked={this.state.agency==="SF"} value="SF" />SF Muni</label>
                <label><input type="radio" onChange={this.updateAgency()} checked={this.state.agency==="GG"} value="GG" />Golden Gate Transit</label>
                <br></br>
                <label><input type="radio" onChange={this.updateAgency()} checked={this.state.agency==="AC"} value="AC" />AC Transit</label>
                <label><input type="radio" onChange={this.updateAgency()} checked={this.state.agency==="MA"} value="MA" />Marin Transit</label>            
            <br></br>
            <br></br>
            
            Full List (all {this.state.agencies.length} transit providers!)
                <br></br>
                <select
                    className="agency-select"
                    value={this.state.agency}
                    onChange={this.updateAgency()}
                >
                    {agencies}
                </select>
            <form onSubmit={this.handleSubmit}>
                Stop ID:
                <br></br>
                <input type="text"
                    value={this.state.stopCode}
                    onChange={this.updateStopCode()}
                    className="stop-id"
                />
                <br></br>
                <input type="submit" value="Update" />
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
