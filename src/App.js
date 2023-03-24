import './format.css'
import React, { useState } from 'react'
import FilterControl from './utils/FilterControl'
import Stack from '@mui/material/Stack'
import { Chart } from './Chart'
import CirclePacking from './charts/CirclePacking'
import HeatMap from './charts/HeatMap'
import { BarInvolved, BarInjured } from './charts/Bar'
import Sankey from './charts/Sankey'
import Bubble from './charts/Bubble'

export default function App () {
  const [yearRange, setYearRange] = useState([2018, 2022])
  const [side, setSide] = useState('All')

  return (
    <div className="App">
      <FilterControl
        yearRange={yearRange}
        setYearRange={setYearRange}
        side={side}
        setSide={setSide}
      />
      <Stack spacing={3} sx={{ width: '800px' }}>
        <Chart height='500px'>
          <div>Why are the crashes?</div>
          <CirclePacking year={yearRange} side={side} />
        </Chart>
        <Chart height='500px'>
          <div>When were the crashes?</div>
          <HeatMap year={yearRange} side={side} />
        </Chart>
        <Chart>
          <div>How are the victims?</div>
          <div className={'subtitle'}>Among the people involved...</div>
          <div style={{ height: '40px' }}>
            <BarInvolved year={yearRange} side={side} />
          </div>
          <div className={'subtitle'}>Among the people injuried...</div>
          <div style={{ height: '40px' }}>
            <BarInjured year={yearRange} side={side} />
          </div>
        </Chart>
        <Chart>
          <div>How was the scene?</div>
          <div style={{ height: '300px' }}>
            <Sankey year={yearRange} side={side} />
          </div>
        </Chart>
        <Chart>
          <div>How did it crash?</div>
          <Bubble year={yearRange} side={side} />
        </Chart>
        <Chart>6</Chart>
      </Stack>
    </div>
  )
}
