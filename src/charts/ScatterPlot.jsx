import React from 'react'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import filter from '../utils/filter'
import ScatterPlotData from '../utils/ScatterPlotData'
import dayTimeData from '../data/crash_day_time.json'

export default function ScatterPlot (props) {
  const filteredData = filter(dayTimeData, props.year, props.side)
  const scatterPlotData = ScatterPlotData(filteredData)
  const colors = scatterPlotData.map(d => d.data[0].color).flat()

  const customTooltip = (node) => {
    return (
      <div className='tooltip'>
        <div><strong style={{ fontSize: '1.25rem' }}>{node.node.data.crashes}</strong> crashes on <strong>{node.node.data.toolTipDay}</strong> at around <strong>{node.node.data.toolTipTime}</strong>.</div>
        <div><strong style={{ fontSize: '1.25rem', color: node.node.data.toolTipColor }}>{node.node.data.injuryRate}</strong> of the crashes caused injuries.</div>
      </div>
    )
  }

  return (
    <ResponsiveScatterPlot
      height={550}
      width={350}
      margin={{ top: 60, right: 60, bottom: 20, left: 68 }}
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
      blendMode='screen'
      tooltip={customTooltip}
    />
  )
}
