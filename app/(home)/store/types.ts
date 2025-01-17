export type ElevatorData = {
  id: number
  status: Direction
  path: number[]
  users: UserData[]
}

export type RequestData = {
  id: number
  type: Direction
  from: number
}

export type UserData = {
  id: number
  from: number
  to: number
  direction: Direction
  location: Location
}

export type FloorData = {
  id: number
  requests: RequestData[]
  users: UserData[]
}

export type Direction = 'UP' | 'DOWN'
export type Location = 'FLOOR' | 'ELEVATOR' | 'OUT'
