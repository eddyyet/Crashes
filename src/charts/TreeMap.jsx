import React from 'react'
import { ResponsiveTreeMapHtml } from '@nivo/treemap'
import filter from '../utils/filter'
import TreeMapData from '../utils/TreeMapData'
import causeData from '../data/crash_cause.json'

const labelStyle = (node) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ width: '150px', whiteSpace: 'normal' }}>{node.id}</div>
    <div style={{ fontSize: '30px' }}>{node.value}</div>
  </div>
)

export default function TreeMap (props) {
  const filteredData = filter(causeData, props.year, props.side)
  const treeMapData = TreeMapData(filteredData)

  return (
    <ResponsiveTreeMapHtml
      height={600}
      data={treeMapData}
      identity='cause'
      value='count'
      orientLabel={false}
      colors={{ scheme: 'nivo' }}
      label={labelStyle}
      labelSkipSize={20}
      labelTextColor={{ from: 'color', modifiers: [['brighter', 2]] }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
    />
  )
}
