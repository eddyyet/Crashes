import './App.css'
import React from 'react'
import Stack from '@mui/material/Stack'
import { Chart } from './chart'
import HeatMap from './charts/HeatMap'

function App () {
  return (
    <div className="App">
      <Stack spacing={1.5} sx={{ width: '800px' }}>
        <Chart height='500px'>
          <div>When were the crashes?</div>
          <HeatMap year={[2019, 2022]} side='Far North Side' />
        </Chart>
        <Chart>2</Chart>
        <Chart>3</Chart>
      </Stack>
    </div>
  )
}

export default App
