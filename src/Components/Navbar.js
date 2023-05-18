import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { homeClicked, movieClicked,enableRegister, pageSwitch,enableLogin,logout,display } from "../redux/Store";
import cookie from 'react-cookies'
import { userLogout } from "../api/api.js";


export default function Navbar(){
    const topStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: "999",
        width: "100%"
      }
    const location = useLocation();

    const{ homeDisabled, homeColor,moviesDisabled,moviesColor,register,login,disabled } = useSelector(state => state.Navbar)
    const loggedIn = useSelector(state => state.Auth.loggedIn)
    const dispatch = useDispatch();

    switch(location.pathname){
        case "/":
            if(!register && !login){
                dispatch(homeClicked())
            }
            break
        case "/movies":
            if(!register && !login){
                dispatch(movieClicked())
            }
            break
        default:
            if(!register && !login){
                dispatch(pageSwitch())
            }
            break
    }

    const handleLogout = () =>{
        userLogout(cookie.load('Refresh Token'))
        .then(res =>{
            dispatch(logout())
            dispatch(display({ message: "User Logged Out",variant: "danger"}))
        })

    }

    return(
        <Nav className="bg-dark" style={topStyle}>
            <div className="d-flex justify-content-between">
                <Link to="/" className={homeDisabled ? "disabled-link" : "normal"}>
                    <Button className={homeColor} variant="dark" disabled={homeDisabled}><h4 className="nav-button">Home</h4></Button>
                </Link>
                <Link to ="/movies" className={moviesDisabled ? "disabled-link" : "normal"}>
                    <Button className={moviesColor} variant="dark" disabled={moviesDisabled}><h4 className="nav-button">Movies</h4></Button>
                </Link>

                {loggedIn ? <Button className="text-light" variant="dark" disabled={disabled} onClick={() => handleLogout()}><h4 className="nav-button">Logout</h4></Button>: <div>
                <Button className="text-light" variant="dark"  disabled={disabled}  onClick={() => dispatch(enableRegister())}><h4 className="nav-button">Register</h4></Button>
                <Button className="text-light" variant="dark" disabled={disabled} onClick={() => dispatch(enableLogin())}><h4 className="nav-button">Login</h4></Button>
                </div>                
                }   
            </div>
        </Nav>
    )
}

