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
    <div className='mapLegend'>
      <div style={{ width: '220px', marginRight: '20px' }}>
        <div className='legend-transform' style={{ width: '280px' }}>
          <div>Crashes per 1000 population per year</div>
          <div className='legend-gradient'></div>
          <div className="legend-labels">{legendLabels}</div>
        </div>
      </div>
      <div style={{ width: '165px' }}>
        <div className='mapLegend legend-transform' style={{ width: '160px' }}>
          <img src={topCrashSymbol} alt="Crash Icon" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
          <span>Top crash area</span>
        </div>
      </div>
    </div>
  )
}
