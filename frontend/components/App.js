import React, { useState, useEffect } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axios from 'axios'
import axiosWithAuth from '../axios'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [currentArticle, setCurrentArticle] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { /* ✨ implement */ }
  const redirectToArticles = () => { /* ✨ implement */ }

  const logout  = (props) => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    localStorage.clear()
    setMessage(`Goodbye!`)
    console.log("goodbye")
    navigate('/')
  }
  
  const login = async ( username, password ) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
    setSpinnerOn(true);
   await axios.post('http://localhost:9000/api/login', username, password)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      setMessage(`Here are your articles, ${username.username}!`)
      setSpinnerOn(false);
     navigate ("/articles")

    })
  }
const getArticles = () =>{

  setMessage("");
  setSpinnerOn(true);
  axiosWithAuth().
  get(`http://localhost:9000/api/articles`)
  .then(res => {

    setArticles(res.data.articles)
    setMessage(res.data.message)
    setSpinnerOn(false);
console.log(res.token)

  }).catch(err => {
    if(err == 401){
      localStorage.clear()
      navigate ('/')
      setSpinnerOn(false)
    }
  })
}

  const postArticle = (article) => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
    setMessage("");
    setSpinnerOn(true);
    axiosWithAuth().
    post(`http://localhost:9000/api/articles`, article)
    .then(res => {
  
      getArticles()
      setMessage(res.data.message)
      setSpinnerOn(false);
  console.log(res.token)
     navigate ("/articles")
    }).catch(err => {
      if(err == 401){
        localStorage.clear()
        navigate ('/')
        setSpinnerOn(false)
      
      }
    })
    
  }

  const updateArticle = ( art_id, art) => {
    // ✨ implement
    // You got this!
    axiosWithAuth().
    put(`http://localhost:9000/api/articles`,  art_id, art)
    .then(res => {
  setSpinnerOn(true)
      setMessage(res.data.message)
      setSpinnerOn(false);
  console.log(res.token)
     navigate ("/articles")
  })
  }

  const deleteArticle = (article_id) => {

    // ✨ implement
    setSpinnerOn(true)
    axiosWithAuth().
    delete(`http://localhost:9000/api/articles/${article_id}`)
    .then(res => {
  setSpinnerOn(true)
      setMessage(res.data.message)
      setSpinnerOn(false);
  console.log(res.token)
     navigate ("/articles")
  })
}

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn}/>
      <Message message={message}/>
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login}/>} />
          <Route path="articles" element={
            <>
              <ArticleForm  postArticle = {postArticle} updateArticle = {updateArticle}
  setCurrentArticleId ={setCurrentArticleId} currentArticle={currentArticle}/>
              
              <Articles articles={articles} getArticles= {getArticles} deleteArticle={deleteArticle}
              setCurrentArticleId={setCurrentArticleId} />
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}