import { createContext, useState, useEffect, useContext } from 'react'

export interface IAuthState {
  isConnected: boolean
}

const defaultAuthState: IAuthState = { isConnected: false }

const AuthContext = createContext(defaultAuthState)

const AuthProvider = ({ children }: IDefaultProps) => {

  return (
    <AuthContext.Provider value={{ isConnected: false }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
