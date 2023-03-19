import '../format.css'
import React from 'react'
import { AppBar, Slider, Select, MenuItem, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  mark: {
    fontSize: '0.5rem'
  }
})

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
  const classes = useStyles()

  const handleSliderChange = (event, newYearRange) => {
    props.setYearRange(newYearRange)
  }

  const handleSelectChange = (event) => {
    props.setSide(event.target.value)
  }

  const handleReset = () => {
    props.setYearRange([2018, 2022])
    props.setSide('All')
  }

  return (
    <AppBar className={'filterBar'}>
      <span>
        <span className={'filterName'}>Year</span>
        <Slider
          min={2018}
          max={2022}
          marks={marks}
          value={props.yearRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          color="secondary"
          classes={{ mark: classes.mark }}
        />
      </span>
      <span>
        <span className={'filterName'}>Region</span>
        <Select
            value={props.side}
            onChange={handleSelectChange}
            inputProps={{ 'aria-label': 'Select side' }}
        >
          {sides.map((side) => (
            <MenuItem key={side}>
              {side}
            </MenuItem>
          ))}
        </Select>
      </span>
      <Button variant="contained" color="secondary" onClick={handleReset}>
        Reset
      </Button>
    </AppBar>
  )
}
