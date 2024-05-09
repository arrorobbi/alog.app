/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { week } from './lib/date';
//var CanvasJSReact = require('@canvasjs/react-charts');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
var dataPoints =[];
class App extends Component {
	componentDidMount(){
		fetch('http://192.168.18.26:9000/forecast')
		.then(response => response.json())
		.then(data => {
			const db = data.payload.rows
			for(let value of db){
				dataPoints.push({
					label: week(value.date),
					y: value.RTS
				})
			}
			if (this.chart) {
				this.chart.render()
			}
		});
	}
	
	render() {    
		console.log(dataPoints);
		const options = {
			theme: "light3",
			title: {
				text: "Weekly"
			},
			axisX: {
				title: "Week",
				lineColor: "#6D78AD",
			},
			axisY: {
				title: "RTS",
				titleFontColor: "#6D78AD",
				lineColor: "#6D78AD",
				labelFontColor: "#6D78AD",
				tickColor: "#6D78AD"
			},
			data: [{
				type: "column",
				showInLegend: true,
				xValueFormatString: "W",
				yValueFormatString: "#,##0.00",
				dataPoints: dataPoints
			}]
		}
		return (
		<div>
			<CanvasJSChart options={options} 
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		)};
}
 
export default App;                              