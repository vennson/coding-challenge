import { useAtom, useSetAtom } from 'jotai'
import { elevatorAtomsMap, logsAtom } from '../store/atoms'
import { ElevatorData, ElevatorStatus } from '../store/types'
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
  const topInit = getTop(floor)
  // const [elevators, setElevators] = useAtom(elevatorsAtom)
  const [top, setTop] = useState(topInit)

  // const elevator = elevators.find((elev) => elev.id === item.id)
  // const top = (FLOORS_COUNT - floor) * ELEVATOR_HEIGHT
  const targetFloor = elevator?.path[0]
  const elevatorId = elevator?.id

  function getTop(floor: number) {
    return (FLOORS_COUNT - floor) * ELEVATOR_HEIGHT
  }

  useEffect(() => {
    if (!elevatorId) return
    if (!targetFloor) return
    console.log('@@ floor', floor)

    let status: ElevatorStatus = 'IDLE'
    if (floor < targetFloor) {
      status = 'UP'
    } else if (floor > targetFloor) {
      status = 'DOWN'
    }
    setElevator((prev) => ({ ...prev, status }))
    // every time path[0] changes, move the elevator by one floor to that path
    // if the path[0] is the same with current floor, stop the elevator for 10 seconds,
    //    after that remove the path
    // if the path[0] is not the same with current floor, continue loop
    // if (condition) {

    // }

    if (targetFloor !== floor) {
      const newTop = getTop(floor + 1)
      setTop(newTop)
      setTimeout(() => {
        setElevator((prev) => ({
          ...prev,
          floor: floor + 1,
        }))
      }, FLOOR_TRAVEL_SECONDS * 1000)
    }

    // every change of floor, calculate the travelTimes to each floor
  }, [elevatorId, floor, setElevator, targetFloor])

  useEffect(() => {
    const log = `<b>Car ${elevatorId}</b> is on <b>Floor ${floor}</b>`
    setLogs((prev) => [...prev, log])
  }, [elevatorId, floor, setLogs])

  return { top }
}
