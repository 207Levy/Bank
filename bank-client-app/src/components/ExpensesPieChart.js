import React from "react";
import { Chart } from "react-google-charts";
import { useState } from "react";
import { useEffect } from "react";



export function ExpensesPieChart(props) {
    const options = {
        title: props.title,
        pieHole: 0.4,
        is3D: false
      };
  return (
    <Chart
      chartType="PieChart"
      data={props.expenses}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
