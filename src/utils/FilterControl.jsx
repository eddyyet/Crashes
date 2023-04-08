import '../format.css'
import React, { useState, useCallback } from 'react'
import { AppBar, Toolbar, Slider, Select, MenuItem, Button, debounce } from '@mui/material'

const marks = [
  { value: 2018, label: '2018' },
  { value: 2019, label: '2019' },
  { value: 2020, label: '2020' },
  { value: 2021, label: '2021' },
  { value: 2022, label: '2022' }
]

const sides = [
  'All',
  'Far North Side',
  'North Side',
  'Northwest Side',
  'West Side',
  'Central',
  'South Side',
  'Southwest Side',
  'Far Southwest Side',
  'Far Southeast Side'
]

export default function FilterControl (props) {
  const [yearRangeTemp, setYearRangeTemp] = useState([2018, 2022])
  const [sideTemp, setSideTemp] = useState('All')

  const handleSliderChange = (event, newYearRange) => {
    setYearRangeTemp(newYearRange)
    debouncedSetYearRange(newYearRange)
  }

  const debouncedSetYearRange = useCallback(
    debounce(props.setYearRange, 300),
    [props.setYearRange]
  )

  const handleSelectChange = (event) => {
    setSideTemp(event.target.value)
    debouncedSetSide(event.target.value)
  }

  const debouncedSetSide = useCallback(
    debounce(props.setSide, 300),
    [props.setSide]
  )

  const handleReset = () => {
    props.setYearRange([2018, 2022])
    props.setSide('All')
  }

  return (
    <AppBar elevation={0} color='transparent'>
      <Toolbar className={'filterBar'}>
        <span className={'filter'} style={{ width: '300px' }}>
          <span className={'filterName'}>Year</span>
          <Slider
            min={2018}
            max={2022}
            marks={marks}
            value={yearRangeTemp}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            sx={
              {
                '.MuiSlider-root': { padding: '0px!important', margin: '0rem' },
                '.MuiSlider-marked': { padding: '0px!important', margin: '0rem' },
                '.MuiSlider-sizeMedium': { padding: '0px!important', margin: '0rem' },
                '& .MuiSlider-root': { padding: '0rem!important', margin: '0rem' },
                '& .MuiSlider-marked': { padding: '0rem!important', margin: '0rem' },
                '& .MuiSlider-sizeMedium': { padding: '0rem!important', margin: '0rem' },
                '& .MuiSlider-thumb': { height: '0.75rem', width: '0.75rem', backgroundColor: '#CCCCCC' },
                '& .MuiSlider-rail': { height: '0.25rem', backgroundColor: '#CCCCCC' },
                '& .MuiSlider-markLabel': { color: '#CCCCCC', fontSize: '0.75rem' }
              }
            }
          />
        </span>
        <span style={{ width: '200px' }}>
          <span className={'filterName'}>Region</span>
          <Select
              value={sideTemp}
              onChange={handleSelectChange}
              inputProps={{ 'aria-label': 'Select side' }}
          >
            {sides.map((side) => (
              <MenuItem key={side} value={side}>
                {side}
              </MenuItem>
            ))}
          </Select>
        </span>
        <Button onClick={handleReset}>
          Reset
        </Button>
      </Toolbar>
    </AppBar>
  )
}
