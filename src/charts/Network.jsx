import React, { useMemo } from 'react'
import Graph from 'react-graph-vis'
import filter from '../utils/filter'
import envData from '../data/crash_env.json'
import NetworkData from '../utils/NetworkData'
import { v4 } from 'uuid'
import CarLong150 from '../images/car_top_long_150.png'
import CarMid190 from '../images/car_top_mid_190.png'
import CarShort230 from '../images/car_top_short_230.png'

export default function Network (props) {
  const filteredData = filter(envData, props.year, props.side)
  const graph = NetworkData(filteredData)
  const version = useMemo(v4, [props])

  const options = {
    nodes: {
      font: {
        size: 16,
        color: '#CCCCCC',
        face: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
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
        font: { vadjust: -72 },
        shape: 'image',
        image: CarLong150,
        size: 40
      },
      Weather: {
        font: { vadjust: -78 },
        shape: 'image',
        image: CarMid190,
        size: 29
      },
      Roadway: {
        font: { vadjust: -60 },
        shape: 'image',
        image: CarShort230,
        size: 40
      }
    },
    edges: {
      arrows: {
        to: {
          enabled: false
        }
      },
      font: {
        size: 10,
        color: '#999999',
        strokeWidth: 0,
        face: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
      },
      hoverWidth: 0,
      shadow: { enabled: false },
      chosen: {
        label: function (values, id, selected, hovering) {
          values.size = 20
          values.color = '#FFFFFF'
          values.strokeWidth = 0.5
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
    <Graph key={version} graph={graph} options={options} style={{ height: '500px', width: '736px' }} />
  )
}
