import { useContext } from 'react'
import { KeyContext } from '../context/KeyContext'

export default function useKeysContext() {
  const context = useContext(KeyContext)

  if (!context) {
    throw new Error('useKeysContext must be used within a KeyProvider')
  }
  return context
}
