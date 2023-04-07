import React from 'react'
// import './styles.css'
import { ResponsiveGeoMap } from '@nivo/geo'
// import { ResponsiveChoroplethCanvas } from '@nivo/geo'
// import { ResponsiveGeoMapCanvas } from '@nivo/geo'
// import { ResponsiveChoropleth } from '@nivo/geo'
import countries from '../data/world_countries.json'
// import ChoroplethData from '../utils/ChoroplethData'

/*
const dataabc = [
  {
    id: 'AFG',
    value: 685849
  },
  {
    id: 'AGO',
    value: 733895
  },
  {
    id: 'ALB',
    value: 847004
  }
]
export default function CrashBySide () {
  return (
    <div>
      <div style={{ height: '400px' }}>
        <h1>Choropleth</h1>
        <MyResponsiveChoropleth data={ChoroplethData} />
      </div>
    </div>
  )
}
const MyResponsiveChoropleth = ({ data }) => (
  <ResponsiveChoropleth
    data={data}
    features={countries.features}
    colors='nivo'
    unknownColor='#666666'
    label='properties.name'
    valueFormat='.2s'
    projectionTranslation={[0.5, 0.5]}
    enableGraticule={true}
    graticuleLineColor='#dddddd'
    borderWidth={0.5}
    borderColor='#152538'
    legends={[
      {
        anchor: 'bottom-left',
        direction: 'column',
        justify: true,
        translateX: 20,
        translateY: -100,
        itemsSpacing: 0,
        itemWidth: 94,
        itemHeight: 18,
        itemDirection: 'left-to-right',
        itemTextColor: '#444444',
        itemOpacity: 0.85,
        symbolSize: 18,
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000000',
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
  />
)
*/
export default function CrashBySide () {
  return (
    <div>
      <div style={{ height: '400px' }}>
        <h1>Choropleth</h1>
        <MyResponsiveGeoMap />
      </div>
    </div>
  )
}

const MyResponsiveGeoMap = () => (
  <ResponsiveGeoMap
    features={countries.features}
    projectionTranslation={[0.5, 0.5]}
    fillColor='#eeeeee'
    borderWidth={0.5}
    borderColor='#333333'
    enableGraticule={true}
    graticuleLineColor='#666666'
  />
)
