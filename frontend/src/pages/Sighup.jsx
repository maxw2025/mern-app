import { useState } from 'react'
import useSignup from '../hooks/useSignup'

export default function Sighup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoading, error } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password)
  }

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label htmlFor='email'>Email:</label>
      <input
        id='email'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor='password'>Password:</label>
      <input
        id='password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={isLoading}>Sign Up</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}
