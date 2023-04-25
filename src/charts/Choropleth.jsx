import React, { useState, useEffect, useCallback, useRef } from 'react'
import { MapContainer, TileLayer, GeoJSON, Marker } from 'react-leaflet'
import side from '../data/chicago_side.json'
import community from '../data/chicago_community.json'
import ChoroplethFilter from '../utils/ChoroplethData'
import ChoroplethData from '../data/choropleth.json'
import '../format/Choropleth.css'
import 'leaflet/dist/leaflet.css'
import isEqual from 'lodash/isEqual'
import L from 'leaflet'
import topCrashSymbol from '../images/crash_icon_white.png'
import sideCommunityLookup from '../data/chicago_side_communityarea_lookup.json'

function getColor (feature, selectedData) {
  if (selectedData[feature.properties.id] !== undefined) {
    const value = selectedData[feature.properties.id]

    const hue = value > 60 ? 5 : 53 - Math.max(value, 15) * 0.8
    const saturation = (Math.max(Math.min(value, 60), 20) - 20) * 2.5
    const lightness = value > 60 ? 115 - Math.min(value, 75) : 73 - Math.max(value, 15) * 0.3
    const alpha = Math.min(value * 1.2 + 13, 85)

    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha}%)`
  } else {
    return '#ccc' // color for unknown feature
  }
}

function onMouseOver (event, selectedData) {
  const layer = event.target
  const featureId = layer.feature.properties.id
  const hslColor = getColor(layer.feature, selectedData.crashesPer1000)
  if (selectedData.crashesPer1000[featureId] !== undefined) {
    layer.setStyle({
      weight: 1.5,
      color: '#FFF',
      dashArray: '',
      fillOpacity: 0.85,
      fillColor: hslColor
    })
    // console.log(selectedData)
    const moCrashes = selectedData.crashes[featureId].toLocaleString()
    const moPpl = selectedData.ppl[featureId].toLocaleString()
    const moPer1000 = selectedData.crashesPer1000[featureId]
    const moStartYear = selectedData.yearArray[0]
    const moEndYear = selectedData.yearArray[1]
    let maxCommunity = ''
    let maxCrashes = 0
    const areas = selectedData.sideCommunity[featureId]
    if (areas) {
      for (const area of areas) {
        const crashes = selectedData.maxCrashesCommunity[area]
        if (crashes && crashes > maxCrashes) {
          maxCrashes = crashes
          maxCommunity = area
        }
      }
    }
    let maxCommunityDisplay = ''
    if (typeof maxCommunity === 'string' && maxCommunity.trim().length > 0) {
      const communityParts = maxCommunity.trim().split(' ')
      const capitalizedParts = communityParts.map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      maxCommunityDisplay = capitalizedParts.join(' ')
    } else {
      maxCommunityDisplay = 'N/A'
    }
    const maxCommunityCrashesDisplay = maxCrashes.toLocaleString()

    let direction1 = 'auto'
    let offset1 = [0, 0]
    if (Object.keys(selectedData.crashesPer1000).length === 9) {
      if (['Far North Side', 'Northwest Side', 'North Side'].includes(featureId)) {
        direction1 = 'bottom'
        offset1 = [10, 20]
      } else if (['West Side'].includes(featureId)) {
        direction1 = 'bottom'
        offset1 = [0, 20]
      } else if (['Central'].includes(featureId)) {
        direction1 = 'bottom'
        offset1 = [-20, 20]
      } else if (['South Side', 'Far Southeast Side', 'Southwest Side', 'Far Southwest Side'].includes(featureId)) {
        direction1 = 'top'
        offset1 = [-50, -20]
      }
    } else if (Object.keys(selectedData.crashesPer1000).length === 1) {
      direction1 = 'bottom'
      offset1 = [0, 20]
    }

    const tooltipContent = `
      <div class='mo-tooltip'>
        <div class='title'>
          <div class='side-name'>${featureId}</div>
          <div>Population: ${moPpl}</div>
        </div>
        <div class='detail-row'>
          <span class='detail-label'>Number of crashes (${moStartYear} - ${moEndYear}) </span>
          <span class='detail-value'>${moCrashes}</span>
        </div>
        <div class='detail-row'>
          <span class='detail-label'>Crashes per 1000 population per year </span>
          <span class='crash-rate' style='color:${hslColor}'>${moPer1000}</span>
        </div>
        <div class='detail-row'>
          <span class='detail-label'>
          Top crash area</span>
          <span class='detail-value'>${maxCommunityDisplay} (${maxCommunityCrashesDisplay})</span>
        </div>
      </div>
    `
    layer.bindTooltip(tooltipContent, { className: 'my-tooltip-class', sticky: false, offset: offset1, keepInView: true, direction: direction1, permanent: true })
    layer.openTooltip()
    layer.bringToFront()
  }
}

function onMouseOut (event, selectedData) {
  const layer = event.target
  const fillColor = getColor(layer.feature, selectedData.crashesPer1000)

  if (fillColor === '#ccc') {
    layer.setStyle({
      fillColor: '#ccc',
      weight: 1,
      opacity: 0.8,
      color: '#2d2f31',
      dashArray: '2',
      fillOpacity: 0.05
    })
  } else {
    layer.setStyle({
      fillColor,
      weight: 1,
      opacity: 1,
      color: '#2d2f31',
      fillOpacity: 0.85
    })
  }

  layer.bringToFront()
  layer.unbindTooltip()
}

function onEachFeature (feature, layer, selectedData) {
  layer.on({
    mouseover: (event) => onMouseOver(event, selectedData),
    mouseout: (event) => onMouseOut(event, selectedData)
  })
}

function styleSide (feature, selectedData) {
  const fillColor = getColor(feature, selectedData.crashesPer1000)
  if (fillColor === '#ccc') {
    return {
      fillColor: '#ccc',
      weight: 1,
      opacity: 0.8,
      color: '#2d2f31',
      dashArray: '2',
      fillOpacity: 0.05
    }
  } else {
    return {
      fillColor,
      weight: 1,
      opacity: 1,
      color: '#2d2f31',
      fillOpacity: 0.85
    }
  }
}

function styleCommunity (feature, selectedData) {
  const matchResultStyle = {
    fillColor: 'transparent',
    fillOpacity: 0,
    color: '#2d2f31',
    weight: 0.5,
    Opacity: 0.7
  }

  const unMatchResultStyle = {
    fillColor: 'transparent',
    fillOpacity: 0,
    color: '#2d2f31',
    weight: 0,
    Opacity: 0
  }

  for (const [community, maxCrashCommunity] of Object.entries(selectedData.maxCrashesCommunity)) {
    const side = Object.keys(selectedData.sideCommunity).find(key => selectedData.sideCommunity[key].includes(community))
    const communities = selectedData.sideCommunity[side]

    if (community === maxCrashCommunity) {
      // The feature's community is the maxCrashCommunity for this side
      return matchResultStyle
    } else if (communities.some(c => c === feature.properties.community)) {
      // The feature's community is in the same side as the maxCrashCommunity
      return matchResultStyle
    }
  }

  // The feature's community is NOT in selectedData.maxCrashesCommunity
  return unMatchResultStyle
}

function calculateCentroid (geojson) {
  const bounds = new L.LatLngBounds()
  let centroid = new L.LatLng(0, 0)
  let area = 0

  // Loop through each polygon in the GeoJSON object
  geojson.coordinates.forEach(polygon => {
    // Loop through each ring in the polygon (outer and inner rings)
    polygon.forEach(ring => {
      // Loop through each vertex in the ring
      for (let i = 0; i < ring.length; i++) {
        const vertex1 = new L.LatLng(ring[i][1], ring[i][0])
        bounds.extend(vertex1)
        if (i === 0) continue
        const vertex2 = new L.LatLng(ring[i - 1][1], ring[i - 1][0])
        const segmentArea = vertex1.lng * vertex2.lat - vertex2.lng * vertex1.lat
        centroid = L.latLng(
          centroid.lat + (vertex1.lat + vertex2.lat) * segmentArea,
          centroid.lng + (vertex1.lng + vertex2.lng) * segmentArea
        )
        area += segmentArea
      }
    })
  })

  centroid = L.latLng(centroid.lat / (3 * area), centroid.lng / (3 * area))
  return centroid
}

export default function CrashBySide (props) {
  const [key, setKey] = useState(0)
  const [filteredData, setFilteredData] = useState([])
  const [sideData, setSideData] = useState({ crashes: {}, ppl: {}, crashesPer1000: {}, maxCrashesCommunity: {} })
  const prevFilteredDataRef = useRef()
  const [centroidCoords, setCentroidCoords] = useState([])
  const [mapCenter, setMapCenter] = useState([41.881832 - 0.05, -87.623177 - 0.01])
  const [mapZoom, setMapZoom] = useState(10)
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
    const maxCrashesCommunity = {}

    for (const side in filteredData.totalCount) {
      crashes[side] = filteredData.totalCount[side]
      const population = ppl[side]
      per1000[side] = Math.round(((crashes[side] / numYears) / population) * 1000)
    }
    for (const side in filteredData.maxCount) {
      maxCrashesCommunity[side] = filteredData.maxCount[side]
    }
    const newData = {}
    newData.crashes = crashes
    newData.ppl = ppl
    newData.maxCrashesCommunity = maxCrashesCommunity
    newData.crashesPer1000 = per1000
    newData.yearArray = props.year
    newData.sideCommunity = sideCommunityLookup
    setSideData(newData)
  }, [filteredData])

  const customIcon1 = new L.Icon({
    iconUrl: topCrashSymbol,
    iconSize: [25, 25]
  })

  const choroplethStyleSide = useCallback((feature) => {
    return styleSide(feature, sideData)
  }, [sideData])

  const choroplethStyleCommunity = useCallback((feature) => {
    return styleCommunity(feature, sideData)
  }, [sideData])

  const choroplethOnEachFeature = useCallback((feature, layer) => {
    onEachFeature(feature, layer, sideData)
  }, [sideData])
  useEffect(() => {
    setKey(prevKey => prevKey + 1)
  }, [filteredData])

  useEffect(() => {
    const coords = []
    // console.log('useEffect called')
    for (const communityName of Object.keys(sideData.maxCrashesCommunity)) {
      // console.log(communityName)
      const matchingFeature = community.features.find(f => f.properties.community === communityName)
      if (matchingFeature) {
        const multipolygon = matchingFeature.geometry
        const centroid = calculateCentroid(multipolygon)
        coords.push({ communityName, centroid, maxCrashes: sideData.maxCrashesCommunity[communityName] })
      }
    }

    setCentroidCoords(coords)
  }, [sideData])

  useEffect(() => {
    // Define the center and zoom level for each side
    const centerMap = {
      Central: [41.878, -87.626],
      'Far North Side': [41.979, -87.7636],
      'Far Southeast Side': [41.6969, -87.5842],
      'Far Southwest Side': [41.7229, -87.6649 - 0.01],
      'North Side': [41.931, -87.6767],
      'Northwest Side': [41.9372, -87.7732],
      'South Side': [41.7965, -87.6067],
      'Southwest Side': [41.7925, -87.6959 - 0.01],
      'West Side': [41.8701, -87.7049]
    }

    const zoomMap = {
      Central: 12,
      'Far North Side': 10,
      'Far Southeast Side': 11,
      'Far Southwest Side': 11,
      'North Side': 12,
      'Northwest Side': 11,
      'South Side': 11,
      'Southwest Side': 11,
      'West Side': 11
    }
    // Update the map center point and zoom level based on the current side
    setMapCenter(centerMap[props.side] || [41.881832 - 0.05, -87.623177 - 0.1])
    setMapZoom(zoomMap[props.side] || 10)
  }, [props.side])
  return (
    <div>
      <div>
        <MapContainer
          key={key}
          center={mapCenter}
          zoom={mapZoom}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          dragging={false}
        >
        <TileLayer className={'dark-mode'} url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <GeoJSON data={community} style={choroplethStyleCommunity} ref={(layer) => layer?.leafletElement?.bringToFront()} />
        <GeoJSON key={key} data={side} style={choroplethStyleSide} onEachFeature={choroplethOnEachFeature} ref={(layer) => layer?.leafletElement?.bringToBack()} />
        {centroidCoords.map(({ communityName, centroid, maxCrashes }, index) => {
          return (
            <Marker key={index} position={centroid} icon={customIcon1}></Marker>
          )
        })}
        </MapContainer>
      </div>
    </div>
  )
}
