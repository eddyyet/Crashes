import React from "react";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import filter from "../utils/filter";
import causeData from "../data/crash_cause.json";

export default function CirclePacking(props) {
  const filteredData = filter(causeData, props.year, props.side);
  

  return (
    <ResponsiveCirclePacking
      data={filteredData}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      id="name"
      value="value"
      colors={{ scheme: "nivo" }}
      childColor={{ from: "color", modifiers: [["darker", 0.8]] }}
      padding={3}
      enableLabels={true}
      label="name"
      labelTextColor={{ from: "color", modifiers: [["darker", 1]] }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
      animate={false}
      motionStiffness={90}
      motionDamping={12}
    />
  );
}