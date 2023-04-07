import React, { useMemo } from 'react'
import Graph from 'react-graph-vis'
import filter from '../utils/filter'
import env2Data from '../data/crash_env2.json'
import Network2Data from '../utils/Network2Data'
import { v4 } from 'uuid'

export default function Network (props) {
  const filteredData = filter(env2Data, props.year, props.side)
  const graph = Network2Data(filteredData)
  const version = useMemo(v4, [props])

  const options = {
    nodes: {
      font: {
        size: 10,
        color: '#CCCCCC',
        face: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
      },
      chosen: {
        node: function (values, id, selected, hovering) {
          values.shadow = true
          values.shadowColor = '#AA4422'
          values.shadowSize = 2
          values.shadowX = 0
          values.shadowY = 0
        },
        label: function (values, id, selected, hovering) {
          values.color = '#FFFFFF'
        }
      }
    },
    edges: {
      arrows: {
        // middle: {
        //   enabled: true,
        //   src: Arrow,
        //   scaleFactor: -1,
        //   type: 'image'
        // },
        to: {
          enabled: false
        }
      },
      font: {
        size: 8,
        color: '#999999',
        strokeWidth: 0,
        face: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
      },
      chosen: {
        label: function (values, id, selected, hovering) {
          values.size = 16
          values.color = '#FFFFFF'
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
    <Graph key={version} graph={graph} options={options} /* events={events} */ style={{ height: '500px', width: '350px' }} />
  )
}
