'use client'

import { store } from '@/store'
import { startedSimulationAtom, usersAtom } from './atoms'
import { FLOORS_COUNT } from '../constants'
// import { UserData } from '../types'

const { set, get } = store

export function startSimulation() {
  set(startedSimulationAtom, true)
  generateUsers()
  setInterval(() => {
    generateUsers()
    // updateFloors(users)
  }, 5000)
}

// function updateFloors(users: UserData[]) {
//   const floors = get(floorsAtom)
//   const newFloors = floors.map((floor) => {
//     return { ...floor }
//   })
//   set(floorsAtom, newFloors)
// }

function generateUsers() {
  const users = get(usersAtom) || []

  const id = users.length + 1
  const { from, to } = getFromTo()
  const newUser = { id, from, to }

  set(usersAtom, [...users, newUser])
}

function getFromTo() {
  const floors = Array.from({ length: FLOORS_COUNT }, (_, i) => i + 1)
  const fromIndex = Math.floor(Math.random() * floors.length)
  const from = floors[fromIndex]

  // remove the 'from' floor and pick from remaining floors
  floors.splice(fromIndex, 1)
  const to = floors[Math.floor(Math.random() * floors.length)]

  return { from, to }
}
