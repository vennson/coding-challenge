import { FLOORS_COUNT } from './constants'

export function getFromTo() {
  const floors = Array.from({ length: FLOORS_COUNT }, (_, i) => i + 1)
  const fromIndex = Math.floor(Math.random() * floors.length)
  const from = floors[fromIndex]

  // remove the 'from' floor and pick from remaining floors
  floors.splice(fromIndex, 1)
  const to = floors[Math.floor(Math.random() * floors.length)]

  return { from, to }
}
