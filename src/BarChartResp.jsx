import React from "react";
import { randArray, randNum } from "./App";
import BarChartResponsive from "./BarChartResponsive";
import Button from "./Button";

const BarChartResp = () => {
  const [data, setData] = React.useState(randArray());
  return (
    <>
      <BarChartResponsive data={data} />
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
    </>
  );
};

export default BarChartResp;
