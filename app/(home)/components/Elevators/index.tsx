import { Box } from '@mantine/core'
import { ELEVATORS_COUNT } from '../../constants'
import Elevator from './Elevator'

export default function Elevators() {
  const elevators = Array.from(Array(ELEVATORS_COUNT).keys())

  return (
    <Box pos='absolute' top={0}>
      {elevators.map((elevator) => (
        <Elevator key={elevator} index={elevator} />
      ))}
    </Box>
  )
}
