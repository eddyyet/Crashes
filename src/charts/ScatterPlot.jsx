import React from 'react'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import filter from '../utils/filter'
import ScatterPlotData from '../utils/ScatterPlotData'
import dayTimeData from '../data/crash_day_time.json'

export default function ScatterPlot (props) {
  const filteredData = filter(dayTimeData, props.year, props.side)
  const scatterPlotData = ScatterPlotData(filteredData)
  const colors = scatterPlotData.map(d => d.data[0].color).flat()
  console.log(scatterPlotData)

  // function scale () {}
  // scale.domain = () => {
  //   const _colors = colors.slice(0)

  //   return () => {
  //     return _colors.shift()
  //   }
  // }

  return (
    <ResponsiveScatterPlot
      height={550}
      width={350}
      margin={{ top: 60, right: 50, bottom: 40, left: 68 }}
      data={scatterPlotData}
      nodeSize={{ key: 'data.radius', values: [0, 1], sizes: [0, 40] }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'point' }}
      axisTop={{
        orient: 'top',
        tickValues: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        tickSize: 0,
        tickPadding: 25,
        tickRotation: 0,
        legend: 'Day of week',
        legendPosition: 'middle',
        legendOffset: -50
      }}
      axisLeft={{
        orient: 'left',
        ticksValues: 1,
        tickSize: 0,
        tickPadding: 35,
        tickRotation: 0,
        legend: 'Time (hour)',
        legendPosition: 'middle',
        legendOffset: -63
      }}
      axisBottom={null}
      enableGridX={false}
      enableGridY={false}
      theme={{ axis: { ticks: { text: { fill: '#999999' } }, legend: { text: { fill: '#999999' } } } }}
      colors={colors}
    />
  )
}
