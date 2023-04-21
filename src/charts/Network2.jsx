import React, { useMemo } from 'react'
import Graph from 'react-graph-vis'
import filter from '../utils/filter'
import env2Data from '../data/crash_env2.json'
import Network2Data from '../utils/Network2Data'
import { v4 } from 'uuid'
import CarLong90 from '../images/car_top_long_90.png'
import CarMid210 from '../images/car_top_mid_210.png'
import CarShort320 from '../images/car_top_short_320.png'

export default function Network (props) {
  const filteredData = filter(env2Data, props.year, props.side)
  const graph = Network2Data(filteredData)
  const version = useMemo(v4, [props])

  const options = {
    nodes: {
      font: {
        size: 10,
        color: '#CCCCCC',
        face: '"Google Sans", "Roboto", "Helvetica Neue", sans-serif'
      },
      chosen: {
        node: function (values, id, selected, hovering) {
          values.shadow = true
          values.shadowColor = '#AA4422'
          values.shadowSize = 6
          values.shadowX = 0
          values.shadowY = 0
        },
        label: function (values, id, selected, hovering) {
          values.color = '#FFFFFF'
        }
      }
    },
    groups: {
      Lighting: {
        font: { vadjust: -34 },
        shape: 'image',
        image: CarLong90,
        size: 18
      },
      Weather: {
        font: { vadjust: -56 },
        shape: 'image',
        image: CarMid210,
        size: 31
      },
      Roadway: {
        font: { vadjust: -46 },
        shape: 'image',
        image: CarShort320,
        size: 31
      }
    },
    edges: {
      arrows: {
        to: {
          enabled: false
        }
      },
      font: {
        size: 8,
        color: '#999999',
        strokeWidth: 0,
        face: '"Google Sans", "Roboto", "Helvetica Neue", sans-serif'
      },
      hoverWidth: 0,
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
      hover: true,
      tooltipDelay: 0
    },
    layout: {
      hierarchical: false
    },
    physics: false
  }

  return (
    <Graph key={version} graph={graph} options={options} style={{ height: '500px', width: '350px' }} />
  )
}
