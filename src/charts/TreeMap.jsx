import React from 'react'
import { ResponsiveTreeMapHtml } from '@nivo/treemap'
import filter from '../utils/filter'
import TreeMapData from '../utils/TreeMapData'
import causeData from '../data/crash_cause.json'
import MinorCrashOutlinedIcon from '@mui/icons-material/MinorCrashOutlined'
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined'

export default function TreeMap (props) {
  const filteredData = filter(causeData, props.year, props.side)
  const treeMapData = TreeMapData(filteredData)
  const treeMapTotal = treeMapData.total

  const customLabel = (node) => {
    const labelWidth = node.width
    const labelHeight = node.height
    const causeLength = node.id.length
    let scale, boxWidth

    if (node.value > 0.05 * treeMapTotal && causeLength * 100 < labelWidth * (labelHeight - 48)) {
      scale = 'scale(1)'
      boxWidth = labelWidth - 12
    } else if (node.value > 0.03 * treeMapTotal && causeLength * 100 < labelWidth * (labelHeight - 36)) {
      scale = 'scale(0.7)'
      boxWidth = labelWidth * 1.43 - 4
    } else if (node.value > 0.01 * treeMapTotal && causeLength * 25 < labelWidth * (labelHeight - 24)) {
      scale = 'scale(0.4)'
      boxWidth = labelWidth * 2.5
    } else if (node.value > 0.005 * treeMapTotal && causeLength * 6 < labelWidth * (labelHeight - 12)) {
      scale = 'scale(0.25)'
      boxWidth = labelWidth * 4
    } else {
      scale = 'scale(0.1)'
      boxWidth = labelWidth * 10
    }

    return (
      <div className={'treeMapContent'} style={{ transform: scale, WebkitTransform: scale }}>
        <div className={'treeMapCause'} style={{ width: boxWidth, whiteSpace: 'normal' }}>{node.id}</div>
        <div className={'treeMapCrashes'}><MinorCrashOutlinedIcon className={'treeMapIcon'} /> {node.value}</div>
        <div className={'treeMapInjuryRate'} ><MedicalServicesOutlinedIcon className={'treeMapIcon'} /> {node.data.injuryRate}</div>
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
      borderColor={{ from: 'color', modifiers: [['opacity', 0.5], ['brighter', 0.4]] }}
      label={customLabel}
      labelTextColor={{ from: 'color', modifiers: [['opacity', 1], ['brighter', 0.5]] }}
      parentLabelTextColor={{ from: 'color', modifiers: [['opacity', 1], ['brighter', 1]] }}
      tooltip={customTooltip}
    />
  )
}
