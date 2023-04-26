import React from 'react'
import '../format/ChoroplethLegend.css'
import topCrashSymbol from '../images/crash_icon_white.png'

export default function Legend () {
  const dataValues = [15, 30, 45, 60, 75]
  const legendLabels = dataValues.map((value, index) => (
    <div key={index} className="legend-label">
      {value}
    </div>
  ))

  return (
    <div className='mapLegend' style={{ marginTop: '6px' }}>
      <div className='legend-transform' style={{ width: '225px', marginRight: '23px' }}>
        <div>Crashes per 1000 population per year</div>
        <div className='legend-gradient'></div>
        <div className="legend-labels">{legendLabels}</div>
      </div>
      <div className='mapLegend'>
        <img src={topCrashSymbol} alt="Crash Icon" style={{ width: '16px', height: '16px', marginRight: '4px' }} />
        <span>Top crash area</span>
      </div>
    </div>
  )
}
