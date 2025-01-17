import { useAtom, useSetAtom } from 'jotai'
import { elevatorAtomsMap, logsAtom, usersAtom } from '../store/atoms'
import {
  ElevatorData,
  // ElevatorStatus,
  Location,
  Path,
  TravelTime,
  UserData,
} from '../store/types'
import { useEffect, useState } from 'react'
import {
  ELEVATOR_HEIGHT,
  ELEVATOR_WAIT_SECONDS,
  FLOOR_TRAVEL_SECONDS,
  FLOORS_COUNT,
} from '../store/constants'
import { getTravelTimes, sortPaths } from '../store/utils'

type Props = {
  item: ElevatorData
}

export default function useElevatorSimulation({ item }: Props) {
  const floor = item.floor
  const elevAtom = elevatorAtomsMap[item.id]
  const [elevator, setElevator] = useAtom(elevAtom)
  const setLogs = useSetAtom(logsAtom)
  const setUsers = useSetAtom(usersAtom)
  const topInit = getTop(floor)
  // const [elevators, setElevators] = useAtom(elevatorsAtom)
  const [top, setTop] = useState(topInit)

  // const elevator = elevators.find((elev) => elev.id === item.id)
  // const top = (FLOORS_COUNT - floor) * ELEVATOR_HEIGHT
  const targetPath = elevator?.paths[0]
  const elevatorId = elevator?.id

  function getTop(floor: number) {
    return (FLOORS_COUNT - floor) * ELEVATOR_HEIGHT
  }

  // handle elevator movement
  useEffect(() => {
    if (!elevatorId) return

    // make the elevator wait when it stops on destination floors
    if (item.status === 'WAIT') {
      setTimeout(() => {
        setElevator((prev) => {
          return { ...prev, status: 'IDLE' }
        })
      }, ELEVATOR_WAIT_SECONDS * 1000)
      return
    }

    if (!targetPath) return

    if (targetPath.from === floor) {
      setUsers((prev) => {
        // make sure only "DOWN" or "UP" users are added to the elevator
        const floorUsers: UserData[] = []
        const newUsers = prev.map((user) => {
          if (
            user.from === floor &&
            user.location === 'FLOOR' &&
            user.direction === targetPath.direction
          ) {
            floorUsers.push(user)
            return { ...user, location: 'ELEVATOR' as Location }
          }
          return user
        })

        // 1. remove arrived users from the elevator
        // 2. add users to the elevator,
        // 3. remove elevator's paths that have same floor with current floor
        // 4. add new elevator's path based on user's destination
        setElevator((prev) => {
          const remainUsers = prev.users.filter((user) => user.to !== floor)
          const destinations = floorUsers.map((user) => user.to)
          const uniqueDestinations = Array.from(new Set(destinations))
          const newPaths: Path[] = uniqueDestinations.map((dest) => {
            return {
              from: dest,
              direction: targetPath.direction,
            }
          })
          const filteredPaths = prev.paths.filter((path) => path.from !== floor)
          const paths = sortPaths([...filteredPaths, ...newPaths])
          const users = [...remainUsers, ...floorUsers]
          console.log('@@ updateElev', { ...prev, users, paths, status: 'WAIT' })
          return { ...prev, users, paths, status: 'WAIT' }
        })

        return newUsers
      })
    }

    // to move the elevator up
    if (targetPath.from > floor) {
      const newTop = getTop(floor + 1)
      setTop(newTop)
      setElevator((prev) => ({ ...prev, status: 'UP' }))
      setTimeout(() => {
        const travelTimes: TravelTime[] = getTravelTimes(floor, targetPath.from)
        setElevator((prev) => ({
          ...prev,
          floor: floor + 1,
          travelTimes,
        }))
      }, FLOOR_TRAVEL_SECONDS * 1000)
    }

    // to move the elevator down
    if (targetPath.from < floor) {
      const newTop = getTop(floor - 1)
      setTop(newTop)
      setElevator((prev) => ({ ...prev, status: 'DOWN' }))
      setTimeout(() => {
        const travelTimes: TravelTime[] = getTravelTimes(floor, targetPath.from)
        setElevator((prev) => ({
          ...prev,
          floor: floor - 1,
          travelTimes,
        }))
      }, FLOOR_TRAVEL_SECONDS * 1000)
    }
  }, [elevatorId, floor, item.status, setElevator, setUsers, targetPath])

  // handle elevator logs
  useEffect(() => {
    const log = `<b>Car ${elevatorId}</b> is on <b>Floor ${floor}</b>`
    setLogs((prev) => [...prev, log])
  }, [elevatorId, floor, setLogs])

  return { top }
}
