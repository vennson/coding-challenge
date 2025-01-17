import { Flex, Text } from '@mantine/core'
import { motion } from 'motion/react'
import { IconArrowDown, IconArrowUp, IconClock } from '@tabler/icons-react'
import {
  ELEVATOR_HEIGHT,
  ELEVATOR_WIDTH,
  FLOOR_TRAVEL_SECONDS,
} from '@/app/(home)/store/constants'
import { ElevatorData } from '@/app/(home)/store/types'
import UserStatus from './UserStatus'
import useElevatorSimulation from '@/app/(home)/hooks/useElevatorSimulation'

const ICON_SIZE = 14

type Props = {
  item: ElevatorData
}

export default function Elevator({ item }: Props) {
  const left = (ELEVATOR_WIDTH + 17) * (item.id - 1)
  const bg = getBg()
  const icon = getIcon()
  const { top } = useElevatorSimulation({ item })

  function getIcon() {
    switch (item.status) {
      case 'IDLE':
        return null
      case 'UP':
        return <IconArrowUp size={ICON_SIZE} />
      case 'DOWN':
        return <IconArrowDown size={ICON_SIZE} />
      case 'WAIT':
        return <IconClock size={ICON_SIZE} />
      default:
        break
    }
  }

  function getBg() {
    switch (item.status) {
      case 'IDLE':
        return 'gray'
      case 'UP':
        return 'green'
      case 'DOWN':
        return 'red'
      case 'WAIT':
        return 'orange'
      default:
        break
    }
  }

  if (item.id === 1) {
  }

  return (
    <motion.div
      style={{ position: 'absolute', left }}
      initial={{ top }}
      animate={{ top }}
      transition={{ duration: FLOOR_TRAVEL_SECONDS, ease: 'linear' }}
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
        {<UserStatus count={item.users.length} />}
      </Flex>
    </motion.div>
  )
}
