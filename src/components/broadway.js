import React from 'react';
import axios from 'axios';

class Broadway extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buss: []

        }
        this.dateParser=this.dateParser.bind(this)
    }

    componentDidMount() {
        axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=SF&stopCode=13082`)
        .then(res => {
            let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
            this.setState({ buss });
        })
    }

    dateParser(zulu){
        return new Date(Date.parse(zulu)).toLocaleTimeString()
    }

    render() {
        let busss
        if (this.state.buss){
            let key = 0
            busss = this.state.buss.map(bus=>{
                return(
                    <div className="bus" key={key++}>
                        <span className="line">{bus.MonitoredVehicleJourney.LineRef}</span> => {bus.MonitoredVehicleJourney.DestinationName}
                        <br></br>
                        <span className="aimed">{this.dateParser(bus.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime)}</span> => <span className="expected">{this.dateParser(bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)}</span>
                    </div>
                )
            })    
        }
        return (
            <div className="buss">
               	BroadWay
                {busss}
            </div>
        );
    }

}
export default Broadway;
