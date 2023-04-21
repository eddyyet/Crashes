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
        <div><strong className={'tooltipLargeText'}>{node.node.data.crashes.toLocaleString('en-US')}</strong> crashes on <strong>{node.node.data.toolTipDay}</strong> at around <strong>{node.node.data.toolTipTime}</strong>.</div>
        <div><strong className={'tooltipLargeText'} style={{ color: node.node.data.toolTipColor }}>{node.node.data.injuryRate}</strong> of the crashes caused injuries.</div>
      </div>
    )
  }

  return (
    <ResponsiveScatterPlot
      height={494}
      width={350}
      margin={{ top: 50, right: 55, bottom: 20, left: 59 }}
      data={scatterPlotData}
      nodeSize={{ key: 'data.radius', values: [0, 1], sizes: [0, 40] }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'point' }}
      axisTop={{
        tickSize: 0,
        tickPadding: 23,
        tickRotation: 0,
        legend: 'Day of week',
        legendPosition: 'middle',
        legendOffset: -44
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 30,
        tickRotation: 0,
        legend: 'Time (hour)',
        legendPosition: 'middle',
        legendOffset: -54
      }}
      axisBottom={null}
      enableGridX={false}
      enableGridY={false}
      theme={{
        fontFamily: '"Google Sans", "Roboto", "Helvetica Neue", sans-serif',
        textColor: '#999999'
      }}
      colors={colors}
      tooltip={customTooltip}
    />
  )
}
