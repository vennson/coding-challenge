import { Center } from '@mantine/core'
import { ELEVATOR_HEIGHT, ELEVATOR_WIDTH } from '../../constants'

type Props = {
  index: number
}

export default function Elevator({ index }: Props) {
  return (
    <Center
      bg='gray'
      h={ELEVATOR_HEIGHT}
      w={ELEVATOR_WIDTH}
      pos='absolute'
      top={0}
      left={55 * (index + 1)}
    >
      E{index + 1}
    </Center>
  )
}
