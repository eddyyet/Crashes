import React from 'react'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import filter from '../utils/filter'
import ScatterPlotData from '../utils/ScatterPlotData'
import dayTimeData from '../data/crash_day_time.json'

export default function ScatterPlot (props) {
  const filteredData = filter(dayTimeData, props.year, props.side)
  const scatterPlotData = ScatterPlotData(filteredData)
  const maxCrashes = Math.max(...scatterPlotData.data.map(d => d.crashes))
  const minCrashes = Math.min(...scatterPlotData.data.map(d => d.crashes))

  return (
    <ResponsiveScatterPlot
      height={500}
      width={350}
      margin={{ top: 50, right: 50, bottom: 40, left: 40 }}
      data={[scatterPlotData]}
      nodeSize={{ key: 'data.crashes', values: [minCrashes, maxCrashes], sizes: [8, 30] }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 0, max: 23, reverse: true }}
      axisTop={{
        orient: 'top',
        tickValues: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Day',
        legendPosition: 'middle',
        legendOffset: -35
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Time (hour)',
        legendPosition: 'middle',
        legendOffset: -35
      }}
      axisBottom={null}
      enableGridX={false}
      enableGridY={false}
      theme={{ axis: { ticks: { text: { fill: '#999999' } }, legend: { text: { fill: '#999999' } } } }}
      colors={{ datum: 'color' }}
    />
  )
}
