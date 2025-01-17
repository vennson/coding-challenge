import { ELEVATOR_HEIGHT } from '@/app/(home)/constants'
import { FloorData } from '@/app/(home)/types'
import { GREEN, RED } from '@/app/(layout)/constants'
import { Divider, Flex } from '@mantine/core'
import {
  IconTriangleFilled,
  IconTriangleInvertedFilled,
} from '@tabler/icons-react'
import UserStatus from '../Elevators/UserStatus'

const ICON_SIZE = 12

type Props = {
  item: FloorData
}

export default function FloorRequest({ item }: Props) {
  const hasUp = item.requests.some((item) => item.type === 'UP')
  const hasDown = item.requests.some((item) => item.type === 'DOWN')

  return (
    <Flex>
      <Divider orientation='vertical' />
      <Flex direction='column' justify='center' h={ELEVATOR_HEIGHT} ml='xs'>
        {hasUp && <IconTriangleFilled size={ICON_SIZE} color={GREEN} />}
        {hasDown && <IconTriangleInvertedFilled size={ICON_SIZE} color={RED} />}
      </Flex>
      <UserStatus count={item.requests.length} />
    </Flex>
  )
}
