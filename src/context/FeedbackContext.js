import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  // fetch feedback
  const fetchFeedback = async () => {
    // 最新的往下排序
    const response = await fetch(
      `/feedback?_sort=id&_order=desc`
    )
    const data = await response.json()
    setFeedback(data)
    setIsLoading(false)
  }


  // delete item  
  const deleteFeedback = async (id) => {
    console.log(id)
    if (window.confirm('確定要刪除？')) {
      await fetch(`/feedback/${id}`, { method:'DELETE' })

      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Update feedback item
  const updateFeedback = async (id, updItem) => {
    console.log('updItem',updItem)
    console.log('id',id)
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    })
  
    const data = await response.json()
    console.log('data', data)
    // NOTE: no need to spread data and item
    // 
    setFeedback(feedback.map((item) => (item.id === id ? {...item, ...data} : item)))
    // setFeedback(feedback.map((item) => (item.id === id ? data : item)))

    // FIX: this fixes being able to add a feedback after editing
    setFeedbackEdit({
      item: {},
      edit: false,
    })
  }
  

  // set item to edit
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit:true
    })
  }

  // Add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json()

    setFeedback([data, ...feedback])
    // [data, ...feedback] 新資料加上舊資料 全部放進list()
  }


  return <FeedbackContext.Provider 
  value={{
    feedback,
    isLoading,
    feedbackEdit,
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedback
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext