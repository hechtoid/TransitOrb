import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Bus from './bus'

class AnyStop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           buss: []
        }
        this.loadBusss = this.loadBusss.bind(this)
    }

    componentDidMount() {
        this.loadBusss()
    }
    loadBusss() {
        // if (this.props.agency === 'SB' || this.props.agency === 'GF') {
        //     axios.get(`https://api.511.org/transit/stoptimetable?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&OperatorRef=${this.props.agency}&MonitoringRef=${this.props.stopCode}`)
        //     .then(res => {
        //         let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
        //         this.setState({ buss });
        //     })
        // } else 
        {
        axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.props.agency}&stopCode=${this.props.stopCode}`)
            .then(res => {
                let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                if (this.props.filterIN){buss = buss.filter( bus => this.props.filterIN.includes(bus.MonitoredVehicleJourney.LineRef))} 
                if (this.props.filterOUT){buss = buss.filter( bus => !this.props.filterOUT.includes(bus.MonitoredVehicleJourney.LineRef))}
                if (this.props.limit){buss = buss.slice(0,this.props.limit)}
                this.setState({ buss });
            })
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
        return (
            <div className="any-stop">
                <div className="header">
                    <Link to={`/anystop/${this.props.agency}/${this.props.stopCode}`}>
                        <div className="map-link">
                            <span title="bus stop" role="img" aria-label="bus stop emoji">🚏</span>                  
                            { this.props.title 
                            ? this.props.title
                            : stopName }
                        </div>
                    </Link> 
                </div>
                {busss}
            </div>
        );
    }
}
export default AnyStop;