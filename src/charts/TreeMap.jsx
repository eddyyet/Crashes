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
      label={ (node) => (<span width='100'>{node.id}<br />{node.value}</span>) }
      labelComponent={ props => <CustomLabel {...props} /> }
      labelSkipSize={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
    />
  )
}