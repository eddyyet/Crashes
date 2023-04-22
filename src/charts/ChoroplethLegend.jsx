import React from 'react'
import '../format/Legend.css'

function Legend () {
  const dataValues = [18, 31, 44, 57, 70]
  const gradient =
    'linear-gradient(to right, #ffffff, #fff2a8, #ffa238, #c72b00, #4d0000)'
  const legendLabels = dataValues.map((value, index) => (
    <div key={index} className="legend-label">
      {value}
    </div>
  ))

  return (
    <div className="legend-container">
      <div className="legend-text">
        Crashes per 1000 citizens each year
      </div>
      <div className="legend-wrapper">
        <div
          className="legend-gradient"
          style={{ background: gradient }}
        ></div>
        <div className="legend-labels">{legendLabels}</div>
      </div>
    </div>
  )
}
export default Legend
