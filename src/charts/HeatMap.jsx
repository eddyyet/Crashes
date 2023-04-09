import React from 'react'
import { ResponsiveHeatMap } from '@nivo/heatmap'
import filter from '../utils/filter'
import HeatMapData from '../utils/HeatMapData'
import dayTimeData from '../data/crash_day_time.json'

export default function HeatMap (props) {
  const filteredData = filter(dayTimeData, props.year, props.side)
  const heatMapData = HeatMapData(filteredData)

  return (
    <ResponsiveHeatMap
      data={heatMapData}
      margin={{ top: 0, right: 0, bottom: 0, left: 50 }}
      sizeVariation={{ sizes: [0.5, 2] }}
      cellComponent='circle'
      forceSquare={true}
      opacity={0.4}
      activeOpacity={1}
      inactiveOpacity={0.2}
      // xInnerPadding={0.05}
      // yInnerPadding={0.05}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'top',
        tickSize: 0,
        tickPadding: 0,
        legend: 'Time (Hour)',
        legendPosition: 'middle',
        legendOffset: -40
      }}
    axisLeft={{
      orient: 'left',
      tickSize: 0,
      tickPadding: 0,
      legend: 'Day',
      legendPosition: 'middle',
      legendOffset: -40
    }}
    cellOpacity={1}
    // cellBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
    labelTextColor={{ from: 'color', modifiers: [['darker', 1.8]] }}
    defs={[
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(0, 0, 0, 0.1)',
        rotation: -45,
        lineWidth: 4,
        spacing: 7
      }
    ]}
    colors={{
      type: 'diverging',
      scheme: 'purple_orange',
      divergeAt: 0.5
    }}
    // cellShape={({
    //   data,
    //   value,
    //   x,
    //   y,
    //   width,
    //   height,
    //   color,
    //   opacity,
    //   borderWidth,
    //   borderColor,
    //   enableLabel,
    //   textColor,
    //   onHover,
    //   onLeave,
    //   onClick,
    //   theme
    // }) => {
    //   return (
    //     <g
    //       transform={`translate(${x}, ${y})`}
    //       onMouseEnter={onHover}
    //       onMouseMove={onHover}
    //       onMouseLeave={onLeave}
    //       onClick={e => onClick(data, e)}
    //       style={{ cursor: 'pointer' }}
    //     >
    //       {enableLabel && (
    //         <text
    //           alignmentBaseline="central"
    //           textAnchor="middle"
    //           style={{
    //             ...theme.labels.text,
    //             fill: textColor
    //           }}
    //           fillOpacity={opacity}
    //         >
    //           {value}
    //         </text>
    //       )}
    //     </g>
    //   )
    // }}
    />
  )
}
