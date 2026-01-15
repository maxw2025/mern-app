import { useEffect } from 'react'
import useKeysContext from '../hooks/useKeysContext'
import { useAuthContext } from '../hooks/useAuthContext'

import KeyDetails from '../components/KeyDetails'
import KeyForm from '../components/KeyForm'

export default function Home() {
  const { keys, dispatch } = useKeysContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchKeys = async () => {
      const response = await fetch('/api/keys', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_KEYS', payload: json })
      }
    }
    if (user) {
      fetchKeys()
    }
  }, [dispatch, user])

  return (
    <div className='home'>
      <div className='keys'>
        {keys &&
          keys.map((keyItem) => (
            <KeyDetails key={keyItem._id} keyData={keyItem} />
          ))}
      </div>
      <KeyForm />
    </div>
  )
}
