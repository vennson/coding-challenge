import { Box, Divider, Flex, Text } from '@mantine/core'
import { ELEVATOR_HEIGHT, FLOORS_COUNT } from '../../store/constants'
import Elevators from './Elevators'
import FloorRequests from './FloorRequests'

export default function Building() {
  const floors = Array.from(Array(FLOORS_COUNT).keys())
  const reversed = floors.reverse()

  return (
    <Box w={300} mt='md' pos='relative'>
      <Divider />
      {reversed.map((floor) => (
        <Box key={floor}>
          <Flex align='center' h={ELEVATOR_HEIGHT - 1} w={30}>
            <Text fz='xs'>{floor + 1}F</Text>
            <Divider orientation='vertical' ml='auto' />
          </Flex>
          <Divider />
        </Box>
      ))}
      <Elevators />
      <FloorRequests />
    </Box>
  )
}
