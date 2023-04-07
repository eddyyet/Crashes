import React from 'react'
// import React, { useState, useRef, useMemo, useCallback } from 'react'
// import { MapContainer, TileLayer } from 'react-leaflet'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
// mport L from 'leaflet'
import side from '../data/chicago_side.json'
import './Choropleth.css'
import 'leaflet/dist/leaflet.css'

function onMouseOver (event) {
  const layer = event.target
  layer.setStyle({
    weight: 3,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  })
  layer.bringToFront()
}

function onMouseOut (event) {
  event.target.setStyle(style(event.target.feature))
  /*
  event.target.bringToFront()
  event.target.setStyle({
    fillColor: '#FC4E2A',
    weight: 1,
    opacity: 1,
    color: 'white',
    dashArray: '2',
    fillOpacity: 0.7
  })
  */
}

function onEachFeature (feature, layer) {
  layer.on({
    mouseover: onMouseOver,
    mouseout: onMouseOut
  })
}

function style () {
  return {
    fillColor: '#FC4E2A',
    weight: 1,
    opacity: 1,
    color: 'white',
    dashArray: '2',
    fillOpacity: 0.7
  }
}

export default function CrashBySide () {
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
    <div style={{ height: '1000px' }}>
      <h1>Choropleth</h1>
      <MapContainer center={[41.881832, -87.623177]} zoom={10} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON data={side} style={style} onEachFeature={onEachFeature} />
        </MapContainer>
    </div>
  </div>
  )
}
