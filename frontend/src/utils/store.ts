import { create } from 'zustand'

interface LogInStore {
  loggedIn: boolean
  username: string
  setLoggedIn: () => void
  setLogout: () => void
  setUsername: (username: string) => void
}

export const useLogInStore = create<LogInStore>((set) => ({
  loggedIn: false,
  username: '',
  setLoggedIn: () => set({ loggedIn: true }),
  setLogout: () => set({ loggedIn: false }),
  setUsername: (user_name: string) => set({ username: user_name })
}))
