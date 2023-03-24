import React from 'react'
// import { ResponsiveCirclePacking } from '@nivo/circle-packing'
import { ResponsiveSunburst } from '@nivo/sunburst'
import filter from '../utils/filter'
import CirclePackingData from '../utils/CirclePackingData'
import causeData from '../data/crash_cause.json'

export default function CirclePacking (props) {
  const filteredData = filter(causeData, props.year, props.side)
  const circlePackingData = CirclePackingData(filteredData)

  return (
    <ResponsiveSunburst
      data={circlePackingData}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      id='cause'
      value='count'
      cornerRadius={2}
      borderWidth={1}
      borderColor='#28292a'
      colors={{ scheme: 'nivo' }}
      childColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
      enableArcLabels={true}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
    />
  // <ResponsiveCirclePacking
  //   data={circlePackingData}
  //   margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
  //   id='cause'
  //   value='count'
  //   padding={4}
  // color='red'

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
  // />
  )
}
