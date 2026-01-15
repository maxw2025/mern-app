import useKeysContext from '../hooks/useKeysContext'
import { useAuthContext } from '../hooks/useAuthContext'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function KeyDetails({ keyData }) {
  const { dispatch } = useKeysContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) return

    const response = await fetch(`/api/keys/${keyData._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_KEY', payload: json })
    }
  }
  return (
    <div className='key-details'>
      <h4>{keyData.title}</h4>
      <p>
        <strong>Password: {keyData.password}</strong>
      </p>
      <p>
        <strong>Name: {keyData.name}</strong>
      </p>
      <p>
        {formatDistanceToNow(new Date(keyData.createdAt), { addSuffix: true })}
      </p>
      <span className='material-symbols-outlined' onClick={handleClick}>
        delete
      </span>
    </div>
  )
}
