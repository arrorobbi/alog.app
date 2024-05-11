/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { convertDate, date} from '../lib/date';
//var CanvasJSReact = require('@canvasjs/react-charts');

const CanvasJSChart = CanvasJSReact.CanvasJSChart;


let dailyRTS =[]
let dailyForecast = []
let dailyUpper = []


// Create a new Date object representing the current date
const today = new Date();

// Get the month and year components of the current date
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

// Decrease the month by 1
currentMonth -= 1;

// Handle cases where the current month is January
if (currentMonth < 0) {
  currentMonth = 11; // Set to December
  currentYear -= 1; // Subtract 1 from the year
}

// Create a new Date object representing the decreased date
const decreasedDate = new Date(currentYear, currentMonth, today.getDate());
const firstDay = convertDate(decreasedDate)



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
				lineColor: "black",
				labelFontColor: "black",
				tickColor: "#6D78AD"
			},
			axisY2: {
				title: "Upper",
				titleFontColor: "black",
				suffix: "%",
				lineColor: "black",
				labelFontColor: "black",
				tickColor: "black"
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
				axisYType: "primary",
				name: "Forecast",
				color: "#F4913A",
				indexLabel: "{y}",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "#,##0",
				dataPoints: dailyForecast
			},
			{
				type: "column",
				name: "RTS",
				axisYType: "primary",
				indexLabel: "{y}",
				color: "#1DEE53",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "#,##0",
				dataPoints: dailyRTS
			},
			{
				type: "spline",
				name: "Upper",
				axisYType: "secondary",
				// indexLabel: "{y}%",
				color: "#264CF3",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "#,##0.0\"%\"",
				dataPoints: dailyUpper
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
			fetch(`http://192.168.18.26:9000/forecast/${firstDay}/${convertDate(today)}`)
			.then(response => response.json())
			.then(res => {
				console.log(res.payload);
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
					dailyUpper.push({
						label: date(value.date),
						y: value.upper
					})
					if (this.chart) {
						this.chart.render()
					}
				})
			})
			}
	}
 
export default GraphicPage;        