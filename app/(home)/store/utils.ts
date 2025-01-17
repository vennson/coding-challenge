import {
  ELEVATOR_WAIT_SECONDS,
  FLOOR_TRAVEL_SECONDS,
  FLOORS_COUNT,
} from './constants'
import { ElevatorData, ElevatorStatus, Path } from './types'

export function getFromTo() {
  const floors = Array.from({ length: FLOORS_COUNT }, (_, i) => i + 1)
  const fromIndex = Math.floor(Math.random() * floors.length)
  const from = floors[fromIndex]

  // remove the 'from' floor and pick from remaining floors
  floors.splice(fromIndex, 1)
  const to = floors[Math.floor(Math.random() * floors.length)]

  return { from, to }
}

export function getInitTime(id: number) {
  return FLOOR_TRAVEL_SECONDS * (id - 1)
}

export function getTime(id: number, floor: number, to: number) {
  let seconds = 0
  // 1. calculate seconds for upward travel
  // 2. check if referenced floor id will be reached
  if (floor < to) {
    for (let i = floor; i <= to; i++) {
      if (i === id) {
        return seconds
      }
      if (i < to) {
        seconds += FLOOR_TRAVEL_SECONDS
      }
      if (i === to) {
        seconds += ELEVATOR_WAIT_SECONDS
      }
    }
  }

  // 1. calculate seconds for downward travel
  // 2. check if referenced floor id will be reached
  if (floor > to) {
    for (let i = floor; i >= to; i--) {
      if (i === id) {
        return seconds
      }
      if (i > to) {
        seconds += FLOOR_TRAVEL_SECONDS
      }
      if (i === to) {
        seconds += ELEVATOR_WAIT_SECONDS
      }
    }
  }

  // if referenced floor ID was not reached,
  // calculate remaining seconds for arrival
  const diff = Math.abs(id - to)
  seconds += diff * FLOOR_TRAVEL_SECONDS
  seconds += ELEVATOR_WAIT_SECONDS

  return seconds
}

export function sortPaths(paths: Path[], status: ElevatorStatus) {
  if (status === 'UP') {
    return paths.toSorted((a, b) => {
      return a.from - b.from
    })
  }
  if (status === 'DOWN') {
    return paths.toSorted((a, b) => {
      return b.from - a.from
    })
  }
  return paths
}

export const getTravelTimes = (floor: number, to: number) => {
  return Array.from({ length: FLOORS_COUNT }, (_, index) => ({
    to: index + 1,
    time: getTime(index + 1, floor, to),
  }))
}

export function getTravelTimesInit() {
  return Array.from({ length: FLOORS_COUNT }, (_, index) => ({
    to: index + 1,
    time: getInitTime(index + 1),
  }))
}

export function getElevatorInit(id: number) {
  return {
    id,
    status: 'IDLE',
    floor: 1,
    paths: [],
    users: [],
    travelTimes: getTravelTimesInit(),
  } as ElevatorData
}
