import React from 'react';
import axios from 'axios';

class TransitStop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            stopCode: '16513',
            agency: 'SF',
            buss: [],
            agencies: [],
            stops: [],
            stopFilter: '',
            stopsFiltered: [],
            stop: {}
        }
        this.dateParser = this.dateParser.bind(this)
        this.loadBusss = this.loadBusss.bind(this);
        this.loadStops = this.loadStops.bind(this);
        this.updateStopFilter = this.updateStopFilter.bind(this)
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
        this.setState({ loaded: true })
        axios.get(`https://api.511.org/transit/stops?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&operator_id=${this.state.agency}`)
            .then(res => {
                if (this.state.agency === "BA"){
                    let stops = res.data.Contents.dataObjects.ScheduledStopPoint.filter(stop => !stop.id.includes('place')&&!stop.Name.includes('Enter/Exit :'))
                    this.setState({ stops, stopsFiltered: stops });
                }
                else {
                    let stops = res.data.Contents.dataObjects.ScheduledStopPoint;
                    this.setState({ stops, stopsFiltered: stops });
                }
            })
    }

    //http://api.511.org/transit/stoptimetable?api_key={your-key}&MonitoringRef=13008&OperatorRef=SF

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
        return e => {
            this.setState({
            stopCode: this.state.stopsFiltered[e.currentTarget.value].id,
            stop: this.state.stopsFiltered[e.currentTarget.value]
        })
    }
    }
    updateStopFilter() {
        return e => {
            if (!e.currentTarget.value){
                this.setState({
                    stopFilter: '',
                    stopsFiltered: this.state.stops
                })
            }
            else if (e.currentTarget.value.length === 0){
                this.setState({
                    stopFilter: '',
                    stopsFiltered: this.state.stops
                })
            }
            else if (e.currentTarget.value.length < 2){
                this.setState({
                    stopFilter: e.currentTarget.value,
                    // stopsFiltered: this.state.stops
                })
            }
            else if (e.currentTarget.value.length <= this.state.stopFilter.length){
                let filtered = this.state.stops//.filter(stop => stop.Name.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
                this.setState({
                    stopFilter: e.currentTarget.value,
                    stopsFiltered: filtered
                })
            }  
            else if (e.currentTarget.value.length >= 2){
                let filtered = this.state.stopsFiltered.filter(stop => stop.Name.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
                this.setState({
                    stopFilter: e.currentTarget.value,
                    stopsFiltered: filtered //? filtered : this.state.stops
                })
            }
    }
    }

    render() {
        let busss = <div className="bus">
            No Tracked Vehicles. 
            <br></br>
            Update Above, or check the schedule.
        </div>
        let stop
        let stops
        let agencies
        if (this.state.agencies){
            let key = 0
            agencies = this.state.agencies.map(agency => {
                return (
                        <option value={agency.Id} key={key++}> 
 {agency.ShortName?agency.ShortName:agency.Name} {agency.ShortName&&agency.ShortName!==agency.Name?`(${agency.Name})`:''}
                         </option> 
                )
            })
        }
        if (this.state.stopsFiltered){
            //
            let key = 0
            stops = this.state.stopsFiltered.map(stop => {
                return (
                        <option key={key} value={key++} 
                        // onClick={this.updateStop()}
                        >
                            {stop.Name} ({stop.id})
                        </option>
                )
            })
        }
        if (this.state.buss[0]){
            console.log(this.state.buss[0])
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
                <br></br>                
                <label id="sf"><input type="radio" onChange={this.updateAgency()} checked={this.state.agency==="SF"} value="SF" />SF</label>
                <label><input type="radio" onChange={this.updateAgency()} checked={this.state.agency==="AC"} value="AC" />AC</label>
                <br></br>
                <label><input type="radio" onChange={this.updateAgency()} checked={this.state.agency==="GG"} value="GG" />GG</label>
                <label><input type="radio" onChange={this.updateAgency()} checked={this.state.agency==="BA"} value="BA" />Bart</label>
                <span className="agency-code">{this.state.agency}</span>
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
                    onMouseDown={this.updateAgency()}
                >
                    {agencies}
                </select>
            <button className="load-stops" onClick={this.loadStops}>Load Stops</button>
            <div className="slow">
                {
                (this.state.loaded)
                ? <div>Loading.....Muni has ~3500 stops, <br></br>ACTransit more than 5000.</div>
                : <div></div>
                }
            </div>
            
                <input type="text"
                    value={this.state.stopFilter}
                    onChange={this.updateStopFilter()}
                    className="stop-filter"
                    placeholder="Live Filter (BackSpace RePopulates StopList)"
                />
                <br></br>
            <select
                disabled={!this.state.stopsFiltered[0]}
                className="stop-select"
                onChange={this.updateStop()}
                onMouseDown={this.updateStop()}
                // onClick={this.updateStop()}
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
