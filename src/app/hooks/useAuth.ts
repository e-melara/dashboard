import { useContext } from "react"

import { AuthContext } from 'app/contexts'

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) throw new Error('Auth context no existe')

  return context
}
