import { useColorScheme } from '@mui/material';
import Button from '@mui/material/Button'

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

function App() {

  return (
    <>
      <ModeToggle />
      <Button variant='contained'>Click</Button>
      <Button variant='outlined'>Click</Button>
      <Button variant='text'>Click</Button>
    </>
  )
}

export default App
