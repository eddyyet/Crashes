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
      keys={['INJURIES_TOTAL', 'INJURIES_NO_INDICATION']}
      layout="horizontal"
      height={50}
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
      keys={['INJURIES_FATAL', 'INJURIES_INCAPACITATING', 'INJURIES_NON_INCAPACITATING', 'INJURIES_REPORTED_NOT_EVIDENT']}
      layout="horizontal"
      height={50}
      colors={{ scheme: 'purple_orange' }}
      label={data => `${data.id}: ${data.value}`}
      labelFormat= {'textAnchor:left' }
      enableGridX={false}
      enableGridY={false}
    />
  )
}
