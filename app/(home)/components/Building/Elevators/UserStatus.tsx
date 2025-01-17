import { Flex, Text } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'

type Props = {
  count: number
  color?: string
}

export default function UserStatus({ count, color }: Props) {
  if (count === 0) return null

  return (
    <Flex align='center' mt={-1}>
      <IconUser size={14} color={color} />
      <Text fz='xs' c={color}>{count}</Text>
    </Flex>
  )
}
