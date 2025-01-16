import { Flex, Title } from '@mantine/core'
import Building from './components/Building'

export default function Home() {
  return (
    <div>
      <main>
        <Flex justify='center'>
          <Flex direction='column' align='center' p='sm' w={320}>
            <Title order={3} ta='center'>
              Elementary Elevator Control System
            </Title>
            <Building />
          </Flex>
        </Flex>
      </main>
    </div>
  )
}
