import React from 'react'
import Popup from './Popup'
import { useSelector } from 'react-redux'
import Register from './Register'
import Login from './Login'

export default function Popups() {
    const registerPopup = useSelector(state => state.Navbar.register)
    const loginPopup = useSelector(state => state.Navbar.login)
  return (
    <div>
        <Popup trigger = {registerPopup}>
            <Register></Register>
        </Popup>

        <Popup trigger = {loginPopup}>
            <Login></Login>
        </Popup>
    </div>
  )
}
