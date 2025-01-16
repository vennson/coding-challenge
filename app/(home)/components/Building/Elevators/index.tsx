'use client'

import { Box } from '@mantine/core'
import Elevator from './Elevator'
import { useAtomValue } from 'jotai'
import { elevatorsAtom } from '@/app/(home)/store/atoms'

export default function Elevators() {
  const elevators = useAtomValue(elevatorsAtom)

  return (
    <Box pos='absolute' top={0}>
      <Box pos='relative' left={20}>
        {elevators.map((item) => (
          <Elevator key={item.id} item={item} />
        ))}
      </Box>
    </Box>
  )
}
