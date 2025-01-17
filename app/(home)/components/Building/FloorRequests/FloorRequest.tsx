'use client'

import { ELEVATOR_HEIGHT } from '@/app/(home)/store/constants'
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

  const floorUsers = users.filter(
    (user) => user.from === id && user.location === 'FLOOR',
  )
  const upUsers = floorUsers.filter((user) => user.direction === 'UP')
  const downUsers = floorUsers.filter((user) => user.direction === 'DOWN')
  const hasUp = upUsers.length > 0
  const hasDown = downUsers.length > 0

  return (
    <Flex>
      <Divider orientation='vertical' />
      <Flex direction='column' justify='center' h={ELEVATOR_HEIGHT} ml='xs'>
        {hasUp && (
          <Flex align='center'>
            <IconTriangleFilled size={ICON_SIZE} color={GREEN} />
            <UserStatus count={upUsers.length} color={GREEN} />
          </Flex>
        )}
        {hasDown && (
          <Flex align='center'>
            <IconTriangleInvertedFilled size={ICON_SIZE} color={RED} />
            <UserStatus count={downUsers.length} color={RED} />
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
