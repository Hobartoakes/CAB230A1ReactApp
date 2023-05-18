import React from 'react'
import { useState } from 'react';
import Button from "react-bootstrap/Button";
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { userLogin } from '../api/api.js';
import { Alert, } from 'react-bootstrap';
import { disableLogin,display,login } from '../redux/Store';
import cookie from 'react-cookies'

function Login() {
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false)
  const [showError,setError] = useState(false)
  const [message,setMessage] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password:"",
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
    }
    setValidated(true);

    userLogin(formData)
    .then(res => {

      if(res.error){
        setError(true)
        setMessage(res.message)
      }
      else{
        dispatch(disableLogin())
        dispatch(display({ message: "Login Successful",variant: "success" }))
        cookie.save('Refresh Token', res.refreshToken.token)
        cookie.save('Bearer Token', res.bearerToken.token)
        dispatch(login())

      }
    })
  };

  return (
    <div>
      <h2>Login</h2>
      <Alert show={showError} variant="danger">
      <Alert.Heading>How's it going?!</Alert.Heading>
        {message}
      </Alert>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>

        <Form.Group className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
          required 
          type='email' 
          placeholder='Email'
          name = "email"
          value = {formData.email}
          onChange={handleChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" className="feedback-message">
            Please enter an Email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          required
          type='password' 
          placeholder='Password'
          name = "password"
          value = {formData.password}
          onChange={handleChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" className="feedback-message">
            Please enter a password
          </Form.Control.Feedback>
        </Form.Group>

        <Button type='submit'>OK</Button>
      </Form>
    </div>
  )
}

export default Login