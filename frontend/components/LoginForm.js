import PT from 'prop-types'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useState } from 'react'

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  const [values, setValues] = useState(initialFormValues)
  // ✨ where are my props? Destructure them here
  const navigate = useNavigate();
  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
    console.log("articles")

    login(values)
      }

  const isDisabled = () => {
    // ✨ implement
    // Trimmed username must be >= 3, and
    // trimmed password must be >= 8 for
    // the button to become enabled
    if (values.username.trim().length >=3 && values.password.trim().length >=8){
      return false
    } else
    { return true}
  }
  const login = ({ username, password }) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
    setMessage("");
    setSpinnerOn(true);
    axios.post('http://localhost:9000/api/login', values)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      setMessage(`Here are your articles, ${username}!`)
      setSpinnerOn(false);
console.log(res.token)
      navigate ("/articles")

    })
  }
  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
