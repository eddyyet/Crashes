import '../format.css'
import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import filter from '../utils/filter'
import BarData from '../utils/BarData'
import injuryData from '../data/crash_injury.json'

export default function Bar (props) {
  const filteredData = filter(injuryData, props.year, props.side)
  const barData = BarData(filteredData)
  // const injured = barData.nivoInputData[0].Injured
  // const notInjured = barData.nivoInputData[0]['Not injured']

  return (
    <div height='30px' width='340px'>
    <ResponsiveBar
      height={20}
      width={310}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      padding={0}
      layout='horizontal'
      keys={['Injured', 'Not injured']}
      data={barData.nivoInputData}
      colors={({ id, data }) => data[`${id}Color`]}
      label={null}
      enableGridX={false}
      enableGridY={false}
    />
    {/* <div className={'barFigure'}>
      <div className={'barFigureInjured'}>
        <div>Injured</div>
        <div>{injured}</div>
      </div>
      <div className={'barFigureNotInjured'}>
        <div>Not injured</div>
        <div>{notInjured}</div>
      </div>
    </div> */}
    </div>
  )
}
