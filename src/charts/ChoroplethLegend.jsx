import React from 'react'
import '../format/Legend.css'
import exclam from '../images/max_crash_community5.png'

export default function Legend () {
  const dataValues = [15, 30, 45, 60, 75]
  const legendLabels = dataValues.map((value, index) => (
    <div key={index} className="legend-label">
      {value}
    </div>
  ))

  return (
    <div className="legend-container">
      <div className='legend-transform'>
        <div>Crashes per 1000 citizens each year</div>
        <div className='legend-gradient'></div>
        <div className="legend-labels">{legendLabels}</div>
      </div>
      <div className='legend-transform'>
        <img src={exclam} alt="Exclamation Icon" style={{ width: '15px', height: '15px', marginRight: '5px', marginTop: '1px' }} />
        <span className="legend-text">Top crash area</span>
      </div>
    </div>
  )
}
