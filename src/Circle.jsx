import "./styles.css";
import React from "react";
import { select } from "d3";
import Button from "./Button";

export default function CircleChart() {
  const svgRef = React.useRef();
  const [data, setData] = React.useState([25, 60, 80, 45, 32, 80]);
  React.useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", (value) => value)
      .attr("cx", (v) => v * 2)
      .attr("cy", (v) => v * 2)
      .attr("stroke", "red");
  }, [data]);
  return (
    <div>
      <h1>Circle</h1>
      <svg ref={svgRef}></svg>

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
      </div>
    </div>
  );
}
