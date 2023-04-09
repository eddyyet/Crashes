import React, { useState, useEffect } from 'react'
// import React, { useState, useRef, useMemo, useCallback } from 'react'
// import { MapContainer, TileLayer } from 'react-leaflet'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
// import L from 'leaflet'
import * as d3 from 'd3'
import side from '../data/chicago_side.json'
import ChoroplethFilter from '../utils/ChoroplethData'
import ChoroplethData from '../data/choropleth.json'
import './Choropleth.css'
import 'leaflet/dist/leaflet.css'

function MyComponent (props) {
  const { result } = props
  // console.log(result)
  return (
    <div>
      <h4>{JSON.stringify(result)} Test</h4>
    </div>
  )
}

function getColor (feature, filteredData) {
  const numKeys = Object.keys(filteredData).length
  if (numKeys === 1) {
    // if there is only one key-value pair in filteredData
    if (filteredData[feature.properties.id] !== undefined) {
      // if the feature is present in the filteredData object
      return '#d94701' // default color for single feature
    } else {
      return '#ccc' // color for unknown feature
    }
  }

  const colorClasses = ['#feedde', '#fdbe85', '#fd8d3c', '#d94701']
  const value = filteredData[feature.properties.id]
  const values = Object.values(filteredData)
  const quantiles = d3.scaleQuantile()
    .domain(values)
    .range(colorClasses)
    .quantiles()

  let colorIndex = 0
  if (value > quantiles[2]) {
    colorIndex = 3
  } else if (value > quantiles[1]) {
    colorIndex = 2
  } else if (value > quantiles[0]) {
    colorIndex = 1
  }
  return colorClasses[colorIndex]

  // return value > 50000 ? 'red' : 'green'
}

/*
function onMouseOver (event, filteredData) {
  const layer = event.target
  layer.setStyle({
    weight: 3,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.8,
    fillColor: getColor(layer.feature, filteredData)
  })
  layer.bringToFront()
}
*/

function onMouseOver (event, filteredData) {
  const layer = event.target
  const featureId = layer.feature.properties.id
  if (filteredData[featureId] !== undefined) {
    layer.setStyle({
      weight: 3,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.8,
      fillColor: getColor(layer.feature, filteredData)
    })
    layer.bringToFront()
  }
}

function onMouseOut (event, filteredData) {
  const layer = event.target
  // layer.setStyle(style(layer.feature, filteredData))
  // event.target.setStyle(style(event.target.feature))
  event.target.bringToFront()
  event.target.setStyle({
    fillColor: getColor(layer.feature, filteredData),
    weight: 1,
    opacity: 1,
    color: 'white',
    dashArray: '2',
    fillOpacity: 0.7
  })
}

function onEachFeature (feature, layer, filteredData) {
  layer.on({
    mouseover: (event) => onMouseOver(event, filteredData),
    mouseout: (event) => onMouseOut(event, filteredData)
  })
}

function style (feature, filteredData) {
  return {
    fillColor: getColor(feature, filteredData),
    weight: 1,
    opacity: 1,
    color: 'white',
    dashArray: '2',
    fillOpacity: 0.7
  }
}

export default function CrashBySide (props) {
  const [key, setKey] = useState(0)
  const filteredData = ChoroplethFilter(ChoroplethData, props.year, props.side)
  /*
  useEffect(() => {
    setKey(Object.keys(filteredData).length)
  }, [filteredData])
  */
  useEffect(() => {
    setKey(prevKey => prevKey + 1)
  }, [filteredData])
  return (
    /*
    <div>
      <div style={{ height: '1000px' }}>
        <h1>Choropleth</h1>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <GeoJSON data={side} />
          </MapContainer>
      </div>
    </div>
    */
    <div>
      <MyComponent result={filteredData} />

    <div style={{ height: '1000px' }}>
      <MapContainer center={[41.881832, -87.623177]} zoom={10} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON key={key} data={side} style={(feature) => style(feature, filteredData)} onEachFeature={(feature, layer) => onEachFeature(feature, layer, filteredData)} />
        </MapContainer>
    </div>
    </div>
  )
}
