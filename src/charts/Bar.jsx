import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import filter from '../utils/filter'
import pplInvoledData from '../data/crash_ppl_involved.json'
import pplInjuredData from '../data/crash_ppl_injured.json'

export function BarInvolved (props) {
  const filteredData = filter(pplInvoledData, props.year, props.side)

  return (
    <ResponsiveBar
      data={[filteredData]}
      keys={['Injured', 'No indication of injury']}
      layout="horizontal"
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      padding={0}
      colors={{ scheme: 'purple_orange' }}
      label={data => `${data.id}: ${data.value}`}
      labelFormat= {'textAnchor:left' }
      enableGridX={false}
      enableGridY={false}
    />
  )
}

export function BarInjured (props) {
  const filteredData = filter(pplInjuredData, props.year, props.side)

  return (
    <ResponsiveBar
      data={[filteredData]}
      keys={['Fatal', 'Incapacitating', 'Non-incapacitating', 'Reported but not evident']}
      layout="horizontal"
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      padding={0}
      colors={{ scheme: 'purple_orange' }}
      label={data => `${data.id}: ${data.value}`}
      labelFormat= {'textAnchor:left' }
      enableGridX={false}
      enableGridY={false}
    />
  )
}
