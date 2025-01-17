import { Flex, Text, Title } from '@mantine/core'
import Building from './components/Building'
import Logs from './components/Logs'

export default function Home() {
  return (
    <div>
      <main>
        <Flex justify='center'>
          <Flex direction='column' align='center' p='sm' w={320}>
            <Title order={3} ta='center' w={250}>
              Elementary Elevator Control System
            </Title>
            <Text ta='center' c='dimmed' fz='xs'>
              By: Benson Miakoun
            </Text>
            <Building />
            <Logs />
          </Flex>
        </Flex>
      </main>
    </div>
  )
}
