import { connect } from 'react-redux'

const Notification = (props) => {
  // you can use props to reflect the state thanks to the connect function and mapStateToProps
  const notification = props.notification.value
  const mystyle = props.notification.style
  
  return (
    <div style={mystyle}>
      {notification}
    </div>
  )
}

// takes the state from the store as a parameter and maps it to props (old alternative to useSelector)
const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}
const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification