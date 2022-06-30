import React from 'react'
import { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext';


function FeedbackForm() {
  const [text, setText] = useState('')
  const [btnDisabled, setbtnDisabled] = useState(true)
  const [message, setmessage] = useState('')
  const [rating, setRating] = useState(10)

  const { addFeedback, feedbackEdit , updateFeedback} = useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setbtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])
  // [] 這裡有放東西 代表 有東西才會執行此callback function
  // 沒東西則網頁一開直就執行

  

  // 輸入匡處理 判斷字數及按鈕狀態
  const handleTextChange = (e) => {
    if (text === '') {
      setbtnDisabled(true)
      setmessage(null)
    } else if ( text !== '' && text.trim().length <= 10) {
      setmessage('Text must be at least 10 characters')
      setbtnDisabled(true)
    } else {
      setmessage(null)
      setbtnDisabled(false)
    }
    setText(e.target.value);
  }
  // 送出處理
  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating
      }
      if (feedbackEdit.edit === true) {
        console.log('feedbackEdit', feedbackEdit)
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }
      
      // setbtnDisabled(true)
      // setRating(10)
      // 送出後 清空
      setText('')
    }

  }
  
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate ?</h2>
        <RatingSelect select={(rating) => setRating(rating)}/>
        <div className="input-group">
          <input 
            onChange={handleTextChange} 
            type="text" 
            placeholder='Write a review'
            value={text} 
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm