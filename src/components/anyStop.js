import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AnyStop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           buss: []
        }
        this.dateParser=this.dateParser.bind(this)
    }

    componentDidMount() {
        axios.get(`https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=${this.props.agency}&stopCode=${this.props.stop}`)
            .then(res => {
                let buss = res.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
                this.setState({ buss });
            })
    }

    dateParser(zulu){
        return new Date(Date.parse(zulu)).toLocaleTimeString()
    }

    render() {
        let busss = <div className="bus">
            No Tracked Vehicles to show. 
            <br></br>
            <span className='update' onClick={() => window.location.reload(false)}>Check again</span>, check your inputs, or check the schedule.
        </div>
        let stopName
        if (this.state.buss[0]){
            stopName = this.state.buss[0].MonitoredVehicleJourney.MonitoredCall.StopPointName
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
export default withRouter(AnyStop);
// export default AnyStop;