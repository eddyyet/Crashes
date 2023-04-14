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
      height={500}
      data={heatMapData}
      margin={{ top: 0, right: 0, bottom: 0, left: 50 }}
      sizeVariation={{ sizes: [0.5, 2] }}
      cellComponent='circle'
      opacity={0.8}
      activeOpacity={1}
      inactiveOpacity={0.5}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'top',
        tickSize: 0,
        tickPadding: 0,
        legend: 'Day',
        legendPosition: 'middle',
        legendOffset: -40
      }}
    axisLeft={{
      orient: 'left',
      tickSize: 0,
      tickPadding: 0,
      legend: 'Time (hour)',
      legendPosition: 'middle',
      legendOffset: -40
    }}
    borderWidth={0}
    // borderColor={{ from: 'color', modifiers: [['opacity', 0]] }}
    colors={{ datum: 'data.color', type: 'quantize' }}
    />
  )
}
