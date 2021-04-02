import React from "react";

import BarChart from "./BarChart";
import BarChartPractice from "./BarChartPractice";
import CircleChart from "./Circle";
import LineChart from "./LineChart";

import BarChartResponsive from "./BarChartResponsive";

// random number generater
export const randNum = () => Math.ceil(Math.random() * 100);

// random array generater
export const randArray = () => {
  const values = [];
  for (let i = 0; i < 10; i++) {
    values.push(randNum());
  }

  return values;
};

const App = () => {
  const [data, setData] = React.useState(randArray());

  return (
    <div className="App">
      <div className="chart-container">
        <CircleChart />
        <LineChart />
        <BarChart />
        <BarChartPractice />
      </div>

      <BarChartResponsive data={data} />
      <div className="btn-grp">
        <button onClick={() => setData(data.map((d) => d + 5))}>+5</button>
        <button onClick={() => setData(data.filter((d) => d > 50))}>
          filter
        </button>
        <button onClick={() => setData(data.map((d) => d - 5))}>-5</button>
        <button onClick={() => setData([...data, randNum()])}>Add</button>
        <button onClick={() => setData(randArray())}>Re-set</button>
      </div>
    </div>
  );
};

export default App;
