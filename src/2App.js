/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { date, day, week } from './lib/date';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
var dataPoints =[]

let resData= []
class App extends Component {
 
	render() {	
		const options = {
			theme: "light3",
			title: {
				text: "Daily"
			},
			axisY: {
				title: "RTS",
				labelFormatter: this.addSymbols
			},
			axisX: {
				title: "Date",
				labelAngle: 0
			},
			data: [{
				type: "column",
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "#,##0.00",
				dataPoints: dataPoints
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
	
	componentDidMount(){
			fetch('http://192.168.18.26:9000/forecast')
			.then(response => response.json())
			.then(res => {
				const data = res.payload.rows
				data.map(value => {
					dataPoints.push({
						label: date(value.date),
						y: value.RTS
					})
					if (this.chart) {
						this.chart.render()
					}
				})
			})
			}
	}
 
export default App;        