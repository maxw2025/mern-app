import { createContext, useReducer } from 'react'

export const KeyContext = createContext()

export const KeysReducer = (state, action) => {
  switch (action.type) {
    case 'SET_KEYS':
      return {
        keys: action.payload,
      }
    case 'CREATE_KEY':
      return {
        keys: [action.payload, ...state.keys],
      }
    case 'DELETE_KEY':
      return {
        keys: state.keys.filter((key) => key._id !== action.payload._id),
      }
    case 'UPDATE_KEY':
      return {
        keys: state.keys.map((key) =>
          key._id === action.payload._id ? action.payload : key
        ),
      }
    default:
      return state
  }
}

export const KeyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(KeysReducer, {
    keys: null,
  })

  return (
    <KeyContext.Provider value={{ ...state, dispatch }}>
      {children}
    </KeyContext.Provider>
  )
}
