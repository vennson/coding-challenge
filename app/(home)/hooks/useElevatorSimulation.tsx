import { useAtom, useSetAtom } from 'jotai'
import { elevatorAtomsMap, logsAtom, usersAtom } from '../store/atoms'
import {
  ElevatorData,
  ElevatorStatus,
  Location,
  Path,
  UserData,
} from '../store/types'
import { useEffect, useState } from 'react'
import {
  ELEVATOR_HEIGHT,
  FLOOR_TRAVEL_SECONDS,
  FLOORS_COUNT,
} from '../store/constants'

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

        // add users to the elevator, and update elevator's path based on user's destination
        setElevator((prev) => {
          const destinations = floorUsers.map((user) => user.to)
          const uniqueDestinations = Array.from(new Set(destinations))
          const newPaths: Path[] = uniqueDestinations.map((dest) => {
            return {
              from: dest,
              direction: targetPath.direction,
            }
          })
          return {
            ...prev,
            users: [...prev.users, ...floorUsers],
            paths: newPaths,
          }
        })

        // remove arrived users from the elevator
        const filteredUsers = newUsers.filter((user) => {
          return user.to !== floor
        })
        console.log('@@ newUsers', newUsers)
        console.log('@@ filteredUsers', filteredUsers)
        return filteredUsers
      })
    }

    if (targetPath.from > floor) {
      const newTop = getTop(floor + 1)
      setTop(newTop)
      setTimeout(() => {
        setElevator((prev) => ({
          ...prev,
          floor: floor + 1,
        }))
      }, FLOOR_TRAVEL_SECONDS * 1000)
    }

    if (targetPath.from < floor) {
      const newTop = getTop(floor - 1)
      setTop(newTop)
      setTimeout(() => {
        setElevator((prev) => ({
          ...prev,
          floor: floor - 1,
        }))
      }, FLOOR_TRAVEL_SECONDS * 1000)
    }

    // every change of floor, calculate the travelTimes to each floor
    // TODO
  }, [elevatorId, floor, setElevator, setUsers, targetPath])

  // handle elevator logs
  useEffect(() => {
    const log = `<b>Car ${elevatorId}</b> is on <b>Floor ${floor}</b>`
    setLogs((prev) => [...prev, log])
  }, [elevatorId, floor, setLogs])

  // handle elevator status
  useEffect(() => {
    // if (!targetPath) return

    let status: ElevatorStatus
    switch (true) {
      case !targetPath?.from:
        status = 'IDLE'
        break
      case floor < targetPath.from:
        status = 'UP'
        break
      case floor > targetPath.from:
        status = 'DOWN'
        break
      default:
        break
    }
    setElevator((prev) => ({ ...prev, status }))
  }, [floor, setElevator, targetPath])

  return { top }
}
