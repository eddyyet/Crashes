import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const BigChart = styled(Box)(({ theme }) => ({
  width: '1136px',
  backgroundColor: '#28292a',
  '&:hover': { backgroundColor: '#2d2f31' },
  borderRadius: '1.5rem',
  padding: '2rem'
}))

export const MediumChart = styled(Box)(({ theme }) => ({
  width: '800px',
  backgroundColor: '#28292a',
  '&:hover': { backgroundColor: '#2d2f31' },
  borderRadius: '1.5rem',
  padding: '2rem'
}))

export const SmallChart = styled(Box)(({ theme }) => ({
  width: '400px',
  backgroundColor: '#28292a',
  '&:hover': { backgroundColor: '#2d2f31' },
  borderRadius: '1.5rem',
  padding: '2rem'
}))
