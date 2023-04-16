import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import filter from '../utils/filter'
import LineData from '../utils/LineData'
import speedData from '../data/crash_speed.json'

export default function Line (props) {
  const filteredData = filter(speedData, props.year, props.side)
  const lineData = LineData(filteredData)

  // const generateLegends = (data) => {
  //   return data.map((dataset) => {
  //     return {
  //       anchor: 'right',
  //       direction: 'column',
  //       justify: false,
  //       translateX: 100,
  //       translateY: 0,
  //       items: [
  //         {
  //           id: dataset.id,
  //           label: dataset.id,
  //           color: dataset.color
  //         }
  //       ]
  //     }
  //   })
  // }

  return (
    <ResponsiveLine
      height={200}
      width={320}
      margin={{ top: 20, right: 20, bottom: 35, left: 41 }}
      data={lineData}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false }}
      yFormat= '>-0.2%'
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
        crosshair: { line: { stroke: 'rgba(204, 204, 204, 0.2)', strokeDasharray: null } }
      }}
      enableSlices='x'
      // legends={ (series) => {
      //   console.log(series)
      // }}
    />
  )
}
