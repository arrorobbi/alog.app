/* App.js */
import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { convertDate, date } from "../lib/date";
//var CanvasJSReact = require('@canvasjs/react-charts');

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

let dailyRTS = [];
let dailyForecast = [];
let dailyUpper = [];

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
const firstDay = convertDate(decreasedDate);

class ActualGraphics extends Component {
  constructor() {
    super();
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }

  toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }

  render() {
    const options = {
      theme: "light2",
      animationEnabled: true,
      title: {
        text: "Forecast and Actual",
      },
      subtitles: [
        {
          text: "Click Legend to Hide or Unhide Data Series",
        },
      ],
      axisY: {
        title: "Actual Forecast",
        titleFontColor: "black",
        lineColor: "black",
        labelFontColor: "black",
        tickColor: "#6D78AD",
      },
      axisY2: {
        title: "Actual Upper",
        titleFontColor: "black",
        suffix: "%",
        lineColor: "black",
        labelFontColor: "black",
        tickColor: "black",
        lineOpacity: 0,
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleDataSeries,
      },
      data: [
        {
          type: "column",
          axisYType: "primary",
          name: "Actual Forecast",
          color: "#F7AA00",
          indexLabel: "{y}",
          showInLegend: true,
          xValueFormatString: "MMM YYYY",
          yValueFormatString: "#,##0",
          dataPoints: dailyForecast,
        },
        {
          type: "column",
          name: "Forecast",
          axisYType: "primary",
          indexLabel: "{y}",
          color: "#40A8C4",
          showInLegend: true,
          xValueFormatString: "MMM YYYY",
          yValueFormatString: "#,##0",
          dataPoints: dailyRTS,
        },
        {
          type: "spline",
          name: "Actual Upper",
          axisYType: "secondary",
          // indexLabel: "{y}%",
          color: "#235784",
          showInLegend: true,
          xValueFormatString: "MMM YYYY",
          yValueFormatString: '#,##0.0"%"',
          dataPoints: dailyUpper,
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }

  componentDidMount() {
    fetch(`http://localhost:9000/forecast/${firstDay}/${convertDate(today)}`)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.payload.rows);
        const data = res.payload.rows;
        data.map((value) => {
          dailyRTS.push({
            label: date(value.date),
            y: value.forecast,
          });
          dailyForecast.push({
            label: date(value.date),
            y: value.actual_forecast,
          });
          dailyUpper.push({
            label: date(value.date),
            y: value.actual_upper,
          });
          if (this.chart) {
            this.chart.render();
          }
        });
      });
  }
}

export default ActualGraphics;
