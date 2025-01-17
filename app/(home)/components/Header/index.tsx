'use client'

import { Button, Flex, Text, Title } from '@mantine/core'
import { startedSimulationAtom } from '../../store/atoms'
import { startSimulation } from '../../store/actions'
import { useAtomValue } from 'jotai'

export default function Header() {
  const started = useAtomValue(startedSimulationAtom)

  function onClick() {
    startSimulation()
  }

  return (
    <Flex direction='column' align='center'>
      <Title order={3} ta='center' w={250}>
        Elementary Elevator Control System
      </Title>
      <Text ta='center' c='dimmed' fz='xs'>
        By: Benson Miakoun
      </Text>
      <Button onClick={onClick} mt='md' disabled={started}>
        Start simulation
      </Button>
    </Flex>
  )
}
