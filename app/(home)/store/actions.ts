'use client'

import { store } from '@/store'
import { logsAtom, startedSimulationAtom, usersAtom } from './atoms'
import { Direction, Location, UserData } from './types'
import { getFromTo } from './utils'

const { set, get } = store

export function startSimulation() {
  set(startedSimulationAtom, true)
  generateUsers()
  setInterval(() => {
    generateUsers()
  }, 5000)
}

function updateLogs(users: UserData[]) {
  const logs = get(logsAtom)

  console.log('@@ users', users)

  const newUser = users[users.length - 1]
  console.log('@@ newUser', newUser)
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

    console.log('@@ log', log)
    set(logsAtom, [...logs, log])
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

  set(usersAtom, newUsers)
  updateLogs(newUsers)
}
