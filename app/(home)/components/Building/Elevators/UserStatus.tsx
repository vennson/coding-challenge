import { Flex, Text } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'

type Props = {
  count: number
}

export default function UserStatus({ count }: Props) {
  if (count === 0) return null

  return (
    <Flex align='center' mt={-1}>
      <IconUser size={14} />
      <Text fz='xs'>{count}</Text>
    </Flex>
  )
}
