import './format.css'
import React, { useState } from 'react'
import FilterControl from './utils/FilterControl'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import { Chart } from './Chart'
import TreeMap from './charts/TreeMap'
import Network from './charts/Network'
import Network2 from './charts/Network2'
import HeatMap from './charts/HeatMap'
import { BarInvolved, BarInjured } from './charts/Bar'
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
      <Stack spacing='1.5rem' width='1200px'>
        <Chart className={'fullChart'} height='500px'>
        <div className={'story'}>
          <div>
            <div className={'storyTitle'}>Traffic Crashes<br />In Chicago</div>
            <div className={'storyContent'}>In 2021, there were 1,000 traffic crashes in Chicago. 100 people were killed and 1,000 were injured. The crashes were caused by...</div>
          </div>
          <div>
            <span>XXX</span>
            <div>Map area</div>
          </div>
        </div>
        </Chart>
        <div className={'multiChart'}>
          <Chart className={'wideChart'}>
            <div className={'chartTitle'}>Why were the crashes?</div>
            <TreeMap year={yearRange} side={side} />
          </Chart>
          <Stack direction='column' spacing='1.5rem'>
            <Chart className={'narrowChart'}>
              <div className={'chartTitle'}>Were the speed limits useful?</div>
            </Chart>
            <Chart className={'narrowChart'}>
              <div className={'chartTitle'}>How are the victims?</div>
              <div className={'subtitle'}>Among the people involved...</div>
              <div style={{ height: '40px' }}>
                <BarInvolved year={yearRange} side={side} />
              </div>
              <div className={'subtitle'}>Among the people injuried...</div>
              <div style={{ height: '40px' }}>
                <BarInjured year={yearRange} side={side} />
              </div>
            </Chart>
          </Stack>
        </div>
        <Chart className={'fullChart'}>
          <div className={'chartTitle'}>What are making the crashes deadly?</div>
          <Stack direction='row' divider={<Divider orientation="vertical" sx={{ borderWidth: '0.5px', borderColor: '#383a3e' }} flexItem />} spacing='1.5rem'>
            <div width='736px'>
              <div>One factor xxx xxxx xxx xxxx xxx xxxx xxx xxxx xxx xxxx</div>
              <Network year={yearRange} side={side} />
            </div>
            <div width='350px'>
              <div>Two factor xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx</div>
            <Network2 year={yearRange} side={side} />
            </div>
          </Stack>
        </Chart>
        <div className={'multiChart'}>
          <Chart className={'wideChart'}>
            <div className={'chartTitle'}>How did it crash?</div>
            <Bubble year={yearRange} side={side} />
          </Chart>
          <Chart className={'narrowChart'}>6</Chart>
        </div>
        <Chart className={'fullChart'} height='500px'>
          <div className={'chartTitle'}>When were the crashes?</div>
          <HeatMap year={yearRange} side={side} />
        </Chart>
        <Chart>
          <div className={'chartTitle'}>Crash by Side</div>
          <div>
          <Choropleth style={{ height: '1000px' }} year={yearRange} side={side} />
          </div>
        </Chart>
      </Stack>
    </div>
  )
}
