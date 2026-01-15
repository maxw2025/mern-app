import { useAuthContext } from './useAuthContext'
import useKeysContext from './useKeysContext'

export default function useLogout() {
  const { dispatch } = useAuthContext()
  const { dispatch: keysDispatch } = useKeysContext()
  
  const logout = () => {
    localStorage.removeItem('user')

    dispatch({ type: 'LOGOUT' })
    keysDispatch({ type: 'SET_KEYS', payload: null })
  }

  return { logout }
}
