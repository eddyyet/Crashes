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
      height={ size }
      x={x + size / 2 - 160}
      y={y}
      fill={fill || color}
      strokeWidth={borderWidth}
      stroke={borderColor}
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
      width={320}
      total={waffleData.total}
      data={waffleData.nivoInputData}
      rows={5}
      columns={20}
      colors={{ datum: 'color' }}
      fillDirection='top'
      cellComponent={CustomCell}
    />
  )
}
