import React, { useState, useEffect, useCallback, useRef } from 'react'
// import React, { useState, useRef, useMemo, useCallback } from 'react'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet'
// import * as d3 from 'd3'
import side from '../data/chicago_side.json'
import ChoroplethFilter from '../utils/ChoroplethData'
import ChoroplethData from '../data/choropleth.json'
import './Choropleth.css'
import 'leaflet/dist/leaflet.css'
import isEqual from 'lodash/isEqual'
import Control from 'react-leaflet-custom-control'
import L from 'leaflet'
import cautionCrashIcon from '../images/choropleth_collision.png'

function MyComponent (props) {
  const { result } = props
  // console.log(result)
  return (
    <div>
      <h4>{JSON.stringify(result)} Test</h4>
    </div>
  )
}
/*
function getColor (feature, selectedData) {
  // console.log(filteredData)
  // const numKeys = Object.keys(selectedData).length
  // if there is only one key-value pair in filteredData
  if (selectedData[feature.properties.id] !== undefined) {
    const colorClasses = ['#ffffd4', '#fed98e', '#fe9929', '#cc4c02']
    const value = selectedData[feature.properties.id]
    let colorIndex = 0
    if (value >= 50) {
      colorIndex = 3
    } else if (value >= 40) {
      colorIndex = 2
    } else if (value >= 30) {
      colorIndex = 1
    }
    return colorClasses[colorIndex]
  } else {
    return '#ccc' // color for unknown feature
  }
}
*/

function getColor (feature, selectedData) {
  if (selectedData[feature.properties.id] !== undefined) {
    const value = selectedData[feature.properties.id]

    const hueStart = 60
    const hueEnd = 16

    const hue = hueStart - (hueStart - hueEnd) * ((value - 25) / 30)
    const saturation = 100
    const lightnessStart = 93
    const lightnessEnd = 42

    const lightness = lightnessStart - (lightnessStart - lightnessEnd) * ((value - 25) / 30)

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  } else {
    return '#ccc' // color for unknown feature
  }
}

function onMouseOver (event, selectedData) {
  const layer = event.target
  const featureId = layer.feature.properties.id

  if (selectedData.crashesPer1000[featureId] !== undefined) {
    layer.setStyle({
      weight: 3,
      color: '#666',
      dashArray: '',
      fillOpacity: 1,
      fillColor: getColor(layer.feature, selectedData.crashesPer1000)
    })
    // console.log(selectedData)
    const moCrashes = selectedData.crashes[featureId].toLocaleString()
    const moPpl = selectedData.ppl[featureId].toLocaleString()
    const moPer1000 = selectedData.crashesPer1000[featureId]
    const moStartYear = selectedData.yearArray[0]
    const moEndYear = selectedData.yearArray[1]
    layer.bindTooltip(`
      <div class='mo-tooltip'>
          <strong><span class='side-name'>${featureId}</span></strong><br>
          Population: ${moPpl}<br>
          Total traffic crashes from ${moStartYear} to ${moEndYear}: ${moCrashes}<br>
          Traffic crashes per 1000 citizens each year: ${moPer1000} 
      </div>`).openTooltip()
    layer.bringToFront()
  }
}

function onMouseOut (event, selectedData) {
  const layer = event.target
  // layer.setStyle(style(layer.feature, filteredData))
  // event.target.setStyle(style(event.target.feature))
  event.target.bringToFront()
  event.target.setStyle({
    fillColor: getColor(layer.feature, selectedData.crashesPer1000),
    weight: 1,
    opacity: 1,
    color: 'white',
    dashArray: '2',
    fillOpacity: 0.85
  })
  layer.unbindTooltip()
}

function onEachFeature (feature, layer, selectedData) {
  layer.on({
    mouseover: (event) => onMouseOver(event, selectedData),
    mouseout: (event) => onMouseOut(event, selectedData)
  })
}

function style (feature, selectedData) {
  return {
    fillColor: getColor(feature, selectedData.crashesPer1000),
    weight: 1,
    opacity: 1,
    color: 'white',
    dashArray: '2',
    fillOpacity: 0.85
  }
}

