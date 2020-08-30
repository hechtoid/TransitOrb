import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Bus from './bus';

class AnyStopWildCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stopCode: this.props.match.params.stopCode ? this.props.match.params.stopCode.toUpperCase() : '',
            agency: this.props.match.params.agency ? this.props.match.params.agency.toUpperCase() : 'SF',
            stop: this.props.location.state  ? this.props.location.state.stop : {},
            buss: []
        }
        this.loadBusss = this.loadBusss.bind(this);
        this.loadStopList = this.loadStopList.bind(this)
        this.stopListIntegrator = this.stopListIntegrator.bind(this)
        this.updateStopCode = this.updateStopCode.bind(this)
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
       document.title=`transitYourself - Live Departures - ${this.state.agency} ${this.state.stopCode?`#${this.state.stopCode}`:''}`
       this.loadBusss()
    }
    loadBusss() {
            if (this.state.stopCode.length === this.agencyCodeLengthMap[this.state.agency]) {
            axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.state.agency}&stopCode=${this.state.stopCode}`)
                .then(res => {
                    let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                    this.setState({ buss });
                })
                .catch(this.setState({ buss: [] }))   
        }
    }
    loadStopList() {
            axios.get(`${process.env.PUBLIC_URL}/stopLists/stopList${this.state.agency}.json`)
            .then(res =>{this.stopListIntegrator(res)})
            .catch( (err) => {
                axios.get(`https://api.511.org/transit/stops?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&operator_id=${this.state.agency}`) 
                .then (res =>{this.stopListIntegrator(res)})
            })
    }
    stopListIntegrator(res) {
        let stops = res.data.Contents.dataObjects.ScheduledStopPoint;
        let stop = stops.filter(stop => stop.id === this.state.stopCode.toUpperCase())[0] || {}
        this.setState({stop})
    }
    updateStopCode(e) {
        return e => {
            let stopCode = e.currentTarget.value
            if (stopCode.length <= this.agencyCodeLengthMap[this.state.agency]) {
                this.setState({
                    stopCode
                })}
            if (stopCode.length === this.agencyCodeLengthMap[this.state.agency]) {
                let stoppCode = stopCode.toUpperCase()
                this.props.history.push(`/anystop/${this.state.agency}/${stoppCode}`)
                axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.state.agency}&stopCode=${stoppCode}`)
                    .then(res => {
                        let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                        this.setState({ buss, stopCode: stoppCode });
                        document.title=`transitYourself - Live Departures - ${this.state.agency} #${stoppCode}`
            })
                    .catch(this.setState({ buss: [] }))
            }
        }
    }
    render() {
        let busss = <div className="bust">
            No Tracked Vehicles to show. 
            <br></br>
            <span className='update' onClick={this.loadBusss}>Check again</span>, check your inputs, or check the schedule.
        </div>
        let stopName
        if (this.state.buss[0]){
            stopName = this.state.buss[0].MonitoredVehicleJourney.MonitoredCall.StopPointName
            let key = 0 
            busss = this.state.buss.map(bus => {
                return <Bus bus={bus} key={key++} />
            })   
        }
        let gFrame = <button disabled className="stop-loads" >Show Map</button>
        if (this.state.stopCode.length === this.agencyCodeLengthMap[this.state.agency]) {
            gFrame = <button className="load-stops" onClick={this.loadStopList}>Show Map</button>
        }
        if (this.state.stop.Location && this.state.stopCode.toUpperCase() === this.state.stop.id) { 
            gFrame = <iframe title="gFrame" frameBorder="1"
                    src={`https://www.google.com/maps/embed/v1/place?zoom=16&q=${this.state.stop.Location.Latitude},${this.state.stop.Location.Longitude}&key=AIzaSyAIe8CQdaU5qYMgUBimNtNLtz6MKhODsNU`}>
                        Loading Map...
                    </iframe> 
        }
        return (
            <div className="any-stop-wild-card">
                <div className='short-title'>
                    {this.state.agency} {this.props.match.params.stopCode?'#'+this.props.match.params.stopCode.toUpperCase():''}
                </div>
                <input  
                    type={(this.state.agency ==='BA'||this.state.agency ==='AM')?"text":"number"}
                    id="stop-id"
                    placeholder="Stop Code"
                    value={this.state.stopCode}
                    onFocus={this.selectID}
                    onChange={this.updateStopCode()} />
                <div className="g-frame">
                    {gFrame}
                </div>
                <div className="stop-title" onClick={this.loadBusss}>
                    { this.state.stop.Name && this.state.stopCode.toUpperCase() === this.state.stop.id
                    ? this.state.stop.Name
                    : stopName }
                    <div>Tap to ReFresh</div>
                </div>
                <div className="buss">
                    {busss}
                </div>
            </div>
);
    }

}
export default withRouter(AnyStopWildCard);
