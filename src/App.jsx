import BarChart from "./BarChart";
import BarChartPractice from "./BarChartPractice";
import BarChartResp from "./BarChartResp";
import CircleChart from "./Circle";
import LineChart from "./LineChart";

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
  return (
    <div className="App">
      <div className="chart-container">
        <CircleChart />
        <LineChart />
        <BarChart />
        <BarChartPractice />
      </div>

      <BarChartResp />
    </div>
  );
};

export default App;
