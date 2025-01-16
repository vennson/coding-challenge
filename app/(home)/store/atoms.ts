import { atom } from 'jotai'
import { ElevatorData, FloorData, RequestData } from '../types'

const DUMMY_ELEVATORS: ElevatorData[] = [
  {
    id: 1,
    status: 'UP',
    path: [1],
    users: [],
  },
  {
    id: 2,
    status: 'DOWN',
    path: [2],
    users: [],
  },
  {
    id: 3,
    status: 'UP',
    path: [3, 5],
    users: [{ id: 1, destination: 5 }],
  },
  {
    id: 4,
    status: 'DOWN',
    path: [10, 4, 9],
    users: [{ id: 2, destination: 9 }],
  },
]

const DUMMY_LOGS = [
  'Car 1 is on Floor 3',
  'Car 2 is on Floor 10',
  '"DOWN" request on Floor 4 received',
  '"UP" request on Floor 7 received',
  '"Floor 5" request on Car 3 received',
]

const DUMMY_REQUESTS: RequestData[] = [
  {
    id: 1,
    type: 'UP',
    fromFloor: 1,
  },
  {
    id: 2,
    type: 'DOWN',
    fromFloor: 10,
  },
  {
    id: 3,
    type: 'UP',
    fromFloor: 7,
  },
]

const DUMMY_FLOORS: FloorData[] = [
  {
    id: 1,
    requests: [DUMMY_REQUESTS[0]],
  },
  {
    id: 2,
    requests: [],
  },
  {
    id: 3,
    requests: [],
  },
  {
    id: 4,
    requests: [],
  },
  {
    id: 5,
    requests: [],
  },
  {
    id: 6,
    requests: [],
  },
  {
    id: 7,
    requests: [DUMMY_REQUESTS[2]],
  },
  {
    id: 8,
    requests: [],
  },
  {
    id: 9,
    requests: [],
  },
  {
    id: 10,
    requests: [DUMMY_REQUESTS[1]],
  },
]

export const elevatorsAtom = atom<ElevatorData[]>(DUMMY_ELEVATORS)
export const logsAtom = atom<string[]>(DUMMY_LOGS)
export const requestsAtom = atom<RequestData[]>(DUMMY_REQUESTS)
export const floorsAtom = atom<FloorData[]>(DUMMY_FLOORS)
