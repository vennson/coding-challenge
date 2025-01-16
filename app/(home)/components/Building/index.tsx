import { Box, Divider, Text } from '@mantine/core'
import { FLOORS_COUNT } from '../../constants'

export default function Building() {
  const floors = Array.from(Array(FLOORS_COUNT).keys())
  const reversed = floors.reverse()

  return (
    <Box w={300} mt='md'>
      <Divider />
      {reversed.map((floor) => (
        <Box key={floor}>
          <Text fz='xs' py={10}>
            Floor {floor + 1}
          </Text>
          <Divider />
        </Box>
      ))}
    </Box>
  )
}
