import "./styles.css";
import React from "react";
import {
  axisBottom,
  axisLeft,
  curveCardinal,
  line,
  scaleLinear,
  select,
} from "d3";
import { randArray, randNum } from "./App";
import Button from "./Button";

export default function LineChart() {
  const svgRef = React.useRef();
  const [data, setData] = React.useState(randArray());
  React.useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    const yScale = scaleLinear()
      .domain([0, Math.max(...data) + 20]) //[minVal,maxVal]
      .range([150, 0]);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((index) => index + 1);
    const yAxis = axisLeft(yScale);

    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);
    svg.select(".y-axis").call(yAxis);

    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  return (
    <div>
      <h1>Line Chart</h1>
      <svg ref={svgRef} className="line-chart">
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <div className="btn-grp">
        <Button
          handleClick={() => setData(data.map((d) => d + 5))}
          title="+5"
        />
        <Button
          handleClick={() => setData(data.filter((d) => d > 50))}
          title="filter"
        />
        <Button
          handleClick={() => setData(data.map((d) => d - 5))}
          title="-5"
        />
        <Button handleClick={() => setData([...data, randNum()])} title="Add" />
        <Button handleClick={() => setData(randArray())} title="Re-set" />
      </div>
    </div>
  );
}
