import { Flex, Text } from '@mantine/core'
import { motion } from 'motion/react'
import { IconArrowDown, IconArrowUp, IconUser } from '@tabler/icons-react'
import {
  ELEVATOR_HEIGHT,
  ELEVATOR_WIDTH,
  FLOORS_COUNT,
} from '@/app/(home)/constants'
import { ElevatorData } from '@/app/(home)/types'

const ICON_SIZE = 14

type Props = {
  item: ElevatorData
}

export default function Elevator({ item }: Props) {
  const left = (ELEVATOR_WIDTH + 10) * (item.id - 1)
  const floor = item.path[0]
  const top = (FLOORS_COUNT - floor) * ELEVATOR_HEIGHT
  const bg = item.status === 'UP' ? 'green' : 'red'
  const icon = getIcon()

  function getIcon() {
    return item.status === 'UP' ? (
      <IconArrowUp size={ICON_SIZE} />
    ) : (
      <IconArrowDown size={ICON_SIZE} />
    )
  }

  return (
    <motion.div
      style={{ position: 'absolute' }}
      initial={{ top, left }}
      animate={{ top, left }}
    >
      <Flex
        direction='column'
        bg={bg}
        c='white'
        h={ELEVATOR_HEIGHT}
        w={ELEVATOR_WIDTH}
        px={3}
        pt={2}
      >
        <Flex align='center' ml={2}>
          <Text fz='xs'>C{item.id}</Text>
          {icon}
        </Flex>
        <Flex align='center'>
          <IconUser size={ICON_SIZE} />
          <Text fz='xs'>{item.users.length}</Text>
        </Flex>
      </Flex>
    </motion.div>
  )
}
