import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import filter from '../utils/filter'
import LineData from '../utils/LineData'
import speedData from '../data/crash_speed.json'

export default function Line (props) {
  const filteredData = filter(speedData, props.year, props.side)
  const lineData = LineData(filteredData)

  const customSliceTooltip = ({ slice }) => (
    <div className={'tooltip'}>
      <div style={{ marginBottom: '0.5rem' }}>Crashes on roads with a speed limit of <strong>{slice.points[0].data.x}</strong>:</div>
      <div>
        {slice.points.map(point =>
          (<div key={point.id} className={'lineTooltipRow'}>
            <span className={'lineTooltipLevel'} style={{ color: point.serieColor }}><strong>{point.serieId}</strong></span>
            <span className={'lineTooltipFigure'}>{point.data.yFormatted}</span>
          </div>))}
      </div>
    </div>
  )

  return (
    <ResponsiveLine
      height={200}
      width={320}
      margin={{ top: 20, right: 20, bottom: 60, left: 41 }}
      data={lineData}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false }}
      yFormat= '>-0.1%'
      colors={{ datum: 'color' }}
      enableArea={true}
      areaOpacity={0.05}
      areaBlendMode='screen'
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
        fontFamily: '"Google Sans", "Roboto", "Helvetica Neue", sans-serif',
        textColor: '#999999',
        grid: { line: { stroke: 'rgba(204, 204, 204, 0.2)' } },
        crosshair: { line: { stroke: 'rgba(204, 204, 204, 0.2)', strokeDasharray: null } }
      }}
      enableSlices='x'
      sliceTooltip={customSliceTooltip}
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
