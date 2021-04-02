import "./styles.css";
import React from "react";
import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from "d3";
import { randArray, randNum } from "./App";

export default function BarChart() {
  const svgRef = React.useRef();
  const [data, setData] = React.useState(randArray());
  React.useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain(data.map((v, i) => i)) // need to provide array of value to display in x-axis eg [0,1,2,3,4,5,6]
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, Math.max(...data) + 20]) //[minVal,maxVal]
      .range([150, 0]);

    const colorScale = scaleLinear()
      .domain([50, 100, 150]) //domain([0, Math.max(...data) + 10])
      .range(["green", "orange", "red"])
      .clamp(true);

    const xAxis = axisBottom(xScale).ticks(data.length);

    const yAxis = axisLeft(yScale);

    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);
    svg.select(".y-axis").call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1,-1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (event, value) => {
        const index = svg.selectAll(".bar").nodes().indexOf(event.target);

        svg
          .selectAll(".tooltip")
          .data([value])
          .join((enter) => enter.append("text").attr("y", yScale(value) - 4))
          .attr("class", "tooltip")
          .text(value)
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(value) - 8)
          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("fill", colorScale)
      .attr("height", (value) => 150 - yScale(value));
  }, [data]);

  return (
    <div>
      <h1>Bar Chart</h1>
      <svg ref={svgRef} className="line-chart">
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
