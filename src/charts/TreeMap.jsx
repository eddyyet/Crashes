import '../format/Legend.css'
import '../format/TreeMapLegend.css'
import React from 'react'
import { ResponsiveTreeMapHtml } from '@nivo/treemap'
import filter from '../utils/filter'
import TreeMapData from '../utils/TreeMapData'
import causeData from '../data/crash_cause.json'
import MinorCrashOutlinedIcon from '@mui/icons-material/MinorCrashOutlined'
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined'
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined'

export default function TreeMap (props) {
  const filteredData = filter(causeData, props.year, props.side)
  const treeMapData = TreeMapData(filteredData)
  const treeMapTotal = treeMapData.total

  const customLabel = (node) => {
    const labelWidth = node.width
    const labelHeight = node.height
    const causeLength = node.id.length
    let scale, boxWidth

    if (node.value > 0.05 * treeMapTotal && causeLength * 100 < labelWidth * (labelHeight - 48)) {
      scale = 'scale(1)'
      boxWidth = labelWidth - 12
    } else if (node.value > 0.03 * treeMapTotal && causeLength * 100 < labelWidth * (labelHeight - 36)) {
      scale = 'scale(0.7)'
      boxWidth = labelWidth * 1.43 - 12
    } else if (node.value > 0.01 * treeMapTotal && causeLength * 25 < labelWidth * (labelHeight - 24)) {
      scale = 'scale(0.5)'
      boxWidth = labelWidth * 2
    } else if (node.value > 0.005 * treeMapTotal && causeLength * 6 < labelWidth * (labelHeight - 12)) {
      scale = 'scale(0.25)'
      boxWidth = labelWidth * 4
    } else {
      scale = 'scale(0.1)'
      boxWidth = labelWidth * 10
    }

    return (
      <div className={'treeMapContent'} style={{ transform: scale, WebkitTransform: scale, color: node.data.nodeTextColor }}>
        <div className={'treeMapCause'} style={{ width: boxWidth, whiteSpace: 'normal' }}>{node.id}</div>
        <div className={'treeMapCrashes'}><MinorCrashOutlinedIcon className={'treeMapIcon'} /> {node.value.toLocaleString('en-US')}</div>
        <div className={'treeMapInjuryRate'} ><MedicalServicesOutlinedIcon className={'treeMapIcon'} /> {node.data.injuryRate}</div>
      </div>
    )
  }

  const customTooltip = (node) => {
    return (
      <div className={'tooltip'}>
        <div className={'tooltipLargeText'} style={{ color: node.node.data.tooltipTitleColor }}><strong>{node.node.id}</strong></div>
        <div>
          <div>Crashes: {node.node.value.toLocaleString('en-US')}</div>
          <div>Injury rate: {node.node.data.injuryRate}</div>
        </div>
      </div>
    )
  }

  const TreeMapSmallCount = (treeMapTotal * (40 * 40) / (718 * 580)).toFixed(0)
  const TreeMapMidCount = (treeMapTotal * (100 * 100) / (718 * 580)).toFixed(0)
  const TreeMapLargeCount = (treeMapTotal * (160 * 160) / (718 * 580)).toFixed(0)

  return (
    <div className={'chart wideChart'}>
      <div className={'chartTitle'}>
        <span>Causes</span>
        <span id='TreeMapLegendTrigger' className={'legendSymbolOutline'}><StraightenOutlinedIcon className={'legendSymbol'} /></span>
        <div id='TreeMapLegend' className={'floatingLegend'}>
          <div className={'legendTitle'}>Number of crashes</div>
          <div className={'TreeMapSquares'}>
            <div className={'TreeMapSquare TreeMapSquareLarge'}>
              <div className={'TreeMapSquare TreeMapSquareMid'}>
                <div className={'TreeMapSquare TreeMapSquareSmall'}>
                  <span className={'TreeMapSquareFigure'}>{TreeMapSmallCount.toLocaleString('en-US')}</span>
                </div>
                <span className={'TreeMapSquareFigure'}>{TreeMapMidCount.toLocaleString('en-US')}</span>
              </div>
              <span className={'TreeMapSquareFigure'}>{TreeMapLargeCount.toLocaleString('en-US')}</span>
            </div>
          </div>
          <div className={'legendTitle'} style={{ marginBottom: '0.25rem' }}>Injury rate</div>
          <div className={'legendTextLine'}>The proportion of crashes that caused injuries</div>
          <div className={'TreeMapGradients'}>
            <div className={'TreeMapGradients'}>
              <div className={'TreeMapGradient TreeMapGradientRed'}></div>
              <div className={'TreeMapGradient TreeMapGradientYellow'}></div>
              <div className={'TreeMapGradient TreeMapGradientOrange'}></div>
              <div className={'TreeMapGradient TreeMapGradientBrown'}></div>
              <div className={'TreeMapGradient TreeMapGradientGray'}></div>
              <span className={'TreeMapGradientLine'} style={{ left: '0%' }}></span>
              <span className={'TreeMapGradientLine'} style={{ left: '25%' }}></span>
              <span className={'TreeMapGradientLine'} style={{ left: '50%' }}></span>
              <span className={'TreeMapGradientLine'} style={{ left: '75%' }}></span>
              <span className={'TreeMapGradientLine'} style={{ left: '100%' }}></span>
            </div>
            <div className={'TreeMapGradientFigures'}>
              <span className={'TreeMapGradientFigure'}>32%+</span>
              <span className={'TreeMapGradientFigure'}>24％</span>
              <span className={'TreeMapGradientFigure'}>16％</span>
              <span className={'TreeMapGradientFigure'}>8％</span>
              <span className={'TreeMapGradientFigure'}>0％</span>
            </div>
          </div>
        </div>
      </div>
      <div className={'chartDescription'}>What caused the crashes? How likely were they to cause injuries?</div>
      <div className={'treeMapParent'}>
        <div className={'treeMap'}>
          <ResponsiveTreeMapHtml
            height={600}
            data={treeMapData}
            identity='cause'
            value='count'
            orientLabel={false}
            nodeOpacity={1}
            colors={{ datum: 'data.nodeColor' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['opacity', 0.7], ['brighter', 0.25]] }}
            label={customLabel}
            parentLabelTextColor={{ from: 'color', modifiers: [['opacity', 1], ['brighter', 1]] }}
            tooltip={customTooltip}
            theme={{ fontFamily: '"Google Sans", "Roboto", "Helvetica Neue", sans-serif' }}
          />
        </div>
      </div>
    </div>
  )
}
