import React, { useState, useEffect, useCallback, useRef } from 'react'
// import React, { useState, useRef, useMemo, useCallback } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import * as d3 from 'd3'
import side from '../data/chicago_side.json'
import ChoroplethFilter from '../utils/ChoroplethData'
import ChoroplethData from '../data/choropleth.json'
import './Choropleth.css'
import 'leaflet/dist/leaflet.css'
import isEqual from 'lodash/isEqual'

function MyComponent (props) {
  const { result } = props
  // console.log(result)
  return (
    <div>
      <h4>{JSON.stringify(result)} Test</h4>
    </div>
  )
}

function getColor (feature, selectedData) {
  // console.log(filteredData)
  const numKeys = Object.keys(selectedData).length
  if (numKeys === 1) {
    // if there is only one key-value pair in filteredData
    if (selectedData[feature.properties.id] !== undefined) {
      // if the feature is present in the filteredData object
      return '#d94701' // default color for single feature
    } else {
      return '#ccc' // color for unknown feature
    }
  }

  const colorClasses = ['#feedde', '#fdbe85', '#fd8d3c', '#d94701']
  const value = selectedData[feature.properties.id]
  const values = Object.values(selectedData)
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

function onMouseOver (event, selectedData) {
  const layer = event.target
  const featureId = layer.feature.properties.id

  if (selectedData.crashesPer1000[featureId] !== undefined) {
    layer.setStyle({
      weight: 3,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.8,
      fillColor: getColor(layer.feature, selectedData.crashesPer1000)
    })
    // console.log(selectedData)
    const moCrashes = selectedData.crashes[featureId].toLocaleString()
    const moPpl = selectedData.ppl[featureId].toLocaleString()
    const moPer1000 = selectedData.crashesPer1000[featureId]
    const moStartYear = selectedData.yearArray[0]
    const moEndYear = selectedData.yearArray[1]
    layer.bindTooltip(`
      <div class="mo-tooltip">
          <strong><span class="side-name">${featureId}</span></strong><br>
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
    fillOpacity: 0.7
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
    fillOpacity: 0.7
  }
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
      <MyComponent result={filteredData} />

    <div style={{ height: '1000px' }}>
      <MapContainer center={[41.881832, -87.623177]} zoom={10} scrollWheelZoom={false}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <GeoJSON key={key} data={side} style={choroplethStyle} onEachFeature={choroplethOnEachFeature} />
        </MapContainer>
    </div>
    </div>
  )
}
