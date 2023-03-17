import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const Chart = styled(Box)(({ theme }) => ({
  // [theme.breakpoints.up('sm')]: { width: '552px' },
  backgroundColor: '#28292a',
  '&:hover': { backgroundColor: '#2d2f31' },
  borderRadius: '1rem',
  padding: '1.5rem',
  textAlign: 'left',
  fontSize: '1.5rem',
  fontWeight: 'bold'
}))
