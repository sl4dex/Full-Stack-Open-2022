import { useState } from 'react'

// recieves the 'type' string as a parameter (ex: 'text')
export const useField = (type) => {
  const [value, setValue] = useState('')

  // onChange method that sets the value of the 'value' state on each change of the input 
  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export default useField