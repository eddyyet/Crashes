import React from 'react'
import { ResponsiveHeatMap } from '@nivo/heatmap'
import filter from '../utils/filter'
import HeatMapData from '../utils/HeatMapData'
import data from '../data/crash_day_time.json'

export default function HeatMap (props) {
  const filteredData = filter(data, props.year, props.side)
  const heatMapData = HeatMapData(filteredData)

  return (
    <ResponsiveHeatMap
      data={heatMapData}
      margin={{ top: 100, right: 60, bottom: 60, left: 60 }}
      forceSquare={true}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: 'Time (Hour)',
        legendPosition: 'middle',
        legendOffset: -40
      }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Day',
      legendPosition: 'middle',
      legendOffset: -40
    }}
    cellOpacity={1}
    cellBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
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
    fill={[{ id: 'lines' }]}
    animate={true}
    motionStiffness={80}
    motionDamping={9}
    hoverTarget="cell"
    cellHoverOthersOpacity={0.25}
    />
  )
}
