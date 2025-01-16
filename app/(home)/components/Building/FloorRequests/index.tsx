'use client'

import { Box } from '@mantine/core'
import { useAtomValue } from 'jotai'
import FloorRequest from './FloorRequest'
import { floorsAtom } from '@/app/(home)/store/atoms'

export default function FloorRequests() {
  const floors = useAtomValue(floorsAtom)

  return (
    <Box pos='absolute' right={10} top={0}>
      {floors.map((item) => (
        <FloorRequest key={item.id} item={item} />
      ))}
    </Box>
  )
}
