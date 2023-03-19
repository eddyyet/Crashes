import '../format.css'
import React from 'react'
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
  const handleSliderChange = debounce((event, newYearRange) => {
    props.setYearRange(newYearRange)
  }, 10)

  const handleSelectChange = debounce((event) => {
    props.setSide(event.target.value)
  }, 10)

  const handleReset = () => {
    props.setYearRange([2018, 2022])
    props.setSide('All')
  }

  return (
    <AppBar elevation={0} color='transparent'>
      <Toolbar className={'filterBar'}>
        <span style={{ width: '300px' }}>
          <span className={'filterName'}>Year</span>
          <Slider
            min={2018}
            max={2022}
            marks={marks}
            value={props.yearRange}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            sx={{ '& .MuiSlider-markLabel': { color: '#CCCCCC', fontSize: '0.7rem' } }}
          />
        </span>
        <span style={{ width: '200px' }}>
          <span className={'filterName'}>Region</span>
          <Select
              value={props.side}
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
