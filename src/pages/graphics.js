/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { date} from '../lib/date';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
let dailyRTS =[]
let dailyForecast = []

class GraphicPage extends Component {
 
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	
	render() {
		const options = {
			theme: "light2",
			animationEnabled: true,
			title:{
				text: "RTS and Forecast"
			},
			subtitles: [{
				text: "Click Legend to Hide or Unhide Data Series"
			}],
			axisX: {
				title: "States"
			},
			axisY: {
				title: "Forecast",
				titleFontColor: "black",
				lineColor: "#45CA27",
				labelFontColor: "#45CA27",
				tickColor: "#6D78AD"
			},
			axisY2: {
				title: "RTS",
				titleFontColor: "black",
				lineColor: "#F08117",
				labelFontColor: "#F08117",
				tickColor: "#F08117"
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [{
				type: "column",
				name: "Forecast",
				color: "#69EC4B",
				indexLabel: "{y}",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "#,##0",
				dataPoints: dailyForecast
			},
			{
				type: "spline",
				name: "RTS",
				axisYType: "secondary",
				indexLabel: "{y}",
				color: "#F08117",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "#,##0",
				dataPoints: dailyRTS
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
					dailyRTS.push({
						label: date(value.date),
						y: value.RTS
					})
					dailyForecast.push({
						label: date(value.date),
						y: value.forecast
					})
					if (this.chart) {
						this.chart.render()
					}
				})
			})
			}
	}
 
export default GraphicPage;        