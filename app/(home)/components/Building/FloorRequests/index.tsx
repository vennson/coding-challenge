import { Box } from '@mantine/core'
import FloorRequest from './FloorRequest'
// import { floorsAtom } from '@/app/(home)/store/atoms'
// import { useAtomValue } from 'jotai'
import { FLOORS_COUNT } from '@/app/(home)/store/constants'

export default function FloorRequests() {
  const floors = Array.from({ length: FLOORS_COUNT }, (_, i) => i + 1)
  const reversed = floors.reverse()
  // const floors = useAtomValue(floorsAtom)
  // const users = useAtomValue(usersAtom)

  // useEffect(() => {
  //   const newFloors: FloorData[] = floors.map((item) => {
  //     // const requests = users
  //     return { ...item, requests, users }
  //   })
  //   setFloors(newFloors)
  // }, [floors, setFloors, users])

  return (
    <Box pos='absolute' right={0} top={0} w={60}>
      {reversed.map((id) => (
        <FloorRequest key={id} id={id} />
      ))}
    </Box>
  )
}
