import React from 'react'

export interface AppContextInterface {
  signIn: ({ token }: { token: string }) => Promise<void>
  signOut: () => void
}

export const AuthContext = React.createContext<AppContextInterface | null>(null)
