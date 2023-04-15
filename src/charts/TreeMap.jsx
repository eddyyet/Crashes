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

  const customLabel = (node) => {
    const labelWidth = node.width
    let causeSize, valueSize, injuredSize
    if (node.value > 0.04 * treeMapTotal) {
      causeSize = '16px'
      valueSize = '30px'
      injuredSize = '10px'
    } else if (node.value > 0.01 * treeMapTotal) {
      causeSize = '10px'
      valueSize = '20px'
      injuredSize = '8px'
    } else {
      causeSize = '6px'
      valueSize = '8px'
      injuredSize = '5px'
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: labelWidth, fontSize: causeSize, whiteSpace: 'normal' }}>{node.id}</div>
        <div style={{ fontSize: valueSize }}>{node.value}</div>
        <div style={{ fontSize: injuredSize }}>Injured: {node.data.injuryRate}</div>
      </div>
    )
  }

  const customTooltip = (node) => {
    return (
      <div className={'treeMapTooltip'}>
        <div>{node.node.id}</div>
        <div>Count: {node.node.value}</div>
        <div>Injured: {node.node.data.injuryRate}</div>
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
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['opacity', 0.5], ['brighter', 0.5]] }}
      label={customLabel}
      labelSkipSize={20}
      labelTextColor={{ from: 'color', modifiers: [['opacity', 1], ['brighter', 0.5]] }}
      parentLabelTextColor={{ from: 'color', modifiers: [['opacity', 1], ['brighter', 1]] }}
      tooltip={customTooltip}
    />
  )
}
