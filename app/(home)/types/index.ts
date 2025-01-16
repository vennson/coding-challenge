export type ElevatorData = {
  id: number
  status: "UP" | "DOWN"
  path: number[]
  users: UserData[]
}

export type RequestData = {
  id: number
  type: "UP" | "DOWN"
  fromFloor: number
}

export type UserData = {
  id: number
  destination: number
}

export type FloorData = {
  id: number
  requests: RequestData[]
}