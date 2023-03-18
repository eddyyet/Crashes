import React from 'react'
import { ResponsiveCirclePacking } from '@nivo/circle-packing'
import filter from '../utils/filter'
import CirclePackingData from '../utils/CirclePackingData'
import causeData from '../data/crash_cause.json'

export default function CirclePacking (props) {
  const filteredData = filter(causeData, props.year, props.side)
  const circlePackingData = CirclePackingData(filteredData)
  console.log(circlePackingData)

  return (
    <ResponsiveCirclePacking
      data={circlePackingData}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      id='cause'
      value='count'
      padding={4}
      enableBreadcrumb={false}
      // labelsSkipRadius={50}
      // // colors={{ scheme: 'purple_orange' }}
      // // childColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
      // enableLabels={true}
      // label='cause'
      // labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
      // borderWidth={1}
      // borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
      // animate={false}
      // motionStiffness={90}
      // motionDamping={12}
    />
  )
}
