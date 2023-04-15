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
      height={500}
      data={swarmPlotData.nivoInputData}
      groups={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
      groupBy='day'
      value='time'
      valueScale={{ type: 'linear', min: 0, max: 23, reverse: true }}
      size={{ key: 'crashes', values: [swarmPlotData.minCrashes, swarmPlotData.maxCrashes], sizes: [5, 20] }}
      colors={{ datum: 'data.color' }}
      colorBy='color'
      spacing={0}
    />
  )
}
