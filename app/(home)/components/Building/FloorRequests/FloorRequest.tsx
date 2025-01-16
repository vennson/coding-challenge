import { ELEVATOR_HEIGHT } from '@/app/(home)/constants'
import { FloorData } from '@/app/(home)/types'
import { GREEN, RED } from '@/app/(layout)/constants'
import { Flex } from '@mantine/core'
import {
  IconTriangleFilled,
  IconTriangleInvertedFilled,
} from '@tabler/icons-react'

const ICON_SIZE = 12

type Props = {
  item: FloorData
}

export default function FloorRequest({ item }: Props) {
  const hasUp = item.requests.some((item) => item.type === 'UP')
  const hasDown = item.requests.some((item) => item.type === 'DOWN')

  return (
    <Flex direction='column' justify='center' h={ELEVATOR_HEIGHT}>
      {hasUp && <IconTriangleFilled size={ICON_SIZE} color={GREEN} />}
      {hasDown && <IconTriangleInvertedFilled size={ICON_SIZE} color={RED} />}
    </Flex>
  )
}
