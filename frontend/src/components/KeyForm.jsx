import { useState } from 'react'
import useKeysContext from '../hooks/useKeysContext'
import { useAuthContext } from '../hooks/useAuthContext'

export default function KeyForm() {
  const { dispatch } = useKeysContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const keyData = { title, password, name }

    const response = await fetch('/api/keys', {
      method: 'POST',
      body: JSON.stringify(keyData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setPassword('')
      setName('')
      setError(null)
      setEmptyFields([])

      dispatch({ type: 'CREATE_KEY', payload: json })
    }
  }
  return (
    <form onSubmit={handleSubmit} className='create'>
      <h3>Add a New Key</h3>

      <label>Website Name</label>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Account</label>
      <input
        type='text'
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Password</label>
      <input
        type='text'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className={emptyFields.includes('password') ? 'error' : ''}
      />

      <button>Add Password</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}
