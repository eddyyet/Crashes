import React from 'react'
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
  }) => (
    <Person
      height={ size * 2.5 }
      x={ x - 159 }
      y={ y + Math.floor(position / 25) * 5 - 19 }
      fill={color}
      strokeWidth={0.25}
      stroke={'#28292a'}
      opacity={opacity}
      onMouseEnter={onHover}
      onMouseMove={onHover}
      onMouseLeave={onLeave}
      onClick={event => { onClick({ position, color, x, y, data }, event) }}
    />
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
    />
  )
}
