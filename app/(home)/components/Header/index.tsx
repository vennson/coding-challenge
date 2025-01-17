'use client'

import { Button, Flex, Text, Title } from '@mantine/core'

export default function Header() {
  function onClick() {}

  return (
    <Flex direction='column' align='center'>
      <Title order={3} ta='center' w={250}>
        Elementary Elevator Control System
      </Title>
      <Text ta='center' c='dimmed' fz='xs'>
        By: Benson Miakoun
      </Text>
      <Button onClick={onClick} mt='md'>
        Start simulation
      </Button>
    </Flex>
  )
}
