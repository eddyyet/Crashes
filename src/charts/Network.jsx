import React, { useMemo } from 'react'
import Graph from 'react-graph-vis'
import filter from '../utils/filter'
import envData from '../data/crash_env.json'
import NetworkData from '../utils/NetworkData'
import { v4 } from 'uuid'

export default function Network (props) {
  const filteredData = filter(envData, props.year, props.side)
  const graph = NetworkData(filteredData)
  const version = useMemo(v4, [props])

  const options = {
    nodes: {
      size: 60
    },
    edges: {
      color: {
        color: '#FFFFFF',
        opacity: 0.1
      },
      arrows: {
        to: {
          enabled: false
        }
      },
      font: {
        size: 8,
        color: '#FFFFFF',
        strokeWidth: 0
      },
      chosen: {
        edge: function (values, id, selected, hovering) {
          values.opacity = 0.6
        }
      }
    },
    interaction: {
      dragNodes: false,
      dragView: false,
      zoomView: false,
      selectable: false,
      hover: true
    },
    layout: {
      hierarchical: false
    },
    physics: false
  }

  // events: {
  //   //...
  //   }
  // }

  return (
    <Graph key={version} graph={graph} options={options} /* events={events} */ style={{ height: '736px' }} />
  )
}
