import './format/general.css'
import './format/specific.css'
import React, { useState } from 'react'
import FilterControl from './utils/FilterControl'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import { Chart } from './Chart'
import TreeMap from './charts/TreeMap'
import Line from './charts/Line'
import Bar from './charts/Bar'
import Waffle from './charts/Waffle'
import Network from './charts/Network'
import Network2 from './charts/Network2'
import Bubble from './charts/Bubble'
import ScatterPlot from './charts/ScatterPlot'
import Choropleth from './charts/Choropleth'
import Legend from './charts/Legend'
import Legend2 from './charts/Legend2'

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
        <div className={'heading'}>
          <div className={'story'}>
            <div className={'storyTitle'}>Traffic Crashes<br />In Chicago</div>
            <div className={'storyContent'}>In 2021, there were 1,000 traffic crashes in Chicago. 100 people were killed and 1,000 were injured. The crashes were caused by... (just some random text, let&apos;s edit later)</div>
          </div>
          <div className={'mapBase'}>
            <div className={'mapArea'}>
              <div><Choropleth year={yearRange} side={side} /></div>
            </div>
            <div className={'mapLegend'}>
              <div><Legend /></div>
              <div><Legend2 /></div>
            </div>
          </div>
        </div>
        <div className={'multiChart'}>
          <Chart className={'wideChart'}>
            <div className={'chartTitle'}>Why were the crashes?</div>
            <div className={'chartDescription'}>Cause description text...Cause description text...</div>
            <TreeMap year={yearRange} side={side} />
          </Chart>
          <Stack direction='column' spacing='1.5rem'>
            <Chart className={'narrowChart'}>
              <div className={'chartTitle'}>Were the speed limits useful?</div>
              <div className={'chartDescription'}>Speed description text...Speed description text...</div>
              <Line year={yearRange} side={side} />
            </Chart>
            <Chart className={'narrowChart'}>
              <div className={'chartTitle'}>How are the victims?</div>
              <div className={'chartDescription'}>Victim description text...Victim description text...</div>
              <Bar year={yearRange} side={side} />
              <div className={'subtitle'}>Among the people injuried...</div>
              <div style={{ height: '86px' }}><Waffle year={yearRange} side={side} /></div>
            </Chart>
          </Stack>
        </div>
        <Chart className={'fullChart'}>
          <div className={'chartTitle'}>What are making the crashes deadly?</div>
          <Stack direction='row' divider={<Divider orientation="vertical" sx={{ borderWidth: '0.5px', borderColor: '#383a3e' }} flexItem />} spacing='1.5rem'>
            <div width='736px'>
              <div className={'chartDescription'}>The environment condition during a crash does affect the chances of injury...</div>
              <Network year={yearRange} side={side} />
            </div>
            <div width='350px'>
              <div className={'chartDescription'}>When two environement factors occur together, the chances of injury in a crash will be..</div>
            <Network2 year={yearRange} side={side} />
            </div>
          </Stack>
        </Chart>
        <div className={'multiChart'}>
          <Chart className={'wideChart'}>
            <div className={'chartTitle'}>How did it crash?</div>
            <Bubble year={yearRange} side={side} />
          </Chart>
          <Chart className={'narrowChart'}>
            <div className={'chartTitle'}>When were the crashes?</div>
            <ScatterPlot year={yearRange} side={side} />
          </Chart>
        </div>
        <div className={'footer'}>
          <div>Data from <a href='https://data.cityofchicago.org/Transportation/Traffic-Crashes-Crashes/85ca-t3if'>Chicago Data Portal</a></div>
          <div><span>Map engine from </span>
          <a href='https://leafletjs.com'>Leaflet</a><span> and </span>
          <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors
          </div>
          <div>
            Images from Vecteezy (
            <a href='https://www.vecteezy.com/vector-art/7798695-graphics-drawing-businessman-standing-and-using-smartphone-for-connection-online-technology-vector-illustration'>man</a><span>, </span>
            <a href='https://www.vecteezy.com/vector-art/113748-free-illustration-of-hybrid-car'>cars (3D)</a><span>, </span>
            <a href='https://www.vecteezy.com/vector-art/13037262-collection-of-various-isolated-cars-icons-car-top-view-illustration-vector'>cars (top view)</a><span> and </span>
            <a href='https://www.vecteezy.com/members/104122094326139728765'>trees</a>) and clipartix.com (
            <a href='https://clipartix.com/motorcycle-clipart-image-8614/'>motorcycle</a>)
          </div>
          <div>Illustration for HKUST MSBD5005 Data Visualization (Group 11, Spring 2022/23)</div>
          <div>All rights reserved</div>
        </div>
      </Stack>
    </div>
  )
}
