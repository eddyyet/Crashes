import './App.css';
import Stack from '@mui/material/Stack';
import { Chart } from './chart';

function App() {
  return (
    <div className="App">
      <Stack spacing={1.5} sx={{ width:'800px'}}>
        <Chart>1</Chart>
        <Chart>2</Chart>
        <Chart>3</Chart>
      </Stack>
    </div>
  );
}

export default App;
