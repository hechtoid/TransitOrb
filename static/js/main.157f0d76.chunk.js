(this.webpackJsonpreact511=this.webpackJsonpreact511||[]).push([[0],{34:function(e,t,a){e.exports=a(63)},39:function(e,t,a){},40:function(e,t,a){},63:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(29),i=a.n(s),o=(a(39),a(40),a(30)),l=a(13),c=a(33),u=a(6),d=a(7),m=a(10),p=a(8),h=a(2),v=a(9),b=a(3),f=a.n(b),y=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={buss:[]},a.dateParser=a.dateParser.bind(Object(h.a)(a)),a}return Object(v.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this;f.a.get("https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=SF&stopCode=16750").then((function(t){var a=t.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;e.setState({buss:a})}))}},{key:"dateParser",value:function(e){return new Date(Date.parse(e)).toLocaleTimeString()}},{key:"render",value:function(){var e,t=this;if(this.state.buss){var a=0;e=this.state.buss.map((function(e){if("45"===e.MonitoredVehicleJourney.LineRef)return r.a.createElement("div",{className:"bus",key:a++},r.a.createElement("span",{className:"bold"},e.MonitoredVehicleJourney.LineRef)," => ",e.MonitoredVehicleJourney.DestinationName,r.a.createElement("br",null),r.a.createElement("span",null,t.dateParser(e.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime))," => ",r.a.createElement("span",{className:"bold"},t.dateParser(e.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)))}))}return r.a.createElement("div",{className:"buss"},"Union",e)}}]),t}(r.a.Component),g=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={buss:[]},a.dateParser=a.dateParser.bind(Object(h.a)(a)),a}return Object(v.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this;f.a.get("https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=SF&stopCode=16513").then((function(t){var a=t.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;e.setState({buss:a})}))}},{key:"dateParser",value:function(e){return new Date(Date.parse(e)).toLocaleTimeString()}},{key:"render",value:function(){var e,t=this;if(this.state.buss){var a=0;e=this.state.buss.map((function(e){if("30"===e.MonitoredVehicleJourney.LineRef||"45"===e.MonitoredVehicleJourney.LineRef||"91"===e.MonitoredVehicleJourney.LineRef)return r.a.createElement("div",{className:"bus",key:a++},r.a.createElement("span",{className:"bold"},e.MonitoredVehicleJourney.LineRef)," => ",e.MonitoredVehicleJourney.DestinationName,r.a.createElement("br",null),r.a.createElement("span",null,t.dateParser(e.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime))," => ",r.a.createElement("span",{className:"bold"},t.dateParser(e.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)))}))}return r.a.createElement("div",{className:"buss"},"Stockton",e)}}]),t}(r.a.Component),E=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={buss:[]},a.dateParser=a.dateParser.bind(Object(h.a)(a)),a}return Object(v.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this;f.a.get("https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=GG&stopCode=42006").then((function(t){var a=t.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;e.setState({buss:a})}))}},{key:"dateParser",value:function(e){return new Date(Date.parse(e)).toLocaleTimeString()}},{key:"render",value:function(){var e,t=this;if(this.state.buss){var a=0;e=this.state.buss.map((function(e){if("4"===e.MonitoredVehicleJourney.LineRef)return r.a.createElement("div",{className:"bus",key:a++},r.a.createElement("span",{className:"bold"},e.MonitoredVehicleJourney.LineRef)," => ",e.MonitoredVehicleJourney.DestinationName,r.a.createElement("br",null),r.a.createElement("span",null,t.dateParser(e.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime))," => ",r.a.createElement("span",{className:"bold"},t.dateParser(e.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)))}))}return r.a.createElement("div",{className:"buss"},"Sansome",e)}}]),t}(r.a.Component),S=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={buss:[]},a.dateParser=a.dateParser.bind(Object(h.a)(a)),a}return Object(v.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this;f.a.get("https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=GG&stopCode=40032").then((function(t){var a=t.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;e.setState({buss:a})}))}},{key:"dateParser",value:function(e){return new Date(Date.parse(e)).toLocaleTimeString()}},{key:"render",value:function(){var e,t=this;if(this.state.buss){var a=0;e=this.state.buss.map((function(e){return r.a.createElement("div",{className:"bus",key:a++},r.a.createElement("span",{className:"bold"},e.MonitoredVehicleJourney.LineRef)," => ",e.MonitoredVehicleJourney.DestinationName,r.a.createElement("br",null),r.a.createElement("span",null,t.dateParser(e.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime))," => ",r.a.createElement("span",{className:"bold"},t.dateParser(e.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)))}))}return r.a.createElement("div",{className:"buss"},"Van Ness",e)}}]),t}(r.a.Component),N=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={buss:[]},a.dateParser=a.dateParser.bind(Object(h.a)(a)),a}return Object(v.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this;f.a.get("https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=SF&stopCode=13082").then((function(t){var a=t.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;e.setState({buss:a})}))}},{key:"dateParser",value:function(e){return new Date(Date.parse(e)).toLocaleTimeString()}},{key:"render",value:function(){var e,t=this;if(this.state.buss){var a=0;e=this.state.buss.map((function(e){return r.a.createElement("div",{className:"bus",key:a++},r.a.createElement("span",{className:"bold"},e.MonitoredVehicleJourney.LineRef)," => ",e.MonitoredVehicleJourney.DestinationName,r.a.createElement("br",null),r.a.createElement("span",null,t.dateParser(e.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime))," => ",r.a.createElement("span",{className:"bold"},t.dateParser(e.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)))}))}return r.a.createElement("div",{className:"buss"},"BroadWay",e)}}]),t}(r.a.Component),M=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={loaded:!1,stopCode:"16513",agency:"SF",buss:[],agencies:[],stops:[],stopFilter:"",stopsFiltered:[],stop:{}},a.dateParser=a.dateParser.bind(Object(h.a)(a)),a.loadBusss=a.loadBusss.bind(Object(h.a)(a)),a.loadStops=a.loadStops.bind(Object(h.a)(a)),a.updateStopFilter=a.updateStopFilter.bind(Object(h.a)(a)),a}return Object(v.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this;f.a.get("https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=".concat(this.state.agency,"&stopCode=").concat(this.state.stopCode)).then((function(t){var a=t.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;e.setState({buss:a})})),f.a.get("https://api.511.org/transit/operators?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON").then((function(t){var a=t.data.filter((function(e){return!!e.WebSite}));e.setState({agencies:a})}))}},{key:"loadBusss",value:function(e){var t=this;f.a.get("https://api.511.org/transit/StopMonitoring?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&agency=".concat(this.state.agency,"&stopCode=").concat(this.state.stopCode)).then((function(e){var a=e.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;t.setState({buss:a})}))}},{key:"loadStops",value:function(e){var t=this;this.setState({loaded:!0}),f.a.get("https://api.511.org/transit/stops?api_key=72939361-85f9-4019-aa55-d62e4e7e2e59&Format=JSON&operator_id=".concat(this.state.agency)).then((function(e){if("BA"===t.state.agency){var a=e.data.Contents.dataObjects.ScheduledStopPoint.filter((function(e){return!e.id.includes("place")&&!e.Name.includes("Enter/Exit :")}));t.setState({stops:a,stopsFiltered:a})}else{var n=e.data.Contents.dataObjects.ScheduledStopPoint;t.setState({stops:n,stopsFiltered:n})}}))}},{key:"dateParser",value:function(e){return new Date(Date.parse(e)).toLocaleTimeString()}},{key:"updateStopCode",value:function(){var e=this;return function(t){return e.setState({stopCode:t.currentTarget.value})}}},{key:"updateAgency",value:function(){var e=this;return function(t){return e.setState({agency:t.currentTarget.value})}}},{key:"updateStop",value:function(){var e=this;return function(t){e.setState({stopCode:e.state.stopsFiltered[t.currentTarget.value].id,stop:e.state.stopsFiltered[t.currentTarget.value]})}}},{key:"updateStopFilter",value:function(){var e=this;return function(t){if(t.currentTarget.value){if(0===t.currentTarget.value.length)e.setState({stopFilter:"",stopsFiltered:e.state.stops});else if(1===t.currentTarget.value.length)e.setState({stopFilter:t.currentTarget.value,stopsFiltered:e.state.stops});else if(t.currentTarget.value.length<=e.state.stopFilter.length){e.state.stops;e.setState({stopFilter:t.currentTarget.value,stopsFiltered:e.state.stops})}else if(t.currentTarget.value.length>=2){var a=e.state.stopsFiltered.filter((function(e){return e.Name.toLowerCase().includes(t.currentTarget.value.toLowerCase())}));e.setState({stopFilter:t.currentTarget.value,stopsFiltered:a})}}else e.setState({stopFilter:"",stopsFiltered:e.state.stops})}}},{key:"render",value:function(){var e,t,a,n=this,s=r.a.createElement("div",{className:"bus"},"No Tracked Vehicles.",r.a.createElement("br",null),"Update Above, or check the schedule.");if(this.state.agencies){var i=0;a=this.state.agencies.map((function(e){return r.a.createElement("option",{value:e.Id,key:i++},e.ShortName?e.ShortName:e.Name," ",e.ShortName&&e.ShortName!==e.Name?"(".concat(e.Name,")"):"")}))}if(this.state.stopsFiltered){var o=0;t=this.state.stopsFiltered.map((function(e){return r.a.createElement("option",{key:o,value:o++},e.Name," (",e.id,")")}))}if(this.state.buss[0]){console.log(this.state.buss[0]);var l=0;s=this.state.buss.map((function(t){return e=t.MonitoredVehicleJourney.MonitoredCall.StopPointName,"BA"!==t.MonitoredVehicleJourney.OperatorRef?r.a.createElement("div",{className:"bus",key:l++},r.a.createElement("span",{className:"bold"},t.MonitoredVehicleJourney.LineRef)," => ",t.MonitoredVehicleJourney.DestinationName,r.a.createElement("br",null),r.a.createElement("span",null,n.dateParser(t.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime))," => ",r.a.createElement("span",{className:"bold"},n.dateParser(t.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime))):r.a.createElement("div",{className:"bus",key:l++},r.a.createElement("span",null,t.MonitoredVehicleJourney.OriginName)," => ",r.a.createElement("span",{className:"bold"},t.MonitoredVehicleJourney.DestinationName),r.a.createElement("br",null),r.a.createElement("span",null,n.dateParser(t.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime))," => ",r.a.createElement("span",{className:"bold"},n.dateParser(t.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)))}))}return r.a.createElement("div",{className:"stop"},r.a.createElement("div",{className:"stop-left"},"ShortList:",r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("label",{id:"sf"},r.a.createElement("input",{type:"radio",onChange:this.updateAgency(),checked:"SF"===this.state.agency,value:"SF"}),"SF"),r.a.createElement("label",null,r.a.createElement("input",{type:"radio",onChange:this.updateAgency(),checked:"AC"===this.state.agency,value:"AC"}),"AC"),r.a.createElement("br",null),r.a.createElement("label",null,r.a.createElement("input",{type:"radio",onChange:this.updateAgency(),checked:"GG"===this.state.agency,value:"GG"}),"GG"),r.a.createElement("label",null,r.a.createElement("input",{type:"radio",onChange:this.updateAgency(),checked:"BA"===this.state.agency,value:"BA"}),"Bart"),r.a.createElement("span",{className:"agency-code"},this.state.agency),r.a.createElement("div",{className:"agencies-string"},"All ",this.state.agencies.length," Transit Agencies:",r.a.createElement("span",{className:"politics"},"(Too many! ",r.a.createElement("a",{target:"_blank",href:"https://www.seamlessbayarea.org/"},"AB2057"),")")),r.a.createElement("div",{className:"agency"},r.a.createElement("select",{className:"agency-select",value:this.state.agency,onChange:this.updateAgency(),onMouseDown:this.updateAgency()},a)),r.a.createElement("div",{className:"slow"},r.a.createElement("button",{className:"load-stops",onClick:this.loadStops},"Load Stops"),this.state.loaded?r.a.createElement("div",null,"Loading.....Muni and VTA have ~3500 stops,",r.a.createElement("br",null),"ACTransit more than 5000."):r.a.createElement("div",null)),r.a.createElement("input",{type:"text",value:this.state.stopFilter,className:"stop-filter",onChange:this.updateStopFilter(),placeholder:"Live Filter (BackSpace RePopulates StopList)"}),r.a.createElement("br",null),r.a.createElement("select",{disabled:!this.state.stopsFiltered[0],className:"stop-select",onChange:this.updateStop(),onMouseDown:this.updateStop()},t),r.a.createElement("form",{onSubmit:this.loadBusss},"Stop ID:",r.a.createElement("input",{type:"text",value:this.state.stopCode,onChange:this.updateStopCode(),className:"stop-id"}),r.a.createElement("input",{type:"submit",value:"Update Arrivals"}),r.a.createElement("br",null))),r.a.createElement("div",{className:"stop-right"},r.a.createElement("span",{className:"stop-title"},e," "),s))}}]),t}(r.a.Component);var k=function(){var e=Object(n.useState)("user"),t=Object(c.a)(e,2),a=t[0],s=t[1];return r.a.createElement("div",{className:"transit-master"},r.a.createElement("div",{className:"transit-switcher"},r.a.createElement("div",{className:"busemoji"},r.a.createElement("a",{href:"https://github.com/hechtoid/react511",target:"_blank"},"\ud83d\ude8c")),r.a.createElement("div",{id:"marin",className:"marin"===a?"transit-switch-on":"transit-switch-off",onClick:function(){return s("marin")}},"MARIN"),r.a.createElement("div",{className:"frisco"===a?"transit-switch-on":"transit-switch-off",onClick:function(){return s("frisco")}},"FRISCO"),r.a.createElement("div",{className:"user"===a?"transit-switch-on":"transit-switch-off",onClick:function(){return s("user")}},"USER"),r.a.createElement("div",{className:"five-eleven"},r.a.createElement("a",{href:"https://511.org/open-data/transit",target:"_blank"},r.a.createElement("img",{className:"five-eleven",src:"http://proxy-prod.511.org/assets/img/branding/511_original_web.png"})))),r.a.createElement("div",{className:"transit"},r.a.createElement("div",{className:"marin"===a?"transit-on":"transit-off"},r.a.createElement(E,null),r.a.createElement(S,null)),r.a.createElement("div",{className:"frisco"===a?"transit-on":"transit-off"},r.a.createElement(g,null),r.a.createElement(y,null),r.a.createElement(N,null)),r.a.createElement("div",{className:"user"===a?"transit-on":"transit-off"},r.a.createElement(M,null))))};var C=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(o.a,null,r.a.createElement(l.a,{exact:!0,path:"/transit",component:k})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[34,1,2]]]);
//# sourceMappingURL=main.157f0d76.chunk.js.map