export type ElevatorData = {
  id: number
  status: "UP" | "DOWN"
  path: number[]
  users: UserData[]
}

export type RequestData = {
  id: number
  type: "UP" | "DOWN"
  from: number
}

export type UserData = {
  id: number
  from: number
  to: number
}

export type FloorData = {
  id: number
  requests: RequestData[]
  users: UserData[]
}