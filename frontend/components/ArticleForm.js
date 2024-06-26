import React, { useEffect, useState } from 'react'
import PT from 'prop-types'
import { NavLink, Routes, Route, useNavigate, useSearchParams } from 'react-router-dom'
import Spinner from './Spinner'



const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props){
  const [values, setValues] = useState(initialFormValues)
  // ✨ where are my props? Destructure them here
  const navigate = useNavigate();
  const [TextMe, setTextMe] = useState("Create Article")
    var title = " Enter tdsfdfsfssdtle"
const {postArticle,
  updateArticle,
  setCurrentArticleId,
  currentArticle} = props

useEffect(() => {
if (currentArticle){
  setValues(currentArticle)       
  setTextMe("Edit Article")
console.log("articleform")
}
else {
console.log("here")
setTextMe("Create Article")
  setValues(initialFormValues)
}
},[currentArticle])

    // ✨ implement
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.



const onChange = evt => {
  const { id, value } = evt.target
  setValues({ ...values, [id]: value })

}
  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.

  if (currentArticle){
    isDisabled(true)
    if (values.title.trim().length >=1 && values.text.trim().length>=1 && values.topic.length >=1){
    updateArticle(currentArticle.article_id, values)
    setValues(initialFormValues)}
    isDisabled(true)
  
  }   
if (! currentArticle){
  isDisabled(true)
    postArticle(values)
    setValues(initialFormValues)
    setTextMe("Create Article")
    isDisabled(true)
}else {
setValues(initialFormValues)
setTextMe("Create Article")
isDisabled(true)
}
 }
  const cancel = evt =>{
    
    evt.preventDefault()
    setValues(initialFormValues)
    setTextMe("Create Article")
  }
  const isDisabled = () => {
    // ✨ implement
    // Make sure the inputs have some values
    if (values.title.trim().length >=1 && values.text.trim().length>=1 && values.topic.length >=1){
      return false;
    }
    else {return true}

  }

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={onSubmit}>
      <h2>{TextMe}</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
        <button disabled={isDisabled()} onClick={() => {cancel}}>Cancel edit</button>
      </div>
    </form>
  )
}

// 🔥 No touchy: ArticleForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle:
   PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
  
}