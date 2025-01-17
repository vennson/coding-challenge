'use client'

import { store } from '@/store'
import {
  elevatorAtomsMap,
  elevatorsAtom,
  logsAtom,
  startedSimulationAtom,
  usersAtom,
} from './atoms'
import { Direction, ElevatorData, Location, Path, UserData } from './types'
import { getFromTo } from './utils'

const { set, get } = store

export function startSimulation() {
  set(startedSimulationAtom, true)
  generateUsers()
  // setInterval(() => { //?
  //   generateUsers()
  // }, USER_GENERATE_SECONDS * 1000)
}

function updateLogs(users: UserData[]) {
  const logs = get(logsAtom)

  const newUser = users[users.length - 1]
  if (newUser) {
    // prevent same log if similar user request is still pending
    const otherUsers = users.filter((user) => user.id !== newUser.id)
    let isNewRequest = true
    for (const user of otherUsers) {
      const sameDirection = user.direction === newUser.direction
      const sameFloorFrom = user.from === newUser.from
      const isInFloor = user.location === 'FLOOR'
      if (sameDirection && sameFloorFrom && isInFloor) {
        isNewRequest = false
        break
      }
    }

    let log
    if (isNewRequest) {
      log = `<b>"${newUser.direction}"</b> request on <b>Floor ${newUser.from}</b> received`
    } else {
      const similarUsers = users.filter(
        (u) => u.from === newUser.from && u.direction === newUser.direction,
      )
      log = `<b>${similarUsers.length} users</b> waiting on <b>Floor ${newUser.from}</b> to go <b>"${newUser.direction}</b>"`
    }

    set(logsAtom, [...logs, log])
    return isNewRequest
  }
}

function updateElevators(user: UserData) {
  // get travel time of each elevator to user's floor
  const elevators = get(elevatorsAtom)
  const allTravelTimes = elevators.map((elev) => {
    const travelTimeToUser = elev.travelTimes.find((t) => t.to === user.from)
    const time = travelTimeToUser?.time || 0
    return { id: elev.id, time }
  }, [])

  // get id of elevator with the shortest travel time
  const shortestTravelTime = allTravelTimes.reduce((acc, cur) => {
    if (acc.time <= cur.time) {
      return acc
    } else {
      return cur
    }
  })
  const bestElevatorId = shortestTravelTime.id

  // update path of best elevator
  const elevator = elevators.find((elev) => elev.id === bestElevatorId)

  if (elevator) {
    const newPaths: Path[] = [
      ...elevator.paths,
      { from: user.from, direction: user.direction },
    ]
    // const nextPath = newPath[0]
    // const nextStatus =
    const newElevator: ElevatorData = { ...elevator, paths: newPaths }
    const elevAtom = elevatorAtomsMap[bestElevatorId]
    set(elevAtom, newElevator)
  }
  // const newElevators = elevators.map((elev) => {
  //   if (bestElevatorId === elev.id) {
  //     return { ...elev, path: [...elev.path, user.from] }
  //   } else {
  //     return elev
  //   }
  // })

  // (update travelTimes of best elevator in the Elevator component)
}

function generateUsers() {
  const users = get(usersAtom) || []

  const id = users.length + 1
  const { from, to } = getFromTo()
  const direction: Direction = to > from ? 'UP' : 'DOWN'
  const location: Location = 'FLOOR'
  const newUser = { id, from, to, direction, location }
  const newUsers = [...users, newUser]

  set(usersAtom, newUsers)
  const isNewRequest = updateLogs(newUsers)
  if (isNewRequest) updateElevators(newUser)
}
