import './App.css';
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import MovieData from './Pages/MovieDetail';
import PersonDetails from './Pages/PersonDetails';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { hide,login,logout,display  as displayAlert } from "./redux/Store";
import { refreshToken } from './api/api.js';

import cookie from 'react-cookies'
import 'bootstrap/dist/css/bootstrap.min.css'


function useHideAlertAfterDelay(){

  const dispatch = useDispatch()
  const display = useSelector(state => state.Alerts.display)

  useEffect(() =>{
      if(display){
          const timeout = setTimeout(() =>{
              dispatch(hide())
          }, 5000)
          return () => {
              clearTimeout(timeout)
          }
      }
  }, [dispatch, display])
}

function AuthContainer (){
  const dispatch = useDispatch()
  useEffect(() =>{
      const refreshToken = cookie.load('Refresh Token')
      if(refreshToken){
          dispatch(login())
      }
      else{
          dispatch(logout())
      }
  },[dispatch])


}

function RefreshTokenContainer(){
  const loggedIn = useSelector(state => state.Auth.loggedIn)
  const dispatch = useDispatch()
  useEffect(() =>{
      const interval = setInterval(() =>{
          refreshToken(cookie.load('Refresh Token'))
          .then(res =>{
              if(!res.error){
                  cookie.save('Refresh Token', res.refreshToken.token)
                  cookie.save('Bearer Token', res.bearerToken.token)
              }
              else{
                  cookie.remove('Bearer Token')
                  cookie.remove('Refresh Token')
                  if(loggedIn){
                      dispatch(displayAlert({ message: "Login Expired",variant: "danger"}))
                      dispatch(logout())
                  }
              }
          })
      }, 5 * 60 * 1000)
      
      return () => clearInterval(interval);
  },[dispatch,loggedIn])
}
function App() {

  AuthContainer()
  RefreshTokenContainer()
  useHideAlertAfterDelay()

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' exact Component={Home}></Route>
      <Route path='/movies' exact Component={Movies}></Route>
      <Route path='/movie/data/:id' exact Component={MovieData}></Route>
      <Route path='/movie/person/:id' exact Component={PersonDetails}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
