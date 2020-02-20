import React from 'react';
import axios from 'axios';

class TransitStop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            stopCode: 'EMBR',
            agency: 'BA',
            agencies: [],
            stopLists: {},
            stops: [],
            stopFilter: '',
            stopsFiltered: [],
            stop: {Name: 'Embarcadero'},
            buss: []
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
                        stopLists: {'BA': stops}, 
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
                    // let agency = this.state.agency
                    let stopLists = this.state.stopLists
                    stopLists[this.state.agency] = stops
                    this.setState({ 
                        stop: stop,
                        stopCode: stop.id,
                        stopFilter: '',
                        stopsFiltered: stops,
                        stopLists,
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
            if (e.currentTarget.value.length < 3){
                this.setState({
                    stopCode: e.currentTarget.value
                })
            }
             else if (
                    e.currentTarget.value.length >= 3
                    && this.state.agency !== 'SF'
                    && this.state.agency !== 'AC'
                    && this.state.agency !== 'SM'
                    && this.state.agency !== 'SC'
                    ){
                let stop = this.state.stops.filter(stop=>stop.id.toLowerCase()===e.currentTarget.value.toLowerCase())[0]
                    if (stop) {
                        console.log(stop)
                        this.setState({
                            stopCode: e.currentTarget.value,
                            stopsFiltered: this.state.stops, 
                            // stopFilter: stop.Name,
                            stopFilter: '',
                            stop          
                        })
                    } else {
                        this.setState({
                            stopCode: e.currentTarget.value,
                            stop: {}
                        })
                    }
                axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.state.agency}&stopCode=${e.currentTarget.value.toUpperCase()}`)
                .then(res => {
                let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                    this.setState({ buss });
                })
            } else if (e.currentTarget.value.length>=5){
                let stop = this.state.stops.filter(stop=>stop.id.toLowerCase()===e.currentTarget.value.toLowerCase())[0]
                    if (stop){
                        console.log(stop)
                        this.setState({
                            stopCode: e.currentTarget.value,
                            stopsFiltered: this.state.stops, 
                            // stopFilter: stop.Name,
                            stopFilter: '',
                            stop          
                        })
                } else {
                    this.setState({
                        stopCode: e.currentTarget.value,
                        stop: {}
                    })
                }
                axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.state.agency}&stopCode=${e.currentTarget.value.toUpperCase()}`)
                .then(res => {
                let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                    this.setState({ buss });
                })
            }
            else {
                this.setState({
                    stopCode: e.currentTarget.value
                })
            }
    }
    }
    updateAgency() {
        return e =>     {
            let agency = e.currentTarget.value
            let stops = []
            let stop
        if (this.state.stopLists[agency]){
            stops = this.state.stopLists[agency]
            stop = stops[0]
            this.setState({
                stopFilter: '',
                stopsFiltered: stops,
                stopCode: stop.id,
                buss: [],
                loaded: true,
                stop,
                stops,
                agency
        })
        axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.state.agency}&stopCode=${stops.id}`)
            .then(res => {
                let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                this.setState({ buss });
            })
    } else {
        this.setState({
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
    }
}
    updateStop() {
        return e => {
            let stop = this.state.stopsFiltered[e.currentTarget.value]
                console.log(stop)
                this.setState({
                    stopCode: stop.id,
                    stop 
                })
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
                    console.log(stop)
                    this.setState({
                        stopCode: stop.id,
                        stop
                    })
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
                slow = <div>Loading.....Muni and the VTA have ~3500 stops,<br></br>ACTransit more than 5000.</div>
            }
            else if (this.state.loaded && this.state.stops[0] && this.state.stopFilter){
                slow = <div>
                        Loaded <span className="bold">
                        {this.state.stops.length}
                        </span> stops.<br></br>
                        
                            {this.state.stopsFiltered.length===this.state.stops.length
                            ?''
                            :<><span className="bold">{this.state.stopsFiltered.length}</span> in Filter.</>
                            }
                        
                    </div>
            } 
            else if (this.state.loaded && this.state.stops[0]){
                slow = <div>
                        Loaded <span className="bold">
                        {this.state.stops.length}
                        </span> stops.<br></br>
                    </div>
            }
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
        let stop = {Name: ''}
        let busss = <div className="bus">
                No Tracked Vehicles to show. 
                <br></br>
                <span className='update' onClick={this.loadBusss}>Check again</span>, check your inputs, or check the schedule.
            </div>
        if (this.state.buss[0]){
            stop.Name = this.state.buss[0].MonitoredVehicleJourney.MonitoredCall.StopPointName
            let key = 0 
            busss = this.state.buss.map(bus => {
                if (bus.MonitoredVehicleJourney.OperatorRef!== "BA"){
                    return (
                    <div className="bus" key={key++}>
                        <span className="bold">
                            {bus.MonitoredVehicleJourney.LineRef}
                        </span> => {bus.MonitoredVehicleJourney.DestinationName}
                        <br></br>
                        <span>
                            {this.dateParser(bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)}
                        </span> => <span className="bold">
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
                <span className="short-title">Agency ShortList:</span>
                <br></br>                
                <br></br>                
                <label><input type="radio" onChange={this.updateAgency()} checked={this.state.agency==="SF"} value="SF" />Muni</label>
                <label><input type="radio" onChange={this.updateAgency()} checked={this.state.agency==="AC"} value="AC" />AC</label>
                <br></br>
                <label><input type="radio" onChange={this.updateAgency()} checked={this.state.agency==="GG"} value="GG" />GG</label>
                <label>&nbsp;&nbsp;&nbsp;<input type="radio" onChange={this.updateAgency()} checked={this.state.agency === "BA"} value="BA" />Bart</label>
                <span className="agency-code">{this.state.agency}</span>
            <div className="agencies-string">
                All {this.state.agencies.length} Transit Agencies:
                <div className="politics">
   (too many? i agree! <a target="_blank" href="https://www.seamlessbayarea.org/">Seamless Bay Area</a>)
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
            {this.state.loaded
            ? <button disabled className="stop-loads" >Load Stops</button>
            : <button className="load-stops" onClick={this.loadStops}>Load Stops</button>
            }
                {slow}
            </div>
                <input type="text"
                    value={this.state.stopFilter}
                    className="stop-filter"
                    onChange={this.updateStopFilter()}
                    disabled={!this.state.loaded}
                    placeholder={this.state.stopsFiltered[0]?"Live Filter by Stop Name":"No Stops Loaded"}
                />
                <br></br>
                {/* {this.state.stop.Name} */}
            <select
                disabled={!this.state.stopsFiltered[0]}
                className="stop-select"
                onChange={this.updateStop()}
                onMouseDown={this.updateStop()}               
                >
                {/* <option selected disabled value='0'>
                    {this.state.stop.id ? `${this.state.stop.Name} (${this.state.stop.id})`:''}
                </option> */}
                {stops}
            </select>            
            <div className="stop-info">
                
                <input type="text"
                    value={this.state.stopCode}
                    onChange={this.updateStopCode()}
                    className="stop-id"
                    placeholder="Stop by ID"
                    // disabled={!this.state.loaded}
                />
                <span 
                className="stop-title"> { 
                this.state.stop.Name 
                ? this.state.stop.Name 
                : stop.Name } 
                </span>
            </div>
                { busss }
            </div>
            </div>
        );
    }

}
export default TransitStop;
