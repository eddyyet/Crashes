import React from 'react'
import exclam from '../images/max_crash_community5.png'
import '../format/Legend.css'

function Legend2 () {
  return (
    <div className="legend-container" style={{ justifyContent: 'flex-end', marginTop: '15px' }}>
      <img src={exclam} alt="Exclamation Icon" style={{ width: '15px', height: '15px', marginRight: '5px', marginTop: '1px' }} />
    <span className="legend-text" style={{ textAlign: 'right', marginRight: '15px' }}>Top crash area</span>
    </div>
  )
}

export default Legend2
