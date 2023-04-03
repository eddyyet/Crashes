import React from 'react'
import Graph from 'react-graph-vis'
import filter from '../utils/filter'
import envData from '../data/crash_env.json'
import NetworkData from '../utils/NetworkData'

export default function Sankey (props) {
  const filteredData = filter(envData, props.year, props.side)
  const graph = NetworkData(filteredData)

  // options = {
  //   nodes: {
  //     shape: "circle"
  //   }
  // }
  
  // events: {
  //   //...
  //   }
  // }

  return (
    <Graph graph={graph} /*options={options} events={events}*/ style={{ height: "752px" }} />
  )
}
