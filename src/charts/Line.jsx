import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import filter from '../utils/filter'
import LineData from '../utils/LineData'
import speedData from '../data/crash_speed.json'

export default function Line (props) {
  const filteredData = filter(speedData, props.year, props.side)
  const lineData = LineData(filteredData)

  return (
    <ResponsiveLine
      height={250}
      width={320}
      margin={{ top: 20, right: 20, bottom: 38, left: 42 }}
      data={lineData}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false }}
      yFormat= '>-0.2%'
      axisLeft={{
        format: '>-0.0%',
        tickSize: 0,
        legend: 'Injury rate',
        legendPosition: 'middle',
        legendOffset: -38
      }}
      axisBottom={{
        tickSize: 0,
        legend: 'Speed limit (mph)',
        legendPosition: 'middle',
        legendOffset: 30
      }}
      enableGridX={false}
      theme={{ axis: { ticks: { text: { fill: '#999999' } }, legend: { text: { fill: '#999999' } } }, grid: { line: { stroke: 'rgba(204, 204, 204, 0.2)' } } }}
      enableSlices='x'
    />
  )
}
