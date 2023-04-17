import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import filter from '../utils/filter'
import LineData from '../utils/LineData'
import speedData from '../data/crash_speed.json'

export default function Line (props) {
  const filteredData = filter(speedData, props.year, props.side)
  const lineData = LineData(filteredData)

  const customSliceTooltip = ({ slice }) => {
    <div className={'tooltip'}>
      <div>Speed limit: {slice.id}</div>
      <div>
        {slice.points.map(point =>
          (<div key={point.id} className={'lineTooltipRow'}>
            <span style={{ color: point.serieColor }}><strong>{point.serieId}</strong></span>
            <span>{point.data.yFormatted}</span>
          </div>))}
      </div>
    </div>
  }

  return (
    <ResponsiveLine
      height={200}
      width={320}
      margin={{ top: 20, right: 20, bottom: 60, left: 41 }}
      data={lineData}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false }}
      yFormat= '>-0.2%'
      colors={{ datum: 'color' }}
      enableArea={true}
      areaOpacity={0.05}
      areaBlendMode='screen'
      sliceTooltip={customSliceTooltip}
      axisLeft={{
        format: '>-0.0%',
        tickSize: 0,
        legend: 'Injury rate',
        legendPosition: 'middle',
        legendOffset: -37
      }}
      axisBottom={{
        tickSize: 0,
        legend: 'Speed limit (mph)',
        legendPosition: 'middle',
        legendOffset: 27
      }}
      enableGridX={false}
      theme={{
        axis: {
          ticks: { text: { fill: '#999999' } },
          legend: { text: { fill: '#999999' } }
        },
        grid: { line: { stroke: 'rgba(204, 204, 204, 0.2)' } },
        crosshair: { line: { stroke: 'rgba(204, 204, 204, 0.2)', strokeDasharray: null } },
        legends: { text: { fill: '#999999' } }
      }}
      enableSlices='x'
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: -25,
          translateY: 52,
          itemsSpacing: 4,
          itemDirection: 'left-to-right',
          itemWidth: 70,
          itemHeight: 10,
          itemOpacity: 0.75,
          symbolSize: 6,
          symbolShape: 'circle'
        }
      ]}
    />
  )
}
