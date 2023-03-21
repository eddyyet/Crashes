import React from 'react'
import { ResponsiveSankey } from '@nivo/sankey'
import filter from '../utils/filter'
import envData from '../data/crash_env.json'
import SankeyData from '../utils/SankeyData'

export default function Sankey (props) {
  const filteredData = filter(envData, props.year, props.side)
  const sankeyData = SankeyData(filteredData)

  return (
    <ResponsiveSankey
      data={sankeyData}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      align="justify"
      // colors={{ scheme: 'nivo' }}
      nodeOpacity={1}
      nodeThickness={18}
      nodeInnerPadding={3}
      nodeSpacing={24}
      nodeBorderWidth={0}
      nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
      linkOpacity={0.5}
      linkHoverOthersOpacity={0.1}
      enableLinkGradient={true}
      labelPosition="outside"
      labelOrientation="vertical"
      labelPadding={16}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  )
}
