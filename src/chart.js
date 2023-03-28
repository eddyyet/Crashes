import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const BigChart = styled(Box)(({ theme }) => ({
  // [theme.breakpoints.up('sm')]: { width: '552px' },
  backgroundColor: '#28292a',
  '&:hover': { backgroundColor: '#2d2f31' },
  borderRadius: '1.5rem',
  padding: '2rem'
}))
