'use client'

import { Box, Divider, ScrollArea, Text, Title } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { logsAtom } from '../../store/atoms'
import { useEffect, useRef } from 'react'

export default function Logs() {
  const logs = useAtomValue(logsAtom)
  const viewport = useRef<HTMLDivElement>(null)

  const hasLogs = logs.length > 0

  useEffect(() => {
    function scrollToBottom() {
      viewport.current!.scrollTo({
        top: viewport.current!.scrollHeight,
        behavior: 'smooth',
      })
    }

    if (logs) {
      scrollToBottom()
    }
  }, [logs])

  return (
    <Box w='100%' mt='md'>
      <Title order={5}>Logs</Title>
      <Divider/>
      {!hasLogs && (
        <Text fz='xs' c='dimmed'>
          Start the simulation to see logs
        </Text>
      )}
      <ScrollArea h={100} viewportRef={viewport}>
        {logs.map((log, index) => (
          <Box key={index} fz='xs' dangerouslySetInnerHTML={{ __html: log }} />
        ))}
      </ScrollArea>
      <Divider/>
    </Box>
  )
}
