import { atom } from 'jotai'
import { ElevatorData, RequestData, UserData } from './types'
import { PrimitiveAtom } from 'jotai'

// const DUMMY_ELEVATORS: ElevatorData[] = [
//   {
//     id: 1,
//     status: 'UP',
//     path: [1],
//     users: [],
//     travelTimes: [
//       { floorTo: 1, time: 0 },
//       { floorTo: 2, time: 10 },
//       { floorTo: 3, time: 10 },
//       { floorTo: 4, time: 10 },
//       { floorTo: 5, time: 10 },
//       { floorTo: 6, time: 10 },
//       { floorTo: 7, time: 10 },
//       { floorTo: 8, time: 10 },
//       { floorTo: 9, time: 10 },
//       { floorTo: 10, time: 10 },
//     ],
//   },
//   {
//     id: 2,
//     status: 'DOWN',
//     path: [2],
//     users: [],
//   },
//   {
//     id: 3,
//     status: 'UP',
//     path: [3, 5],
//     users: [{ id: 1, from: 3, to: 5 }],
//   },
//   {
//     id: 4,
//     status: 'DOWN',
//     path: [10, 4, 9],
//     users: [{ id: 2, from: 10, to: 9 }],
//   },
// ]

// const DUMMY_LOGS = [
//   'Car 1 is on Floor 3',
//   'Car 2 is on Floor 10',
//   '"DOWN" request on Floor 4 received',
//   '"UP" request on Floor 7 received',
//   '"Floor 5" request on Car 3 received',
// ]

const TRAVEL_TIMES_INIT = [
  { to: 1, time: 0 },
  { to: 2, time: 10 },
  { to: 3, time: 20 },
  { to: 4, time: 30 },
  { to: 5, time: 40 },
  { to: 6, time: 50 },
  { to: 7, time: 60 },
  { to: 8, time: 70 },
  { to: 9, time: 80 },
  { to: 10, time: 90 },
]

const ELEVATORS_INIT: ElevatorData[] = [
  {
    id: 1,
    status: 'IDLE',
    floor: 1,
    path: [],
    users: [],
    travelTimes: TRAVEL_TIMES_INIT,
  },
  {
    id: 2,
    status: 'IDLE',
    floor: 1,
    path: [],
    users: [],
    travelTimes: TRAVEL_TIMES_INIT,
  },
  {
    id: 3,
    status: 'IDLE',
    floor: 1,
    path: [],
    users: [],
    travelTimes: TRAVEL_TIMES_INIT,
  },
  {
    id: 4,
    status: 'IDLE',
    floor: 1,
    path: [],
    users: [],
    travelTimes: TRAVEL_TIMES_INIT,
  },
]

const DUMMY_REQUESTS: RequestData[] = [
  {
    id: 1,
    type: 'UP',
    from: 1,
  },
  {
    id: 2,
    type: 'DOWN',
    from: 10,
  },
  {
    id: 3,
    type: 'UP',
    from: 7,
  },
  {
    id: 4,
    type: 'DOWN',
    from: 7,
  },
]

// export const FLOORS_INIT: FloorData[] = [
//   {
//     id: 1,
//     requests: [],
//     users: [],
//   },
//   {
//     id: 2,
//     requests: [],
//     users: [],
//   },
//   {
//     id: 3,
//     requests: [],
//     users: [],
//   },
//   {
//     id: 4,
//     requests: [],
//     users: [],
//   },
//   {
//     id: 5,
//     requests: [],
//     users: [],
//   },
//   {
//     id: 6,
//     requests: [],
//     users: [],
//   },
//   {
//     id: 7,
//     requests: [],
//     users: [],
//   },
//   {
//     id: 8,
//     requests: [],
//     users: [],
//   },
//   {
//     id: 9,
//     requests: [],
//     users: [],
//   },
//   {
//     id: 10,
//     requests: [],
//     users: [],
//   },
// ]

// PRIMITIVE ATOMS
export const usersAtom = atom<UserData[]>([])
export const logsAtom = atom<string[]>([])
export const requestsAtom = atom<RequestData[]>(DUMMY_REQUESTS)
// export const floorsAtom = atom<FloorData[]>(FLOORS_INIT)
export const startedSimulationAtom = atom(false)
export const elevator1Atom = atom<ElevatorData>(ELEVATORS_INIT[0])
export const elevator2Atom = atom<ElevatorData>(ELEVATORS_INIT[1])
export const elevator3Atom = atom<ElevatorData>(ELEVATORS_INIT[2])
export const elevator4Atom = atom<ElevatorData>(ELEVATORS_INIT[3])

// ATOMS MAPPING
export const elevatorAtomsMap: Record<
  number,
  PrimitiveAtom<ElevatorData>
> = {
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
