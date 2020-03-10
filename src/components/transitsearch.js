import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

import Bus from './bus'

class TransitSearch extends React.Component {
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
            stop: { Name: 'Embarcadero' },
            buss: []
        }
        this.loadBusss = this.loadBusss.bind(this);
        this.loadStops = this.loadStops.bind(this);
        this.stopListIntegrator = this.stopListIntegrator.bind(this)
        this.updateStopFilter = this.updateStopFilter.bind(this)
        this.updateStopCode = this.updateStopCode.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.selectID = this.selectID.bind(this)
        
        this.agencyCodeLengthMap = {
            'AM': 3, 'PE': 3, 'VC': 3, 
            'BA': 4, 'EM': 4, 'SA': 4, 
            'AC': 5, 'CT': 5, 'CC': 5, 
            'DE': 5, 'FS': 5, 'GF': 5, 
            'GG': 5, 'MA': 5, 'RV': 5, 
            'SC': 5, 'SF': 5, 'SR': 5, 
            'UC': 5, 'VN': 5, 'WC': 5, 
            'SS': 6, 'WH': 6, 'SM': 6, 
            'ST': 6, 'TD': 6, '3D': 6, 
            'CE': 7, 'CM': 7, 'SO': 7
        }
    }
    selectID = (e) => e.target.select();

    componentDidMount() {
        axios.get(`https://api.511.org/transit/operators?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON`)
        .then(res => {
            let agencies = res.data.filter(agency => !!agency.WebSite);
            this.setState({ agencies });
        })
        this.loadBusss()
    }
    handleSubmit(e){
        e.preventDefault()
        this.loadBusss()
    }
    loadBusss(agency = this.state.agency, stopCode = this.state.stopCode) {
        axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${agency}&stopCode=${stopCode}`)
            .then(res => {
                let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                this.setState({ buss });
            })
    }

    updateAgency(e) {
        return e =>     {
            let agency = e.currentTarget.value
            let stops = []
            let stop
        if (this.state.stopLists[agency]) {
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
        this.loadBusss( agency, stop.id )
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
    loadStops(e) {
        this.setState({ loaded: true })
        axios.get(`${process.env.PUBLIC_URL}/stopLists/stopList${this.state.agency}.json`)
            .then(res =>{this.stopListIntegrator(res)})
            .catch( (err) => {
                axios.get(`https://api.511.org/transit/stops?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&operator_id=${this.state.agency}`) 
                .then (res =>{this.stopListIntegrator(res)})
            })
    }    
    stopListIntegrator(res) {
        if (this.state.agency === "BA") {
            let stops = res.data.Contents.dataObjects.ScheduledStopPoint.filter(stop => !stop.id.includes('place') && !stop.Name.includes('Enter/Exit :'))
            let stopCode = this.state.stopCode || 'EMBR'
            let stop = stops.filter(stop => stop.id === stopCode.toUpperCase())[0] || stops.filter(stop => stop.id === 'EMBR')[0]
            this.setState({
                stopFilter: '',
                stopsFiltered: stops,
                stopLists: {'BA': stops},
                stopCode: stop.id,
                stops,
                stop
            });
            this.loadBusss( this.state.agency, stop.id )
        }
        else {
            let stops = res.data.Contents.dataObjects.ScheduledStopPoint;
            let stop = stops.filter(stop => stop.id === this.state.stopCode.toUpperCase())[0] || stops[0]
            let stopLists = this.state.stopLists
            stopLists[this.state.agency] = stops
            this.setState({
                stopCode: stop.id,
                stopFilter: '',
                stopsFiltered: stops,
                stopLists,
                stops,
                stop
            });
            this.loadBusss( this.state.agency, stop.id )
        }
    }
    updateStop(e) {
        return e => {
            let stop = this.state.stopsFiltered[e.currentTarget.value]
                this.setState({
                    stopCode: stop.id,
                    stop
                })
            this.loadBusss(  this.state.agency, stop.id )
        }
    }
    updateStopFilter(e) {
        return e => {
            let stopFilter = e.currentTarget.value
            if (stopFilter.length === 1 && this.state.stopsFiltered.length < this.state.stops.length) {
                this.setState({ stopsFiltered: this.state.stops })
            }
            if (stopFilter.length < 3) {
                this.setState({ stopFilter })
            }
            else if (stopFilter.length <= this.state.stopFilter.length) {
                this.setState({stopFilter})
                if (this.state.stopsFiltered.length !== this.state.stops.length) {
                    this.setState({ stopsFiltered: this.state.stops })
                }
            }
            else if (stopFilter.length >= 3) {
                this.setState({ stopFilter })
                let searchTerms = stopFilter.toLowerCase().split(" ")
                let stopsFiltered = this.state.stopsFiltered.filter(
                    stop => searchTerms.every(term => stop.Name.toLowerCase().includes(term)))
                this.setState({ stopsFiltered })
                if (stopsFiltered[0]) {
                    let stop = stopsFiltered[0]
                    if (this.state.stopCode !== stop.id) {
                        this.setState({
                            stopCode: stop.id,
                            stop
                        })
                        this.loadBusss(  this.state.agency, stop.id )
                    }
                }
            }
        }
    }
    updateStopCode(e) {
        return e => {
            let stopCode = e.currentTarget.value
            if (stopCode.length <= this.agencyCodeLengthMap[this.state.agency]) {
                this.setState({
                    stopCode
                })
            }
            if (stopCode.length === this.agencyCodeLengthMap[this.state.agency]) {
                let stoppCode = stopCode.toUpperCase()
                axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.state.agency}&stopCode=${stoppCode}`)
                .then(res => {
                    let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                    this.setState({  buss })
                    if (buss[0]) {this.setState({ stopCode: stoppCode })}
                })         
                if (this.state.stops) {
                let stop = this.state.stops.filter(stop => stop.id.toUpperCase() === stoppCode)[0]
                    if (stop) {
                        this.setState({
                            stopsFiltered: this.state.stops,
                            stopFilter: '',
                            stopCode: stoppCode,
                            stop
                        })
                    } else {
                        this.setState({
                            stop: {},
                        })
                    }
                }
            }
        }
    }
    render() {
        let slow
            if (this.state.loaded && !this.state.stops[0]) {
                slow = <div><span>Muni and the VTA have <span className="stops-number">~3500</span> stops,</span><br></br><span>ACTransit more than <span className="stops-number">5000</span>.</span></div>
            }
            else if (this.state.loaded && this.state.stops[0] && this.state.stopFilter) {
                slow = <div>
                        Loaded <span className="stops-number">
                        {this.state.stops.length}
                        </span> stops.<br></br>
                            { this.state.stopsFiltered.length===this.state.stops.length
                            ? ''
                            : <><span className="stops-number">{this.state.stopsFiltered.length}</span> in Filter.</> }
                    </div>
            }
            else if (this.state.loaded && this.state.stops[0]) {
                slow = <div>
                        Loaded <span className="stops-number">
                        {this.state.stops.length}
                        </span> stops.<br></br>
                    </div>
            }

        let agencies
        if (this.state.agencies) {
            let key = 0
            agencies = this.state.agencies.map(agency => {
                return (
                        <option value={agency.Id} key={key++}>
                            {agency.ShortName
                            ? agency.ShortName
                            : agency.Name } {
                            agency.ShortName && agency.ShortName !== agency.Name
                            ? `(${agency.Name})`
                            : '' }
                         </option>
                )
            })
        }
        let stops
        if (this.state.stopsFiltered) {
            let key = 0
            stops = this.state.stopsFiltered.map(stop => {
                return (
                        <option key={key} value={key++}>
                            {stop.Name} ({stop.id})
                        </option>
                )
            })
        }
        let stopName = ''
        let busss = <div className="bust">
                No Tracked Vehicles.
                <br></br>
                <span className='update' onClick={this.handleSubmit}>Check again</span>, check your inputs, or check the schedule.
            </div>
        if (this.state.buss[0]) {
            stopName = this.state.buss[0].MonitoredVehicleJourney.MonitoredCall.StopPointName
            let key = 0
            busss = this.state.buss.map(bus => { 
                return <Bus bus={bus} key={key++} /> 
            })
        }
        let locationLink
        if (this.state.stopCode.length === this.agencyCodeLengthMap[this.state.agency]){
            locationLink = 
            <Link 
            to={`/anystop/${this.state.agency}/${this.state.stopCode}`}>
                <div className="map-link">
                    View Stop
                </div>
            </Link>}
        if (this.state.stop.Location){
            let stop = this.state.stop
            locationLink = 
            <Link 
            to={{
                pathname: `/anystop/${this.state.agency}/${this.state.stop.id}`,
                state: {
                    stop
                }
            }}>
                <div className="map-link">
                    View Stop
                </div>
            </Link>
        }
return (
    <div className={ this.props.location.pathname === '/search'
                    ? "transit-stop"
                    : "transit-off" } >
        <div className="agency-upper">
       
            <div className="radios">
                <div className="short-title">Agency ShortList:</div>
                <div className="radio-one">
                    <label>
                        <input type="radio" 
                            onChange={this.updateAgency()} 
                            checked={this.state.agency==="SF"} 
                            value="SF" />
                        SF
                    </label>
                    <label>
                        <input type="radio" 
                            onChange={this.updateAgency()} 
                            checked={this.state.agency==="GG"} 
                            value="GG" />
                        GG
                    </label>
                    <label>
                        &nbsp;&nbsp;&nbsp;
                        <input type="radio" 
                            onChange={this.updateAgency()} 
                            checked={this.state.agency === "BA"} 
                            value="BA" />
                        Bart
                    </label>
                </div>
                <div className="radio-two">
                    <label>
                        <input type="radio" 
                            onChange={this.updateAgency()} 
                            checked={this.state.agency==="AC"} 
                            value="AC" />
                        AC
                    </label>
                    <label>
                        <input type="radio" 
                            onChange={this.updateAgency()} 
                            checked={this.state.agency === "SM"} 
                            value="SM" />
                        Sam
                    </label>
                    <label>
                        <input type="radio" 
                            onChange={this.updateAgency()} 
                            checked={this.state.agency==="MA"} 
                            value="MA" />
                        Marin
                    </label>
                </div>
            </div>
            <span className="agency-code">{this.state.agency}</span>
        </div>
        <div className="agencies-string">
            All {this.state.agencies.length} Transit Agencies:
        </div>
        <div className="agency">
            <select
                className="agency-select"
                value={this.state.agency}
                onChange={this.updateAgency()}
                onMouseDown={this.updateAgency()} >
                {agencies}
            </select>
            <div className="politics">
                (too many? i agree! <a 
                    href="https://www.seamlessbayarea.org/" target="_blank" rel="noopener noreferrer">
                Seamless Bay Area</a>)
            </div>
        </div>
    <hr></hr>
        <div className="slow">
            {!this.state.loaded
            ? <button className="load-stops" onClick={this.loadStops}>Load Stops</button>
            : this.state.stops[0]
                ? <button disabled className="stop-loads" >Loaded</button>
                : <button disabled className="stop-loads" >Loading</button> }
            {slow}
        </div>
        <select
            disabled={!this.state.stopsFiltered[0]}
            className="stop-select"
            onChange={this.updateStop()} >
            {this.state.stop.id
            ? <option selected disabled hidden value='0'>
                {this.state.stop.Name} ({this.state.stop.id})
            </option>
            :''}
            {stops}
        </select>
    <br></br>
        <input type="text"
            //onPaste={}
            value={this.state.stopFilter}
            className="stop-filter"
            onChange={this.updateStopFilter()}
            disabled={!this.state.loaded}
            placeholder={this.state.loaded?"Type to Search":"Load Stops to Search"} />
    <br></br>
        <div className="stop-info">
            <div className="stop-title" onClick={this.handleSubmit}>
                { this.state.stop.Name
                ? this.state.stop.Name
                : stopName }
                <div>Tap to ReFresh</div>
            </div>
            <div>
                <input 
                    type={(this.state.agency ==='BA'||this.state.agency ==='AM')?"text":"number"}
                    id="stop-id"
                    placeholder="Stop Code"
                    value={this.state.stopCode}
                    onFocus={this.selectID}
                    onChange={this.updateStopCode()} />
                {locationLink}
            </div>

        </div>
    {busss}
</div>
);
    }
}
export default withRouter(TransitSearch);
