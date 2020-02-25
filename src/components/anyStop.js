import React from 'react';
import axios from 'axios';
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
        axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.props.agency}&stopCode=${this.props.stop}`)
            .then(res => {
                let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                this.setState({ buss });
            })
    }

    render() {
        let busss = <div className="bus">
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
            <div className="buss">
                 {this.props.title 
                ? this.props.title
                : stopName}
                <br></br>
                {busss}
            </div>
        );
    }
}
export default AnyStop;