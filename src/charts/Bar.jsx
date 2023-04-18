import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import filter from '../utils/filter'
import BarData from '../utils/BarData'
import injuryData from '../data/crash_injury.json'

export default function Bar (props) {
  const filteredData = filter(injuryData, props.year, props.side)
  const barData = BarData(filteredData)
  const injured = barData.nivoInputData[0].Injured
  const notInjured = barData.nivoInputData[0]['Not injured']
  const injuredColor = barData.nivoInputData[0].InjuredColor
  const notInjuredColor = barData.nivoInputData[0]['Not injuredColor']

  const customTooltip = ({ data, id, value }) => {
    const percentage = data[`${id}Percentage`]
    const injuredDescription = id === 'Injured'
      ? (<div>including the people dead, incapacitated, moderately injured and injured but not apparent</div>)
      : null

    return (
      <div className={'tooltip'}>
        <div style={{ fontSize: '1rem', color: data[`${id}Color`] }}><strong>{id}</strong></div>
        <div style={{ fontSize: '1rem' }}>{value}</div>
        <div><br />equivalent to {percentage} of the people involved</div>
        {injuredDescription}
      </div>
    )
  }

  return (
    <div>
      <div style={{ height: '15px' }}>
        <ResponsiveBar
          height={15}
          innerPadding={1}
          layout='horizontal'
          keys={['Injured', 'Not injured']}
          data={barData.nivoInputData}
          colors={({ id, data }) => data[`${id}Color`]}
          label={null}
          enableGridX={false}
          enableGridY={false}
          tooltip={customTooltip}
        />
      </div>
      <div className={'barFigure'}>
        <div style={{ color: injuredColor }}>
          <div>Injured</div>
          <div>{injured}</div>
        </div>
        <div style={{ textAlign: 'right', color: notInjuredColor }}>
          <div>Not injured</div>
          <div>{notInjured}</div>
        </div>
      </div>
    </div>
  )
}
