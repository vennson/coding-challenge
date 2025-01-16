'use client'

import { Box, Text, Title } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { logsAtom } from '../../store/atoms'

export default function Logs() {
  const logs = useAtomValue(logsAtom)

  return (
    <Box w='100%' mt='md'>
      <Title order={5}>Logs</Title>
      {logs.map((log, index) => (
        <Text key={index} fz='xs'>
          {log}
        </Text>
      ))}
    </Box>
  )
}
