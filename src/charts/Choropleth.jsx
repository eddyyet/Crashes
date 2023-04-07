import React from 'react'
// import React, { useState, useRef, useMemo, useCallback } from 'react'
// import { MapContainer, TileLayer } from 'react-leaflet'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
// mport L from 'leaflet'
// import side from '../data/custom.geo.50.json'
import side from '../data/chicago_side.json'
import './Choropleth.css'
import 'leaflet/dist/leaflet.css'
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
        <GeoJSON data={side} />
        </MapContainer>
    </div>
  </div>
  )
}
