import React from 'react'
import { ResponsiveTreeMapHtml } from '@nivo/treemap'
import filter from '../utils/filter'
import TreeMapData from '../utils/TreeMapData'
import causeData from '../data/crash_cause.json'

export default function TreeMap (props) {
  const filteredData = filter(causeData, props.year, props.side)
  const treeMapData = TreeMapData(filteredData)
  const treeMapTotal = treeMapData.total
  console.log(treeMapData)

  const labelStyle = (node) => {
    const labelWidth = node.width
    let causeSize, valueSize
    if (node.value > 0.04 * treeMapTotal) {
      causeSize = '16px'
      valueSize = '30px'
    } else if (node.value > 0.01 * treeMapTotal) {
      causeSize = '10px'
      valueSize = '20px'
    } else {
      causeSize = '5px'
      valueSize = '8px'
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: labelWidth, fontSize: causeSize, whiteSpace: 'normal' }}>{node.id}</div>
        <div style={{ fontSize: valueSize }}>{node.value}</div>
      </div>
    )
  }

  return (
    <ResponsiveTreeMapHtml
      height={600}
      data={treeMapData}
      identity='cause'
      value='count'
      orientLabel={false}
      nodeOpacity={1}
      colors={{ datum: 'data.color' }}
      label={labelStyle}
      labelSkipSize={20}
      labelTextColor={{ from: 'color', modifiers: [['opacity', 1]] }}
      parentLabelTextColor={{ from: 'color', modifiers: [['opacity', 1]] }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['opacity', 0.5]] }}
    />
  )
}
