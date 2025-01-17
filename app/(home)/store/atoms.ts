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
    users: [{ id: 1, from: 3, to: 5 }],
  },
  {
    id: 4,
    status: 'DOWN',
    path: [10, 4, 9],
    users: [{ id: 2, from: 10, to: 9 }],
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

const DUMMY_FLOORS: FloorData[] = [
  {
    id: 1,
    requests: [DUMMY_REQUESTS[0], DUMMY_REQUESTS[3]],
    users: [{ id: 3, from: 1, to: 5 }],
  },
  {
    id: 2,
    requests: [],
    users: [],
  },
  {
    id: 3,
    requests: [],
    users: [],
  },
  {
    id: 4,
    requests: [],
    users: [],
  },
  {
    id: 5,
    requests: [],
    users: [],
  },
  {
    id: 6,
    requests: [],
    users: [],
  },
  {
    id: 7,
    requests: [DUMMY_REQUESTS[2]],
    users: [{ id: 3, from: 10, to: 3 }],
  },
  {
    id: 8,
    requests: [],
    users: [],
  },
  {
    id: 9,
    requests: [],
    users: [],
  },
  {
    id: 10,
    requests: [DUMMY_REQUESTS[1]],
    users: [{ id: 3, from: 7, to: 9 }],
  },
]

export const elevatorsAtom = atom<ElevatorData[]>(DUMMY_ELEVATORS)
export const logsAtom = atom<string[]>(DUMMY_LOGS)
export const requestsAtom = atom<RequestData[]>(DUMMY_REQUESTS)
export const floorsAtom = atom<FloorData[]>(DUMMY_FLOORS)
