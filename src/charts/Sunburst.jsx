import React from 'react'
// import { ResponsiveCirclePacking } from '@nivo/circle-packing'
import { ResponsiveSunburst } from '@nivo/sunburst'
import filter from '../utils/filter'
import SunburstData from '../utils/SunburstData'
import causeData from '../data/crash_cause.json'

export default function Sunburst (props) {
  const filteredData = filter(causeData, props.year, props.side)
  const sunburstData = SunburstData(filteredData)

  return (
    <ResponsiveSunburst
      data={sunburstData}
      height={400}
      width={400}
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
  )
}
