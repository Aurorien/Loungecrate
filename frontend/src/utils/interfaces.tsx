export interface ApiResponse {
  username: string
  success: boolean
  message?: string
}

export interface Band {
  id: number
  name: string
  genre: string
  city: string
  description: string
}

export interface DropdownOption {
  id: number
  name: string
  cityid?: number
}

export interface Event {
  eventid: number
  eventname: string
  eventdescription: string
}
