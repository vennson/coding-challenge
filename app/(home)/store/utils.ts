// import { FLOORS_COUNT } from './constants'

import { ELEVATOR_WAIT_SECONDS, FLOOR_TRAVEL_SECONDS } from './constants'
import { Path } from './types'

export function getFromTo(from?: number, to?: number) {
  //?
  // const floors = Array.from({ length: FLOORS_COUNT }, (_, i) => i + 1)
  // const fromIndex = Math.floor(Math.random() * floors.length)
  // const from = floors[fromIndex]

  // // remove the 'from' floor and pick from remaining floors
  // floors.splice(fromIndex, 1)
  // const to = floors[Math.floor(Math.random() * floors.length)]

  // return { from, to }
  //!
  return { from: from || 4, to: to || 2 }
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

export function getTravelTimes(floor: number, to: number) {
  //! example
  // const floor = 4
  // const targetPath = { from: 2, direction: 'WAIT' }

  // todo don't give score time if ref floor is not reached depending on elev direction

  //?
  return [
    { to: 1, time: getTime(1, floor, to) },
    { to: 2, time: getTime(2, floor, to) },
    { to: 3, time: getTime(3, floor, to) },
    { to: 4, time: getTime(4, floor, to) },
    { to: 5, time: getTime(5, floor, to) },
    { to: 6, time: getTime(6, floor, to) },
    { to: 7, time: getTime(7, floor, to) },
    { to: 8, time: getTime(8, floor, to) },
    { to: 9, time: getTime(9, floor, to) },
    { to: 10, time: getTime(10, floor, to) },
  ]
}

export function sortPaths(paths: Path[]) {
  return paths.toSorted((a, b) => {
    return a.from - b.from
  })
}
