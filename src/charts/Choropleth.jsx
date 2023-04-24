import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { MapContainer, TileLayer, GeoJSON, Marker, Popup, LayersControl } from 'react-leaflet'
import { MapContainer, TileLayer, GeoJSON, Marker } from 'react-leaflet'
// import * as d3 from 'd3'
import side from '../data/chicago_side.json'
import community from '../data/chicago_community.json'
import ChoroplethFilter from '../utils/ChoroplethData'
import ChoroplethData from '../data/choropleth.json'
import '../format/Choropleth.css'
import 'leaflet/dist/leaflet.css'
import isEqual from 'lodash/isEqual'
// import Control from 'react-leaflet-custom-control'
import L from 'leaflet'
// import cautionCrashIcon from '../images/choropleth_collision.png'
import exclam from '../images/max_crash_community5.png'
import sideCommunityLookup from '../data/chicago_side_communityarea_lookup.json'

/*
function MyComponent (props) {
  const { result } = props
  // console.log(result)
  return (
    <div>
      <h4>{JSON.stringify(result)} Test</h4>
    </div>
  )
}
*/
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
  // console.log(selectedData)
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
  const hslColor = getColor(layer.feature, selectedData.crashesPer1000)
  if (selectedData.crashesPer1000[featureId] !== undefined) {
    layer.setStyle({
      weight: 2,
      color: '#666',
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
      if (['Far North Side', 'Northwest Side', 'North Side', 'West Side'].includes(featureId)) {
        direction1 = 'bottom'
        if (['West Side'].includes(featureId)) {
          offset1 = [-70, 0]
        }
      } else if (['Southwest Side', 'Far Southwest Side'].includes(featureId)) {
        direction1 = 'top'
        offset1 = [-60, 0]
      } else if (['South Side', 'Central', 'Far Southeast Side'].includes(featureId)) {
        direction1 = 'left'
        offset1 = [20, -30]
      }
    } else if (Object.keys(selectedData.crashesPer1000).length === 1) {
      direction1 = 'bottom'
      offset1 = [0, 20]
    }

    const tooltipContent = `
      <div class='mo-tooltip'>
        <div class='title'>
          <strong><span class='side-name'>${featureId} </span>(Population: ${moPpl})</strong>
        </div>
        <div class='details'>
          <div class='detail-row'>
            <span class='detail-label'>Total crashes (${moStartYear} - ${moEndYear}): </span>
            <span class='detail-value'>${moCrashes}</span>
          </div>
          <div class='detail-row'>
            <span class='detail-label'>Crashes per 1K citizens each year: </span>
            <span class='citizens' style='color:${hslColor}'>${moPer1000}</span>
          </div>
          <div class='detail-row'>
            <span class='detail-label'>
            <!--<i class='icon' style="background-image: url(${exclam});"></i>-->
            Top crash area:</span>
            <span class='detail-value'>${maxCommunityDisplay} ${maxCommunityCrashesDisplay}</span>
          </div>
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
      opacity: 0.2,
      color: 'white',
      dashArray: '2',
      fillOpacity: 0.05
    })
  } else {
    layer.setStyle({
      fillColor,
      weight: 1.5,
      opacity: 1,
      color: 'white',
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
      opacity: 0.2,
      color: 'white',
      dashArray: '2',
      fillOpacity: 0.05
    }
  } else {
    return {
      fillColor,
      weight: 1.5,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.85
    }
  }
}
/*
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
*/
/*
function getCoordinatesForSide (side) {
  // Define the coordinates for each side of Chicago
  // console.log(side)
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
*/

function styleCommunity (feature, selectedData) {
  const matchResultStyle = {
    fillColor: 'transparent',
    fillOpacity: 0,
    // color: '#5b5b5b',
    color: '#e8dfdf',
    // color: '#000000',
    weight: 0.5,
    Opacity: 0.7
  }

  const unMatchResultStyle = {
    fillColor: 'transparent',
    fillOpacity: 0,
    // color: '#5b5b5b',
    color: '#e8dfdf',
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
    // console.log(filteredData)
    for (const side in filteredData.totalCount) {
      crashes[side] = filteredData.totalCount[side]
      const population = ppl[side]
      per1000[side] = Math.round(((crashes[side] / numYears) / population) * 1000)
    }
    for (const side in filteredData.maxCount) {
      // console.log(side)
      maxCrashesCommunity[side] = filteredData.maxCount[side]
    }
    const newData = {}
    newData.crashes = crashes
    newData.ppl = ppl
    newData.maxCrashesCommunity = maxCrashesCommunity
    newData.crashesPer1000 = per1000
    newData.yearArray = props.year
    newData.sideCommunity = sideCommunityLookup
    // console.log(newData)
    setSideData(newData)
  }, [filteredData])

  const customIcon1 = new L.Icon({
    iconUrl: exclam,
    // iconSize: [8, 8]
    iconSize: [15, 15]
  })

  /*
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
  */

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
  /*
  for (const communityName of Object.keys(sideData.maxCrashesCommunity)) {
    // console.log(communityName)
    const matchingFeature = community.features.find(f => f.properties.community === communityName)
    if (matchingFeature) {
      const multipolygon = matchingFeature.geometry
      const centroid = calculateCentroid(multipolygon)
      console.log(`Centroid for ${communityName}:`, centroid)
    }
  }
  */
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
    // console.log(coords)
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
  // console.log(mapZoom)
  return (
    <div>
      {/*
      <MyComponent result={sideData.crashes} />
      */}

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
        {/*
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXNiZDUwMDUiLCJhIjoiY2xnbWI1MXpmMDQ1cjNlanFycjE4NDUzdyJ9.Ghc_wgUqyPqJgQXwj-p_tw' />
        */}
        {/*
        <Legend />
        */}
        <GeoJSON data={community} style={choroplethStyleCommunity} ref={(layer) => layer?.leafletElement?.bringToFront()} />
        <GeoJSON key={key} data={side} style={choroplethStyleSide} onEachFeature={choroplethOnEachFeature} ref={(layer) => layer?.leafletElement?.bringToBack()} />
        {/*
        <LayersControl>
          <LayersControl.Overlay checked name="Layer Community">
            <GeoJSON data={community} style={styleCommunity} ref={(layer) => layer?.leafletElement?.bringToFront()} />
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Layer Side">
            <GeoJSON key={key} data={side} style={choroplethStyleSide} onEachFeature={choroplethOnEachFeature} ref={(layer) => layer?.leafletElement?.bringToBack()} />
          </LayersControl.Overlay>
        </LayersControl>
        */}
        {/*
        {sideCoords && (
        <Marker position={sideCoords} icon={customIcon}>
          <Popup>
            {maxCrashesSide} has the highest number of crashes with {maxCrashes} crashes.
          </Popup>
        </Marker>
        )}
        */}
        {centroidCoords.map(({ communityName, centroid, maxCrashes }, index) => {
          // console.log(`Rendering marker for community: ${communityName}`)
          return (
            <Marker key={index} position={centroid} icon={customIcon1}>
              {/*
              <Popup>
                <div>
                  <strong>{communityName}</strong>
                  <p>Max crashes: {maxCrashes.toLocaleString()}</p>
                </div>
              </Popup>
              */}
            </Marker>
          )
        })}
        </MapContainer>
    </div>
    </div>
  )
}
