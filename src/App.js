import './format.css'
import React from 'react'
import Stack from '@mui/material/Stack'
import { Chart } from './chart'
import HeatMap from './charts/HeatMap'
import { BarInvolved, BarInjured } from './charts/Bar'

export default function App () {
  return (
    <div className="App">
      <Stack spacing={3} sx={{ width: '800px' }}>
        <Chart height='500px'>
          <div>When were the crashes?</div>
          <HeatMap year={[2018, 2022]} side='Far North Side' />
        </Chart>
        <Chart>
          <div>How are the victims?</div>
          <div className={'subtitle'}>Among the people involved...</div>
          <div style={{ height: '40px' }}>
            <BarInvolved year={[2018, 2022]} side='Far North Side' />
          </div>
          <div className={'subtitle'}>Among the people injuried...</div>
          <div style={{ height: '40px' }}>
            <BarInjured year={[2018, 2022]} side='Far North Side' />
          </div>
        </Chart>
        <Chart>3</Chart>
        <Chart>4</Chart>
        <Chart>5</Chart>
      </Stack>
    </div>
  )
}
