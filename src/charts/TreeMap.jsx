import React from 'react'
import { ResponsiveTreeMapHtml } from '@nivo/treemap'
import filter from '../utils/filter'
import TreeMapData from '../utils/TreeMapData'
import causeData from '../data/crash_cause.json'

export default function TreeMap (props) {
  const filteredData = filter(causeData, props.year, props.side)
  const treeMapData = TreeMapData(filteredData)
  const treeMapTotal = treeMapData.total

  const customLabel = (node) => {
    const labelWidth = node.width
    const labelHeight = node.height
    const causeLength = node.id.length

    let sizeGroup
    if (node.value > 0.04 * treeMapTotal && causeLength * 100 < labelWidth * (labelHeight - 48)) {
      sizeGroup = 'Large'
    } else if (node.value > 0.01 * treeMapTotal && causeLength * 25 < labelWidth * (labelHeight - 24)) {
      sizeGroup = 'Med'
    } else if (node.value > 0.005 * treeMapTotal && causeLength * 6 < labelWidth * (labelHeight - 12)) {
      sizeGroup = 'Small'
    } else {
      sizeGroup = 'Tiny'
    }

    const causeClass = 'treeMapCause' + sizeGroup
    const crashesClass = 'treeMapCrashes' + sizeGroup
    const injuryRateClass = 'treeMapInjuryRate' + sizeGroup

    // let causeSize, valueSize, injuredSize
    // if (node.value > 0.04 * treeMapTotal) {
    //   causeSize = '16px'
    //   valueSize = '30px'
    //   injuredSize = '10px'
    // } else if (node.value > 0.01 * treeMapTotal) {
    //   causeSize = '10px'
    //   valueSize = '20px'
    //   injuredSize = '8px'
    // } else {
    //   causeSize = '6px'
    //   valueSize = '8px'
    //   injuredSize = '5px'
    // }

    return (
      <div className={'treeMapContent'}>
        <div className={causeClass} style={{ width: labelWidth, whiteSpace: 'normal' }}>{node.id}</div>
        <div className={crashesClass}>{node.value}</div>
        <div className={injuryRateClass} >Injured: {node.data.injuryRate}</div>
      </div>
    )
  }

  const customTooltip = (node) => {
    return (
      <div className={'tooltip'}>
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
