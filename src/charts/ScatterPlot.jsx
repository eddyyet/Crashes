import React from 'react'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import filter from '../utils/filter'
import ScatterPlotData from '../utils/ScatterPlotData'
import dayTimeData from '../data/crash_day_time.json'

export default function SwarmPlot (props) {
  const filteredData = filter(dayTimeData, props.year, props.side)
  const scatterPlotData = ScatterPlotData(filteredData)
  console.log(scatterPlotData.nivoInputData)

  return (
    <ResponsiveScatterPlot
      data={scatterPlotData.nivoInputData}
      margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
      xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
      blendMode='multiply'
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Time of Day',
        legendPosition: 'middle',
        legendOffset: 46
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Day of Week',
        legendPosition: 'middle',
        legendOffset: -60
      }}
      colors={{ scheme: 'nivo' }}
    />
  )
}