export function Legend () {
  const colorClasses = ['#ffffd4', '#fed98e', '#fe9929', '#cc4c02']
  const ranges = ['<30', '30-39', '40-49', '>50']

  const legendRows = ranges.map((range, i) => {
    const legendRow = (
      <tr key={range}>
        <td><i style={{ background: colorClasses[i] }}></i></td>
        <td className='leftCol'>{range}</td>
      </tr>
    )

    return legendRow
  })

  return (
    <Control position='bottomleft'>
      <div className='info legend'>
        <span id='legend-title'>Traffic crashes per<br/>1000 citizens each year</span>
        <table>
          <tbody>
            {legendRows}
          </tbody>
        </table>
      </div>
    </Control>
  )
}

function getCoordinatesForSide (side) {
  // Define the coordinates for each side of Chicago
  console.log(side)
  const sideCoordsMap = {
    Central: [41.878, -87.626],
    'Far North Side': [41.979, -87.7636],
    'Far Southeast Side': [41.6969, -87.5842],
    'Far Southwest Side': [41.7229, -87.6649],
    'North Side': [41.931, -87.6767],
    'Northwest Side': [41.9372, -87.7732],
    'South Side': [41.7965, -87.6067],
    'Southwest Side': [41.7925, -87.6959],
    'West Side': [41.8701, -87.7049]
  }

  return sideCoordsMap[side]
}

export default function CrashBySide (props) {
  const [key, setKey] = useState(0)
  const [filteredData, setFilteredData] = useState([])
  const [sideData, setSideData] = useState({ crashes: {}, ppl: {}, crashesPer1000: {} })
  const prevFilteredDataRef = useRef()
  useEffect(() => {
    const newFilteredData = ChoroplethFilter(ChoroplethData, props.year, props.side)
    if (!isEqual(prevFilteredDataRef.current, newFilteredData)) {
      prevFilteredDataRef.current = newFilteredData
      setFilteredData(newFilteredData)
    }
  }, [props.year, props.side])
  useEffect(() => {
    const ppl = {
      Central: 176574,
      'Far North Side': 461735,
      'Far Southeast Side': 208941,
      'Far Southwest Side': 170882,
      'North Side': 316578,
      'Northwest Side': 274686,
      'South Side': 272984,
      'Southwest Side': 380255,
      'West Side': 483753
    }
    const numYears = props.year[1] - props.year[0] + 1
    const per1000 = {}
    const crashes = {}
    for (const side in filteredData) {
      crashes[side] = filteredData[side]
      const population = ppl[side]
      per1000[side] = Math.round(((crashes[side] / numYears) / population) * 1000)
    }
    const newData = {}
    newData.crashes = crashes
    newData.ppl = ppl
    newData.crashesPer1000 = per1000
    newData.yearArray = props.year
    setSideData(newData)
  }, [filteredData])

  const customIcon = new L.Icon({
    iconUrl: cautionCrashIcon,
    iconSize: [40, 40]
  })

  let maxCrashes = 0
  let maxCrashesSide = ''

  for (const side in sideData.crashes) {
    if (sideData.crashes[side] > maxCrashes) {
      maxCrashes = sideData.crashes[side]
      maxCrashesSide = side
    }
  }

  const sideCoords = getCoordinatesForSide(maxCrashesSide)

  const choroplethStyle = useCallback((feature) => {
    return style(feature, sideData)
  }, [sideData])

  const choroplethOnEachFeature = useCallback((feature, layer) => {
    onEachFeature(feature, layer, sideData)
  }, [sideData])
  useEffect(() => {
    setKey(prevKey => prevKey + 1)
  }, [filteredData])
  return (
    <div>
      <MyComponent result={sideData} />

    <div style={{ height: '1000px' }}>
      <MapContainer center={[41.881832, -87.623177]} zoom={10} scrollWheelZoom={false}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <Legend />
        <GeoJSON key={key} data={side} style={choroplethStyle} onEachFeature={choroplethOnEachFeature} />
        {sideCoords && (
        <Marker position={sideCoords} icon={customIcon}>
          <Popup>
            {maxCrashesSide} has the highest number of crashes with {maxCrashes} crashes.
          </Popup>
        </Marker>
        )}
        </MapContainer>
    </div>
    </div>
  )
}
