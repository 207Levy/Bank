import React from "react";
import { Chart } from "react-google-charts";


export const options = {
  title: "Overall info",
  curveType: "function",
  legend: { position: "bottom" },
};

export function ExpensesTimelineChart(props) {
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={props.expenses}
      options={options}
    />
  );
}
