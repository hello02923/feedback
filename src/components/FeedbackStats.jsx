import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'
function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext)
  // Calcaulate ratings avg
  // 加總後/數量
  // let average = 
  //   feedback.reduce((acc, cur) => {
  //       return acc + cur.rating
  //   }, 0) / feedback.length
  
  //   //小數點第一位
  // average = average.toFixed(1).replace(/[.,]0$/,'')
  const average = Math.round(
    feedback.reduce((acc, { rating }) => acc + rating, 0) / feedback.length
  )
  
  return (
    <div className="feedback-stats">
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Rating: {isNaN(average) ? 0 :average}</h4>
    </div>
  )
}

export default FeedbackStats