import React, { useMemo } from 'react'
import Graph from 'react-graph-vis'
import filter from '../utils/filter'
import envData from '../data/crash_env.json'
import NetworkData from '../utils/NetworkData'
import { v4 } from 'uuid'
// import SeveritySevere from '../images/severity_severe.svg'
// import SeverityModerate from '../images/severity_moderate.svg'
// import SeverityNo from '../images/severity_no.svg'
// import CarLong150 from '../images/car_top_long_150.svg'
// import CarLong150Hover from '../images/car_top_long_150_hover.svg'
// import CarMid190 from '../images/car_top_mid_190.svg'
// import CarShort230 from '../images/car_top_short_230.svg'

export default function Network (props) {
  const filteredData = filter(envData, props.year, props.side)
  const graph = NetworkData(filteredData)
  const version = useMemo(v4, [props])

  const options = {
    edges: {
      color: {
        color: '#CCCCCC',
        opacity: 0.08
      },
      arrows: {
        to: {
          enabled: false
        }
      },
      font: {
        size: 8,
        color: '#CCCCCC',
        strokeWidth: 0
      },
      chosen: {
        // node: function (values, id, selected, hovering) {
        //   if (values.image === CarLong150) { values.image = CarLong150Hover }
        // },
        edge: function (values, id, selected, hovering) {
          values.opacity = 0.5
        },
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
    <Graph key={version} graph={graph} options={options} /* events={events} */ style={{ height: '736px' }} />
  )
}
