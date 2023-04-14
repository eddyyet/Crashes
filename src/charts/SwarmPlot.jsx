import React from 'react'
import { ResponsiveSwarmPlot } from '@nivo/swarmplot'
import filter from '../utils/filter'
import SwarmPlotData from '../utils/SwarmPlotData'
import dayTimeData from '../data/crash_day_time.json'

export default function SwarmPlot (props) {
  const filteredData = filter(dayTimeData, props.year, props.side)
  const swarmPlotData = SwarmPlotData(filteredData)
  console.log(swarmPlotData.nivoInputData)

  return (
    <ResponsiveSwarmPlot
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
