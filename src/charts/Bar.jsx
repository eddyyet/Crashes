import '../format/format.css'
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

    return (
      <div className={'tooltip'}>
        <strong>{value}</strong> ({percentage}) people are <span style={{ textTransform: 'lowercase' }}>{id}</span>.
      </div>
    )
  }

  return (
    <div>
      <div style={{ height: '6px' }}>
      <ResponsiveBar
        height={6}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        padding={0}
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
