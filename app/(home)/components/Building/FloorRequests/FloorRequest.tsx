'use client'

import { ELEVATOR_HEIGHT } from '@/app/(home)/constants'
import { GREEN, RED } from '@/app/(layout)/constants'
import { Divider, Flex } from '@mantine/core'
import {
  IconTriangleFilled,
  IconTriangleInvertedFilled,
} from '@tabler/icons-react'
import UserStatus from '../Elevators/UserStatus'
import { useAtomValue } from 'jotai'
import { usersAtom } from '@/app/(home)/store/atoms'

const ICON_SIZE = 12

type Props = {
  id: number
}

export default function FloorRequest({ id }: Props) {
  const users = useAtomValue(usersAtom)

  const floorUsers = users.filter((user) => user.from === id)
  const hasUp = floorUsers.some((user) => user.to > id)
  const hasDown = floorUsers.some((user) => user.to < id)

  return (
    <Flex>
      <Divider orientation='vertical' />
      <Flex direction='column' justify='center' h={ELEVATOR_HEIGHT} ml='xs'>
        {hasUp && <IconTriangleFilled size={ICON_SIZE} color={GREEN} />}
        {hasDown && <IconTriangleInvertedFilled size={ICON_SIZE} color={RED} />}
      </Flex>
      <UserStatus count={floorUsers.length} />
    </Flex>
  )
}
