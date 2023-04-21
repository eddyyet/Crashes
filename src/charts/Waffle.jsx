import React, { useState } from 'react'
import { ResponsiveWaffle } from '@nivo/waffle'
import filter from '../utils/filter'
import WaffleData from '../utils/WaffleData'
import injuryData from '../data/crash_injury.json'
import { ReactComponent as Person } from '../images/person.svg'

export default function Line (props) {
  const filteredData = filter(injuryData, props.year, props.side)
  const waffleData = WaffleData(filteredData)

  const CustomCell = ({
    position,
    size,
    x,
    y,
    color,
    fill,
    opacity,
    borderWidth,
    borderColor,
    data,
    onHover,
    onLeave,
    onClick
  }) => {
    const [hovering, setHovering] = useState(false)
    const handleHover = (event) => {
      setHovering(true)
      onHover(event)
    }
    const handleLeave = (event) => {
      setHovering(false)
      onLeave(event)
    }

    return (
      <Person
        height={hovering ? size * 3 : size * 2.5 }
        x={ x - 159 }
        y={hovering ? y + Math.floor(position / 25) * 3 - 13 - size * 0.5 : y + Math.floor(position / 25) * 3 - 13 }
        fill={color}
        strokeWidth={0.25}
        stroke={'#28292a'}
        opacity={hovering ? 1 : 0.6}
        onMouseEnter={handleHover}
        onMouseMove={handleHover}
        onMouseLeave={handleLeave}
        onClick={event => { onClick({ position, color, x, y, data }, event) }}
      />
    )
  }

  const customTooltip = (node) => (
    <div className={'tooltip'}>
      <div className={'tooltipLargeText'} style={{ color: node.color }}><strong>{node.id}</strong></div>
      <div><span className={'tooltipLargeText'}>{node.value.toLocaleString('en-US')}</span><span> people</span></div>
      <div style={{ marginTop: '0.5rem' }}>
        equivalent to<br />
        {node.percentageToInjured} of the people injured<br />
        {node.percentageToInvolved} of the people involved
      </div>
    </div>
  )

  return (
    <ResponsiveWaffle
      height={90}
      width={330}
      total={waffleData.totalInjured}
      data={waffleData.nivoInputData}
      rows={4}
      columns={25}
      colors={{ datum: 'color' }}
      fillDirection='top'
      cellComponent={CustomCell}
      tooltip={customTooltip}
      theme={{ tooltip: { container: null } }}
    />
  )
}
