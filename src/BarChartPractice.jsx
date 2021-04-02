import "./styles.css";
import React from "react";
import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from "d3";
import { randArray, randNum } from "./App";

function BarChartPractice() {
  const myRef = React.useRef();
  const [data, setData] = React.useState(randArray());
  const [tooltip, setTooltip] = React.useState(false);

  React.useEffect(() => {
    const svg = select(myRef.current);

    const xScale = scaleBand()
      .domain(data.map((v, i) => i))
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, Math.max(...data) + 20]) //[minVal,maxVal]
      .range([150, 0]);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);
    svg.select(".y-axis").call(yAxis);

    const addText = () => {
      svg
        .selectAll(".tooltip")
        .data(data)
        .join("text")
        .attr("class", "tooltip")
        .text((v) => v)
        .attr("text-anchor", "middle")
        .attr("x", (value, index) => xScale(index) + xScale.bandwidth() / 2)
        .attr("y", (value, index) => yScale(value) - 5);
      setTooltip(true);
    };

    // Basic bar Chart
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1,-1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .transition()
      .attr("height", (value) => 150 - yScale(value));

    addText();
  }, [data, tooltip, setTooltip]);

  return (
    <div>
      <h1>Basic Bar Chart</h1>
      <svg className="line-chart" ref={myRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br />
      <br />
      <button onClick={() => setData(data.map((d) => d + 5))}>+5</button>
      <button onClick={() => setData(data.filter((d) => d > 50))}>
        filter
      </button>
      <button onClick={() => setData(data.map((d) => d - 5))}>-5</button>
      <button onClick={() => setData([...data, randNum()])}>Add</button>
      <button onClick={() => setData(randArray())}>Re-set</button>
    </div>
  );
}

export default BarChartPractice;
