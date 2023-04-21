import '../format/Legend.css'
import React from 'react'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import filter from '../utils/filter'
import ScatterPlotData from '../utils/ScatterPlotData'
import dayTimeData from '../data/crash_day_time.json'
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined'

export default function ScatterPlot (props) {
  const filteredData = filter(dayTimeData, props.year, props.side)
  const scatterPlotData = ScatterPlotData(filteredData)
  const colors = scatterPlotData.nivoInputData.map(d => d.data[0].color).flat()

  const customTooltip = (node) => {
    return (
      <div className='tooltip'>
        <div><strong className={'tooltipLargeText'}>{node.node.data.crashes.toLocaleString('en-US')}</strong> crashes on <strong>{node.node.data.toolTipDay}</strong> at around <strong>{node.node.data.toolTipTime}</strong>.</div>
        <div><strong className={'tooltipLargeText'} style={{ color: node.node.data.toolTipColor }}>{node.node.data.injuryRate}</strong> of the crashes caused injuries.</div>
      </div>
    )
  }

  return (
    <div className={'chart narrowChart'}>
      <div className={'chartTitle'}>
        <span>Time</span>
        <span id='ScatterPlotLegendTrigger' className={'legendSymbolOutline'}><StraightenOutlinedIcon className={'legendSymbol'} /></span>
        <div id='ScatterPlotLegend' className={'floatingLegend'}>
          <div className={'legendTitle'}>Number of crashes</div>
          <div className={'ScatterPlotLegendRow'}>
            <div className={'ScatterPlotLegendElement'}>
              <span className={'ScatterPlotLegendCircle SmallCount'}></span>
              <span className={'ScatterPlotLegendFigure'}>{scatterPlotData.ScatterPlotSmallCount}</span>
            </div>
            <div className={'ScatterPlotLegendElement'}>
              <span className={'ScatterPlotLegendCircle MidCount'}></span>
              <span className={'ScatterPlotLegendFigure'}>{scatterPlotData.ScatterPlotMidCount}</span>
            </div>
            <div className={'ScatterPlotLegendElement'}>
              <span className={'ScatterPlotLegendCircle LargeCount'}></span>
              <span className={'ScatterPlotLegendFigure'}>{scatterPlotData.ScatterPlotLargeCount}</span>
            </div>
          </div>
          <div className={'legendSeparator'}></div>
          <div className={'legendTitle'} style={{ marginBottom: '0.25rem' }}>Injury rate</div>
          <div className={'legendTextLine'}>The proportion of crashes that caused injuries</div>
          <div className={'ScatterPlotLegendRow'}>
            <div className={'ScatterPlotLegendElement'}>
              <span className={'ScatterPlotLegendCircle HighInjury'}></span>
              <span className={'ScatterPlotLegendFigure'}>14%+</span>
            </div>
            <div className={'ScatterPlotLegendElement'}>
              <span className={'ScatterPlotLegendCircle MidInjury'}></span>
              <span className={'ScatterPlotLegendFigure'}>11%</span>
            </div>
            <div className={'ScatterPlotLegendElement'}>
              <span className={'ScatterPlotLegendCircle LowInjury'}></span>
              <span className={'ScatterPlotLegendFigure'}>8%-</span>
            </div>
          </div>
        </div>
      </div>
      <div className={'chartDescription'}>How common and how injurious were the crashes in different time?</div>
      <ResponsiveScatterPlot
        height={470}
        width={350}
        margin={{ top: 50, right: 55, bottom: 20, left: 59 }}
        data={scatterPlotData.nivoInputData}
        nodeSize={{ key: 'data.radius', values: [0, 1], sizes: [0, 40] }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'point' }}
        axisTop={{
          tickSize: 0,
          tickPadding: 23,
          tickRotation: 0,
          legend: 'Day of week',
          legendPosition: 'middle',
          legendOffset: -44
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 30,
          tickRotation: 0,
          legend: 'Time (hour)',
          legendPosition: 'middle',
          legendOffset: -54
        }}
        axisBottom={null}
        enableGridX={false}
        enableGridY={false}
        theme={{
          fontFamily: '"Google Sans", "Roboto", "Helvetica Neue", sans-serif',
          textColor: '#999999'
        }}
        colors={colors}
        tooltip={customTooltip}
      />
    </div>
  )
}
