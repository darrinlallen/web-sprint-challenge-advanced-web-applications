import React, { useEffect , useState} from 'react'
import axiosWithAuth from '../axios/index'
import { Navigate, useNavigate } from 'react-router-dom'
import PT from 'prop-types'
import Message from './Message'







export default function Articles (props) {
  // ✨ where are my props? Destructure them here
    const {articles, getArticles, deleteArticle, 
      setCurrentArticleId, currentArticleId} = props
  // ✨ implement conditional logic: if no token exists
  // we should render a Navigate to login screen (React Router v.6)
 //   const [articles, setArticles] = useState([])
    const [spinnerOn, setSpinnerOn] = useState(false)
    const navigate = useNavigate();
    const [message, setMessage] = useState('')
    const [articles2, setArticles2] = useState([])
    var setArt_id  = null;
     var setArt = {}
      const token = localStorage.getItem('token');

      if (!token){
   return <Navigate to="/" />
    }
  else {
    getArticles()
  }
  

  



  function editMe(id1){
    setCurrentArticleId(id1)

}



  return (
    // ✨ fix the JSX: replace `Function.prototype` with actual functions
    // and use the articles prop to generate articles
    <div className="articles">
      <h2>Articles</h2>
      
      {
         articles.map(art => {
            return (
              <div className="article" key={art.article_id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Topic: {art.topic}</p>
                </div>
                <div>
                  <button disabled={false} onClick={() => editMe(art.article_id)}>Edit</button>
                  <button disabled={false} onClick={() => deleteArticle(art.article_id)}>Delete</button>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

// 🔥 No touchy: Articles expects the following props exactly:
Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({ // the array can be empty
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // can be undefined or null
}