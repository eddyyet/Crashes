import './format.css'
import React from 'react'
import Stack from '@mui/material/Stack'
import { Chart } from './chart'
import HeatMap from './charts/HeatMap'
import { BarInvolved, BarInjured } from './charts/Bar'

export default function App () {
  return (
    <div className="App">
      <Stack spacing={1.5} sx={{ width: '800px' }}>
        <Chart height='500px'>
          <div>When were the crashes?</div>
          <HeatMap year={[2018, 2022]} side='Far North Side' />
        </Chart>
        <Chart>
          <div>How are the victims?</div>
          <div>Among the people involved...</div>
          <BarInvolved year={[2018, 2022]} side='Far North Side' />
          <div>Among the people injuried...</div>
          <BarInjured year={[2018, 2022]} side='Far North Side' />
        </Chart>
        <Chart>3</Chart>
      </Stack>
    </div>
  )
}
