import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Bus from './bus';

class AnyStopWildCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           buss: []
        }
        this.loadBusss = this.loadBusss.bind(this);
    }

    componentDidMount() {
       this.loadBusss()
    }
    loadBusss (e) {
 // if (this.props.match.params.agency.toUpperCase() === 'SB' || this.props.match.params.agency.toUpperCase() === 'GF') {
        //     axios.get(`https://api.511.org/transit/stoptimetable?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&OperatorRef=${this.props.match.params.agency.toUpperCase()}&MonitoringRef=${this.props.match.params.stop.toUpperCase()}`)
        //     .then(res => {
        //         console.log(res)
        //         let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
        //         this.setState({ buss });
        //     })
        // } else 
        {
            axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.props.match.params.agency.toUpperCase()}&stopCode=${this.props.match.params.stop.toUpperCase()}`)
                .then(res => {
                    let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                    this.setState({ buss });
                })
            }
    }
    render() {
        let busss = <div className="bust">
            No Tracked Vehicles to show. 
            <br></br>
            <span className='update' onClick={() => window.location.reload(false)}>Check again</span>, check your inputs, or check the schedule.
        </div>
        let stop
        if (this.state.buss[0]){
            stop = this.state.buss[0].MonitoredVehicleJourney.MonitoredCall.StopPointName
            let key = 0 
            busss = this.state.buss.map(bus => {
                return <Bus bus={bus} key={key++} />
            })   
        }
        if (this.props.location.state){stop = this.props.location.state.stopName || stop }
        let gFrame
        if (this.props.location.state && this.props.location.state.stopLocation) { 
            gFrame = <iframe title="gFrame" frameBorder="1"
src={`https://www.google.com/maps/embed/v1/place?zoom=13&q=${this.props.location.state.stopLocation.Latitude},${this.props.location.state.stopLocation.Longitude}&key=AIzaSyAIe8CQdaU5qYMgUBimNtNLtz6MKhODsNU`}>Loading Map...</iframe> 
        }
        return (
        <div className='transit-on'>
            <div className="any-stop-wild-card">
            <div className='short-title'>
        {this.props.match.params.agency.toUpperCase()}#{this.props.match.params.stop.toUpperCase()}
            </div>
            <div className="stop-title" onClick={this.loadBusss}>
                { stop }
                <div>Tap to ReFresh</div>
                </div>
                <div className="buss">
             
                    {gFrame}
                    {busss}
            </div>
        </div>
        </div>
       
        );
    }

}
export default withRouter(AnyStopWildCard);