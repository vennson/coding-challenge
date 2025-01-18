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
import { getFromTo, sortPaths } from './utils'
import { USER_GENERATE_SECONDS } from './constants'

const { set, get } = store

export function startSimulation() {
  set(startedSimulationAtom, true)
  generateUsers()
  setInterval(() => {
    generateUsers()
  }, USER_GENERATE_SECONDS * 1000)
}

function getLogs(users: UserData[]) {
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

    const newLogs = [...logs, log]
    return { isNewRequest, newLogs }
  }
}

function updateElevators(user: UserData) {
  // get travel time of each elevator to user's floor
  const elevators = get(elevatorsAtom)
  const allTravelTimes = elevators.map((elev) => {
    const travelTimeToUser = elev.travelTimes.find((t) => t.to === user.from)
    const time = travelTimeToUser?.time || 0
    return {
      id: elev.id,
      time,
      status: elev.status,
      floor: elev.floor,
      path: elev.paths[0],
    }
  }, [])

  // filter out elevators that are not valid for user
  const betterElevators = allTravelTimes.filter((elev) => {
    if (elev.status === user.direction) {
      if (elev.status === 'UP' && elev.floor < user.from) {
        return true
      } else if (elev.status === 'DOWN' && elev.floor > user.from) {
        return true
      }
    }

    if (elev.path?.direction === user.direction) {
      if (elev.path.direction === 'UP' && elev.floor < user.from) {
        return true
      } else if (elev.path.direction === 'DOWN' && elev.floor > user.from) {
        return true
      }
    }

    if (elev.status === 'WAIT' && elev.floor === user.from) {
      return true
    }

    if (elev.status === 'IDLE') return true
  })

  if (betterElevators.length === 0) return false

  // get id of elevator with the shortest travel time
  const shortestTravelTime = betterElevators.reduce((acc, cur) => {
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
    const sortedPaths = sortPaths(newPaths, elevator.status)
    const newElevator: ElevatorData = { ...elevator, paths: sortedPaths }
    const elevAtom = elevatorAtomsMap[bestElevatorId]

    set(elevAtom, newElevator)
    return true
  }
}

function generateUsers() {
  const users = get(usersAtom) || []

  const id = users.length + 1
  const { from, to } = getFromTo()
  const direction: Direction = to > from ? 'UP' : 'DOWN'
  const location: Location = 'FLOOR'
  const newUser = { id, from, to, direction, location }
  const newUsers = [...users, newUser]

  const { isNewRequest, newLogs } = getLogs(newUsers) || {}
  if (isNewRequest) {
    const success = updateElevators(newUser)
    if (success) {
      if (newLogs) set(logsAtom, newLogs)
      set(usersAtom, newUsers)
    }
  }
}
