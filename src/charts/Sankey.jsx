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
      nodeThickness={24}
      nodeSpacing={10}
      nodeBorderWidth={0}
      linkOpacity={0.2}
      linkHoverOthersOpacity={0.1}
      linkBlendMode="normal"
      enableLinkGradient={true}
      labelPosition="inside"
      labelPadding={6}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
    />
  )
}
