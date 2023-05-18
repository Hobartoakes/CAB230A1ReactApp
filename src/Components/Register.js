import React from 'react'
import { useState } from 'react';
import Button from "react-bootstrap/Button";
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { register } from '../api/api.js';
import { Alert, } from 'react-bootstrap';
import { disableRegister ,display} from '../redux/Store';

function Register() {
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false)

  const [showError,setError] = useState(false)
  const [message,setMessage] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    password:"",
    confirm:""
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const validatePassword = () => {
    const regex = /^(?=.*[A-Z]).{8,}$/;
    return regex.test(formData.password);
  }

  const validateConfirm = () => {
    return formData.password === formData.confirm
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      console.log("Not Valid")
      event.stopPropagation();
    } else {

    }
    setValidated(true);

    register(formData)
    .then(res => {
      if(res.error){
        setError(true)
        setMessage(res.message)
      }
      else{
        dispatch(disableRegister())
        dispatch(display({ message: "User created",variant:"success" }))
      }
    })
  };
  return (
    <div>
      <h4>Register Now</h4>

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
            Invalid Email
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
          isInvalid={formData.password && !validatePassword(formData.password)}
          isValid={formData.password && validatePassword(formData.password)}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" className="feedback-message">
            Invalid Password
          </Form.Control.Feedback>
          <Form.Text className="text-dark">
            Password must be at least 8 characters long and contain at least one capital letter.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mt-3 mb-4">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
          required
          type='password' 
          placeholder='Confirm Password'
          name = 'confirm'
          value = {formData.confirm}
          onChange={handleChange}
          isInvalid={formData.confirm && !validateConfirm(formData.confirm)}
          isValid={formData.confirm && validateConfirm(formData.confirm)}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" className="feedback-message">
            Passwords must match
          </Form.Control.Feedback>
        </Form.Group>

        <Button className="text-light" variant="dark"  type='submit'>Register</Button>
      </Form>
    </div>
  )
}

export default Register