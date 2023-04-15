import React from 'react'
import filter from '../utils/filter'
import BubbleData from '../utils/BubbleData'
import typeData from '../data/crash_type.json'
import bgImage from '../images/crash_type_bg_rect.svg'
import bubbleImage from '../images/crash_type_symbol.svg'

export default function Bubble (props) {
  const filteredData = filter(typeData, props.year, props.side)
  const bubbleData = BubbleData(filteredData)

  return (
    <div style={{ position: 'relative' }}>
      <img src={bgImage} alt="background" style={{ width: '100%', opacity: '40%' }} />
      {bubbleData.map((item, index) => (
        <div key={index}>
          <div style={{
            position: 'absolute',
            left: `${item.x * 100}%`,
            top: `${item.y * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}>
            <img src={bubbleImage} alt={item.type} style={{
              width: `${item.size}%`,
              opacity: item.opacity * 0.5
            }} />
          </div>
          <div style={{
            position: 'absolute',
            left: `${item.x * 100}%`,
            top: `${item.y * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div>{item.type}</div>
              <div>{item.count}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
