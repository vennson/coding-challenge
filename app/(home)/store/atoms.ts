import { atom } from 'jotai'
import { ElevatorData, UserData } from './types'
import { PrimitiveAtom } from 'jotai'
import { getElevatorInit } from './utils'

// PRIMITIVE ATOMS
export const usersAtom = atom<UserData[]>([])
export const logsAtom = atom<string[]>([])
export const startedSimulationAtom = atom(false)
export const elevator1Atom = atom<ElevatorData>(getElevatorInit(1))
export const elevator2Atom = atom<ElevatorData>(getElevatorInit(2))
export const elevator3Atom = atom<ElevatorData>(getElevatorInit(3))
export const elevator4Atom = atom<ElevatorData>(getElevatorInit(4))

// ATOMS MAPPING
export const elevatorAtomsMap: Record<number, PrimitiveAtom<ElevatorData>> = {
  1: elevator1Atom,
  2: elevator2Atom,
  3: elevator3Atom,
  4: elevator4Atom,
}

// DERIVED ATOMS
export const elevatorsAtom = atom((get) => {
  return [
    get(elevator1Atom),
    get(elevator2Atom),
    get(elevator3Atom),
    get(elevator4Atom),
  ]
})
