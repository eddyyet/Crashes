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
      {bubbleData.map((item, index) => {
        const bubbleTypeClass = item.size > 0.7 ? 'bubbleTypeLarge' : item.size > 0.4 ? 'bubbleTypeMid' : 'bubbleTypeSmall'
        const bubbleCountClass = item.size > 0.7 ? 'bubbleCountLarge' : item.size > 0.4 ? 'bubbleCountMid' : 'bubbleCountSmall'

        return (
          <div key={index}>
            <div style={{
              position: 'absolute',
              left: `${item.x * 100}%`,
              top: `${item.y * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}>
              <img src={bubbleImage} alt={item.type} style={{
                width: `${item.size * 200}px`,
                opacity: item.opacity * 0.45
              }} />
            </div>
            <div style={{
              position: 'absolute',
              left: `${item.x * 100}%`,
              top: `${item.y * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div className={bubbleTypeClass}>{item.type}</div>
                <div className={bubbleCountClass}>{item.count}</div>
              </div>
            </div>
          </div>
        )
      }
      )}
    </div>
  )
}
