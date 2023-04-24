import './format/general.css'
import './format/specific.css'
import './format/Legend.css'
import './format/TreeMapLegend.css'
import './format/NetworkLegend.css'
import React, { useState } from 'react'
import FilterControl from './utils/FilterControl'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import TreeMap from './charts/TreeMap'
import Line from './charts/Line'
import Bar from './charts/Bar'
import Waffle from './charts/Waffle'
import Network from './charts/Network'
import Network2 from './charts/Network2'
import Bubble from './charts/Bubble'
import ScatterPlot from './charts/ScatterPlot'
import Choropleth from './charts/Choropleth'
import ChoroplethLegend from './charts/ChoroplethLegend'
import ChoroplethLegend2 from './charts/ChoroplethLegend2'
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined'

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
            <div className={'storyContent'}>Chicago traffic crashes remain a pressing concern for public safety, with fatalities and injuries continuing to occur every day. Learn more...</div>
          </div>
          <div className={'mapBase'}>
            <div className={'mapArea'}>
              <div><Choropleth year={yearRange} side={side} /></div>
            </div>
            <div className={'mapLegend'}>
              <div><ChoroplethLegend /></div>
              <div><ChoroplethLegend2 /></div>
            </div>
          </div>
        </div>
        <div className={'multiChart'}>
          <TreeMap year={yearRange} side={side} />
          <Stack direction='column' spacing='1.5rem'>
            <div className={'chart narrowChart'}>
              <div className={'chartTitle'}>Speed limits</div>
              <div className={'chartDescription'}>Did the speed limit affect the chance of injuries in a crash?</div>
              <Line year={yearRange} side={side} />
            </div>
            <div className={'chart narrowChart'}>
              <div className={'chartTitle'}>Victims</div>
              <div className={'chartDescription'}>How many people were injured?</div>
              <Bar year={yearRange} side={side} />
              <div className={'subtitle'}>Among the people injured...</div>
              <div style={{ height: '86px' }}><Waffle year={yearRange} side={side} /></div>
            </div>
          </Stack>
        </div>
        <div className={'chart fullChart'}>
          <div className={'chartTitle'}>
            <span>Environmental conditions</span>
            <span id='NetworkLegendTrigger' className={'legendSymbolOutline'}><StraightenOutlinedIcon className={'legendSymbol'} /></span>
            <div id='NetworkLegend' className={'floatingLegend'}>
              <Stack direction='row' divider={<Divider orientation="vertical" sx={{ borderWidth: '0.5px', borderColor: '#383a3e' }} flexItem />} spacing='1.5rem'>
                <div id='NetworkOneFactor'>
                  <div className={'legendTitle'}>One-factor lift</div>
                  <div className={'NetworkFormula'}>
                    <span>Lift</span>
                    <span className={'NetworkFormulaElement'}>=</span>
                    <Stack className={'NetworkFraction'} direction='column' divider={<Divider orientation="horizontal" sx={{ borderWidth: '0.5px', borderColor: '#d3d3d3' }} flexItem />} spacing='2px'>
                      <span className={'NetworkFormulaElement'}>P( Injury level in a crash | Condition )</span>
                      <span className={'NetworkFormulaElement'}>P( Injury level in a crash )</span>
                    </Stack>
                  </div>
                  <div>
                    <div>Severy injury: Fatal or incapacitating</div>
                    <div>Moderate injury: Moderate or injured but not apparent</div>
                  </div>
                  <div className={'legendSeparator'}></div>
                  <div className={'NetworkLines'}>
                    <div>
                      <div className={'NetworkLine'}>
                        <span className={'NetworkLineSample'} style={{ height: '38px', backgroundColor: 'rgba(204, 204, 204, 0.8)' }}></span>
                        <span>1.3x or above</span>
                      </div>
                      <div className={'NetworkLine'}>
                        <span className={'NetworkLineSample'} style={{ height: '30px', backgroundColor: 'rgba(204, 204, 204, 0.65)' }}></span>
                        <span>1.2x</span>
                      </div>
                      <div className={'NetworkLine'}>
                        <span className={'NetworkLineSample'} style={{ height: '22px', backgroundColor: 'rgba(204, 204, 204, 0.5)' }}></span>
                        <span>1.1x</span>
                      </div>
                      <div className={'NetworkLine'}>
                        <span className={'NetworkLineSample'} style={{ height: '14px', backgroundColor: 'rgba(204, 204, 204, 0.35)' }}></span>
                        <span>1.0x</span>
                      </div>
                      <div className={'NetworkLine'}>
                        <span className={'NetworkLineSample'} style={{ height: '6px', backgroundColor: 'rgba(204, 204, 204, 0.2)' }}></span>
                        <span>0.9x or below</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div id='NetworkTwoFactor'>
                  <div className={'legendTitle'}>Two-factor lift</div>
                  <div className={'NetworkFormula'}>
                    <span>Lift</span>
                    <span className={'NetworkFormulaElement'}>=</span>
                    <Stack className={'NetworkFraction'} direction='column' divider={<Divider orientation="horizontal" sx={{ borderWidth: '0.5px', borderColor: '#d3d3d3' }} flexItem />} spacing='2px'>
                      <span className={'NetworkFormulaElement'}>P( Crash is injurious | Condition 1 ∩ Condition 2 )</span>
                      <span className={'NetworkFormulaElement'}>P( Crash is injurious )</span>
                    </Stack>
                  </div>
                  <div>The injuries can be fatal, incapacitating, moderate or injured but not apparent</div>
                  <div className={'legendSeparator'}></div>
                  <div className={'NetworkLines'}>
                    <div>
                      <div className={'NetworkLine'}>
                        <span className={'NetworkLineSample'} style={{ height: '20px', backgroundColor: 'hsla(10, 90%, 50%, 0.84)' }}></span>
                        <span>1.6x or above</span>
                      </div>
                      <div className={'NetworkLine'}>
                        <span className={'NetworkLineSample'} style={{ height: '16px', backgroundColor: 'hsla(10, 60%, 50%, 0.80)' }}></span>
                        <span>1.4x</span>
                      </div>
                      <div className={'NetworkLine'}>
                        <span className={'NetworkLineSample'} style={{ height: '12px', backgroundColor: 'hsla(10, 30%, 50%, 0.76)' }}></span>
                        <span>1.2x</span>
                      </div>
                      <div className={'NetworkLine'}>
                        <span className={'NetworkLineSample'} style={{ height: '8px', backgroundColor: 'hsla(10, 0%, 50%, 0.72)' }}></span>
                        <span>1.0x</span>
                      </div>
                      <div className={'NetworkLine'}>
                        <span className={'NetworkLineSample'} style={{ height: '4px', backgroundColor: 'hsla(140, 30%, 50%, 0.76)' }}></span>
                        <span>0.8x or below</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Stack>
            </div>
          </div>
          <Stack direction='row' divider={<Divider orientation="vertical" sx={{ borderWidth: '0.5px', borderColor: '#383a3e' }} flexItem />} spacing='1.5rem'>
            <div width='736px'>
              <div className={'chartDescription'}>How does the environment affect the likelihood of injury in a crash?</div>
              <Network year={yearRange} side={side} />
            </div>
            <div width='350px'>
              <div className={'chartDescription'}>When two environement factors occur together, the chances of injury will be...</div>
            <Network2 year={yearRange} side={side} />
            </div>
          </Stack>
        </div>
        <div className={'multiChart'}>
          <div className={'chart wideChart'}>
            <div className={'chartTitle'}>Crash forms</div>
            <div className={'chartDescription'}>Some forms of crashes were more common than the others...</div>
            <Bubble year={yearRange} side={side} />
          </div>
          <ScatterPlot year={yearRange} side={side} />
        </div>
        <div className={'footer'}>
          <div>Data from <a href='https://data.cityofchicago.org/Transportation/Traffic-Crashes-Crashes/85ca-t3if' target='_blank' rel='noreferrer'>Chicago Data Portal</a></div>
          <div><span>Map engine from </span>
          <a href='https://leafletjs.com' target='_blank' rel='noreferrer'>Leaflet</a><span> and </span>
          <a href='https://www.openstreetmap.org/copyright' target='_blank' rel='noreferrer'>OpenStreetMap</a> contributors
          </div>
          <div>
            Images from Vecteezy (
            <a href='https://www.vecteezy.com/vector-art/7798695-graphics-drawing-businessman-standing-and-using-smartphone-for-connection-online-technology-vector-illustration' target='_blank' rel='noreferrer'>man</a><span>, </span>
            <a href='https://www.vecteezy.com/vector-art/113748-free-illustration-of-hybrid-car' target='_blank' rel='noreferrer'>cars (3D)</a><span>, </span>
            <a href='https://www.vecteezy.com/vector-art/13037262-collection-of-various-isolated-cars-icons-car-top-view-illustration-vector' target='_blank' rel='noreferrer'>cars (top view)</a><span> and </span>
            <a href='https://www.vecteezy.com/members/104122094326139728765' target='_blank' rel='noreferrer'>trees</a>) and clipartix.com (
            <a href='https://clipartix.com/motorcycle-clipart-image-8614/' target='_blank' rel='noreferrer'>motorcycle</a>)
          </div>
          <div>Illustration for HKUST MSBD5005 Data Visualization (Group 11, Spring 2022/23)</div>
          <div>All rights reserved</div>
        </div>
      </Stack>
    </div>
  )
}
