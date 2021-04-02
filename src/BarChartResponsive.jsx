import "./styles.css";
import React from "react";
import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from "d3";
import ResizeObserver from "resize-observer-polyfill";

// custom hook
const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = React.useState(null);
  React.useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((enteries) => {
      enteries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });

    resizeObserver.observe(observeTarget);

    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);

  return dimensions;
};

export default function BarChartResponsive({ data }) {
  const svgRef = React.useRef();
  const wraperRef = React.useRef();
  const dimensions = useResizeObserver(wraperRef);

  React.useEffect(() => {
    const svg = select(svgRef.current);

    if (!dimensions) return;

    const xScale = scaleBand()
      .domain(data.map((v, i) => i)) // need to provide array of value to display in x-axis eg [0,1,2,3,4,5,6]
      .range([0, dimensions.width])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, Math.max(...data) + 20]) // .domain([0, 150])
      .range([dimensions.height, 0]);

    const colorScale = scaleLinear()
      .domain([50, 100, 150]) //domain([0, Math.max(...data) + 10])
      .range(["green", "orange", "red"])
      .clamp(true);

    const xAxis = axisBottom(xScale).ticks(data.length);

    const yAxis = axisLeft(yScale);

    svg
      .select(".x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);
    svg.select(".y-axis").call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1,-1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -dimensions.height)
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
      .attr("height", (value) => dimensions.height - yScale(value));
  }, [data, dimensions]);

  return (
    <>
      <h1>Bar Chart Responsive</h1>
      <div ref={wraperRef} className="container">
        <svg ref={svgRef} className="line-chart bar-chart">
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </>
  );
}
