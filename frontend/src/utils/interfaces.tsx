export interface ApiResponse {
  username: string
  success: boolean
  message?: string
}

export interface Event {
  eventid: number
  eventname: string
  eventdescription: string
}
