import '../format/filter.css'
import React, { useState, useCallback } from 'react'
import { AppBar, Toolbar, Slider, Select, MenuItem, IconButton, debounce } from '@mui/material'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined'
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined'

const marks = [
  { value: 2018, label: '2018' },
  { value: 2019, label: '2019' },
  { value: 2020, label: '2020' },
  { value: 2021, label: '2021' },
  { value: 2022, label: '2022' }
]

const minYear = 2018
const maxYear = 2022

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
  const [yearRangeTemp, setYearRangeTemp] = useState([minYear, maxYear])
  const [sideTemp, setSideTemp] = useState('All')

  const playThroughYears = () => {
    let year = minYear
    setYearRangeTemp([year, year])
    props.setYearRange([year, year])
    const intervalId = setInterval(() => {
      if (year >= maxYear) {
        clearInterval(intervalId)
      } else {
        year++
        setYearRangeTemp([year, year])
        props.setYearRange([year, year])
      }
    }, 1500)
  }

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
    setYearRangeTemp([minYear, maxYear])
    props.setYearRange([minYear, maxYear])
    setSideTemp('All')
    props.setSide('All')
  }

  return (
    <AppBar elevation={0} color='transparent'>
      <Toolbar className={'filterBar'}>
        <span className={'filter'}>
          <span className={'filterName'}>Year</span>
          <IconButton sx={{ height: '3rem', width: '3rem', color: 'rgba(255, 255, 255, 0.7)', '&:hover, &:focus': { backgroundColor: 'rgba(204, 204, 204, 0.1)' } }} onClick={playThroughYears}>
            <PlayArrowOutlinedIcon />
          </IconButton>
          <Slider
            min={minYear}
            max={maxYear}
            marks={marks}
            value={yearRangeTemp}
            onChange={handleSliderChange}
            sx={{
              width: '200px',
              '& .MuiSlider-thumb': {
                height: '12px',
                width: '2px',
                borderRadius: 0,
                backgroundColor: '#CCCCCC',
                '&:focus, &:hover, &.Mui-active': {
                  boxShadow: '0 0 0 4px rgba(204, 204, 204, 0.1)'
                },
                '&.Mui-focusVisible': {
                  boxShadow: '0 0 0 4px rgba(204, 204, 204, 0.1)'
                }
              },
              '& .MuiSlider-track': { height: '2px', border: 'none', backgroundColor: '#CCCCCC' },
              '& .MuiSlider-rail': { height: '2px', backgroundColor: '#666666', padding: '0' },
              '& .MuiSlider-mark': { height: '8px', width: '1px', backgroundColor: '#666666', '&.MuiSlider-markActive': { backgroundColor: '#FFFFFF' } },
              '& .MuiSlider-markLabel': { top: '12px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.7rem' }
            }}
          />
        </span>
        <span className={'filter'}>
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
        <IconButton sx={{ height: '3rem', width: '3rem', color: 'rgba(255, 255, 255, 0.7)', '&:hover, &:focus': { backgroundColor: 'rgba(204, 204, 204, 0.1)' } }} onClick={handleReset}>
          <FilterAltOffOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
