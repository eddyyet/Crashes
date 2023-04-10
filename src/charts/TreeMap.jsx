import React from 'react'
import { ResponsiveTreeMapHtml } from '@nivo/treemap'
import filter from '../utils/filter'
import TreeMapData from '../utils/TreeMapData'
import causeData from '../data/crash_cause.json'

const CustomLabel = ({ node, ...props }) => (
  <div style={{ textAlign: 'center', lineHeight: '18px' }}>
    <strong>{node.id}</strong>
    <br />
    <span>{node.value}</span>
  </div>
)

export default function TreeMap (props) {
  const filteredData = filter(causeData, props.year, props.side)
  const treeMapData = TreeMapData(filteredData)

  return (
    <ResponsiveTreeMapHtml
      height={400}
      data={treeMapData}
      identity='cause'
      value='count'
      colors={{ scheme: 'nivo' }}
      label={ (node) => (<div><div width='2'>{node.id}</div><div>{node.value}</div></div>) }
      labelComponent={ props => <CustomLabel {...props} /> }
      labelSkipSize={20}
      labelTextColor={{ from: 'color', modifiers: [['brighter', 1.5]] }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
    />
  )
}
