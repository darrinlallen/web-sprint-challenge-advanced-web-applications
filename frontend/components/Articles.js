import React, { useEffect , useState} from 'react'
import axiosWithAuth from '../axios/index'
import { Navigate } from 'react-router-dom'
import PT from 'prop-types'

export default function Articles({articles2, getArticles, deleteArticle, 
  setCurrentArticleId, currentArticleId} ) {
  // ✨ where are my props? Destructure them here

  // ✨ implement conditional logic: if no token exists
  // we should render a Navigate to login screen (React Router v.6)
    const [articles, setArticles] = useState([])
  


      const token = localStorage.getItem('token');

      if (!token){
   return <Navigate to="/" />
    }
    
      useEffect(() => {
    const arts = async () =>{
      try{ 
    
    const response = await axiosWithAuth().
    get(`http://localhost:9000/api/articles`)
    .then(response => {
      setArticles(response.data.articles)});
      } 
      catch(err){
       console.log("llllllllllllllllllllll")
      }
  }
  arts()    
  })
    
const editMe = (ids, title , text, topic) =>{

  setArticles([ids, title, text,topic])
console.log({articles})
 
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
                  <button disabled={false} onClick={() => editMe(art.article_id, 
                  art.title, art.text, art.topic)}>Edit</button>
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