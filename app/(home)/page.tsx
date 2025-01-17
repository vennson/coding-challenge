import { Flex } from '@mantine/core'
import Building from './components/Building'
import Logs from './components/Logs'
import Header from './components/Header'

export default function Home() {
  return (
    <main>
      <Flex justify='center'>
        <Flex direction='column' align='center' p='sm' w={320}>
          <Header />
          <Building />
          <Logs />
        </Flex>
      </Flex>
    </main>
  )
}
