import { useSelector } from 'react-redux'

const Notification = () => {
  // useSelector muestra el estado de lo que quieras del store
  const notification = useSelector(state => state.notification.value)
  const mystyle = useSelector(state => state.notification.style)
  console.log(mystyle);

  return (
    <div style={mystyle}>
      {notification}
    </div>
  )
}

export default Notification