export type ElevatorData = {
  id: number
  status: ElevatorStatus
  paths: Path[]
  users: UserData[]
  travelTimes: TravelTime[]
  floor: number
}

export type Path = {
  from: number
  direction: Direction
}

export type TravelTime = {
  to: number
  time: number
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

export type ElevatorStatus = 'UP' | 'DOWN' | 'IDLE' | 'WAIT'
export type Direction = 'UP' | 'DOWN'
export type Location = 'FLOOR' | 'ELEVATOR' | 'OUT'
