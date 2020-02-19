import React from 'react';
import axios from 'axios';

class TransitStop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            stopCode: 'EMBR',
            agency: 'BA',
            buss: [],
            agencies: [],
            stops: [],
            stopFilter: '',
            stopsFiltered: [],
            stop: {Name: 'Embarcadero'}
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
            let agencies = res.data.filter(agency => !!agency.WebSite);
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
                    this.setState({ 
                        stop: stops.filter(stop => stop.Name==='Embarcadero')[0],
                        stopCode: 'EMBR',
                        stopFilter: '',
                        stopsFiltered: stops, 
                        stops
                    });
                    axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.state.agency}&stopCode=${this.state.stopCode?this.state.stopCode:'EMBR'}`).then(res => {
                        let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                        this.setState({ 
                            buss 
                        });
                    })
                    
                }
                else {
                    let stops = res.data.Contents.dataObjects.ScheduledStopPoint;
                    let stop = stops[0]
                    this.setState({ 
                        stop: stop,
                        stopCode: stop.id,
                        stopFilter: '',
                        stopsFiltered: stops,
                        stops 
                    });
                    axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.state.agency}&stopCode=${stop.id}`)
                    .then(res => {
                        let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                        this.setState({ buss });
                    })
                }
            })
    }

    //http://api.511.org/transit/stoptimetable?api_key={your-key}&MonitoringRef=13008&OperatorRef=SF

    dateParser(zulu){
        return new Date(Date.parse(zulu)).toLocaleTimeString()
    }
    updateStopCode() {
        return e => {
            let stop = this.state.stops.filter(stop=>stop.id.toLowerCase()===e.currentTarget.value.toLowerCase())[0]
            if (stop){
                this.setState({
                    stopCode: e.currentTarget.value,
                    stopsFiltered: this.state.stops, 
                    stopFilter: '',
                    stop          
                })
            console.log(stop)
            axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.state.agency}&stopCode=${e.currentTarget.value.toUpperCase()}`)
            .then(res => {
                let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                this.setState({ buss });
            })
            } else {
                this.setState({
                    stopCode: e.currentTarget.value
                })
            }
    }
    }
    updateAgency() {
        return e => this.setState({
            agency: e.currentTarget.value,
            stop: {},
            stops: [],
            stopFilter: '',
            stopsFiltered: [],
            stopCode: '',
            buss: [],
            loaded: false
        })
    }
    updateStop() {
        return e => {
            let stop = this.state.stopsFiltered[e.currentTarget.value]
            this.setState({
            stopCode: stop.id,
            stop 
        })
        console.log(stop)
            axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.state.agency}&stopCode=${stop.id}`)
            .then(res => {
                let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                this.setState({ buss });
            })
    }
    }
    updateStopFilter() {
        return e => {
            if (e.currentTarget.value.length === 1){
                this.setState({
                    stopFilter: e.currentTarget.value,
                    stopsFiltered: this.state.stops
                })
            }
            else if (e.currentTarget.value.length <= this.state.stopFilter.length){
                let filtered = this.state.stops//.filter(stop => stop.Name.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
                this.setState({
                    stopFilter: e.currentTarget.value,
                    stopsFiltered: this.state.stops
                })
            }  
            else if (e.currentTarget.value.length >= 2){
                let stopsFiltered = this.state.stopsFiltered.filter(stop => stop.Name.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
                    this.setState({
                        // stopFilter: stopsFiltered.length>0?e.currentTarget.value:'NO STOPS FOUND',
                        // stopsFiltered: stopsFiltered.length>0?stopsFiltered:this.state.stops
                        stopFilter: e.currentTarget.value,
                        stopsFiltered
                    })
                if (stopsFiltered[0]){
                    let stop = stopsFiltered[0]
                    this.setState({
                        stopCode: stop.id,
                        stop
                    })
                    console.log(stop)
                    axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.state.agency}&stopCode=${stop.id}`)
                    .then(res => {
                        let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                        this.setState({ buss });
                    })
                }
            }
        }
    }
    render() {
        let slow
            if (this.state.loaded && !this.state.stops[0]){
            slow = <div>Loading.....Muni and VTA have ~3500 stops,<br></br>ACTransit more than 5000.</div>
            }else{
            slow = <div>
                    Loaded <span className="bold">
                    {this.state.loaded 
                        && this.state.stops[0]
                        ? this.state.stops.length
                        : '∅'
                    }
                    </span> stops.
                </div>
            }
        let busss = <div className="bus">
            No Tracked Vehicles to show. 
            <br></br>
            <span className='update' onClick={this.loadBusss}>Check again</span>, check your inputs, or check the schedule.
        </div>
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
                if (bus.MonitoredVehicleJourney.OperatorRef!=='BA'){
                    return (
                    <div className="bus" key={key++}>
                        <span className="bold">
                            {bus.MonitoredVehicleJourney.LineRef}
                        </span> => {bus.MonitoredVehicleJourney.DestinationName}
                        <br></br>
                        <span>
                            {this.dateParser(bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)}
                        </span> => <span 
                        className="bold">
                            {this.dateParser(bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)}
                        </span>
                    </div>
                ) 
            }else {
                return (
                    <div className="bus" key={key++}>
                        <span>
                            {bus.MonitoredVehicleJourney.OriginName} 
                        </span> => <span className="bold">
                            {bus.MonitoredVehicleJourney.DestinationName}
                        </span>
                        <br></br>
                        <span>
                            {this.dateParser(bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)}
                        </span> => <span className="bold">
                            {this.dateParser(bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)}
                        </span>
                    </div>
                )
            }
            })   
        }
        return (
            <div className = "stop" >
            <div className="stop-left">
                ShortList:
                <br></br>                
                <br></br>                
                <label><input type="radio" onChange={this.updateAgency()} checked={this.state.agency==="SF"} value="SF" />SF</label>
                <label><input type="radio" onChange={this.updateAgency()} checked={this.state.agency==="AC"} value="AC" />AC</label>
                <br></br>
                <label><input type="radio" onChange={this.updateAgency()} checked={this.state.agency==="GG"} value="GG" />GG</label>
                <label><input type="radio" onChange={this.updateAgency()} checked={this.state.agency==="BA"} value="BA" />Bart</label>
                <span className="agency-code">{this.state.agency}</span>
            <div className="agencies-string">
                All {this.state.agencies.length} Transit Agencies:
                <div className="politics">
   (too many? i agree! SUPPORT <a target="_blank" href="https://www.seamlessbayarea.org/">AB2057</a>)
            </div>
                </div>
            <div className="agency">
                <select
                    className="agency-select"
                    value={this.state.agency}
                    onChange={this.updateAgency()}
                    onMouseDown={this.updateAgency()}
                >
                    {agencies}
                </select>
            </div>
            <hr></hr>
            <div className="slow">
            <button className="load-stops" onClick={this.loadStops}>Load Stops</button>
                {slow}
            </div>
                <input type="text"
                    value={this.state.stopFilter}
                    className="stop-filter"
                    onChange={this.updateStopFilter()}
                    disabled={!this.state.loaded}
                    placeholder={this.state.stopsFiltered[0]?"Live Filter (BackSpace RePopulates StopList)":"No Stops Loaded"}
                />
                <br></br>
            <select
                disabled={!this.state.stopsFiltered[0]}
                className="stop-select"
                onChange={this.updateStop()}
                onMouseDown={this.updateStop()}
                placeholder="No Stops Loaded"
                // onClick={this.updateStop()}
            >
                {stops}
            </select>            
            <div className="stop-info">
                <span>
                    Stop ID:
                </span>
                <input type="text"
                    value={this.state.stopCode}
                    onChange={this.updateStopCode()}
                    className="stop-id"
                    disabled={!this.state.loaded}
                />
                <span className="stop-title">{ this.state.stop.Name } </span>
            </div>
                { busss }
            </div>
            </div>
        );
    }

}
export default TransitStop;
