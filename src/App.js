import './format.css'
import React, { useState } from 'react'
import FilterControl from './utils/FilterControl'
import Stack from '@mui/material/Stack'
import { BigChart } from './Chart'
import Sunburst from './charts/Sunburst'
import Network from './charts/Network'
import HeatMap from './charts/HeatMap'
import { BarInvolved, BarInjured } from './charts/Bar'
import Sankey from './charts/Sankey'
import Bubble from './charts/Bubble'
import Choropleth from './charts/Choropleth'

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
      <Stack spacing={3} sx={{ width: '1200px' }}>
        <BigChart height='500px'>
          <div>Why are the crashes?</div>
          <Sunburst year={yearRange} side={side} />
        </BigChart>
        <BigChart>
          <div>What are making the crashes deadly?</div>
          <Stack direction='row' spacing='1.5rem'>
            <Network year={yearRange} side={side} />
          </Stack>
        </BigChart>
        <BigChart height='500px'>
          <div>When were the crashes?</div>
          <HeatMap year={yearRange} side={side} />
        </BigChart>
        <BigChart>
          <div>How are the victims?</div>
          <div className={'subtitle'}>Among the people involved...</div>
          <div style={{ height: '40px' }}>
            <BarInvolved year={yearRange} side={side} />
          </div>
          <div className={'subtitle'}>Among the people injuried...</div>
          <div style={{ height: '40px' }}>
            <BarInjured year={yearRange} side={side} />
          </div>
        </BigChart>
        <BigChart>
          <div>How was the scene?</div>
          <div style={{ height: '300px' }}>
            <Sankey year={yearRange} side={side} />
          </div>
        </BigChart>
        <BigChart>
          <div>How did it crash?</div>
          <Bubble year={yearRange} side={side} />
        </BigChart>
        <BigChart>6</BigChart>
        <BigChart>
          <div>Crash by Side</div>
          <div>
          <Choropleth style={{ height: '1000px' }}/>
          </div>
        </BigChart>
      </Stack>
    </div>
  )
}
