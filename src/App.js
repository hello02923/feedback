import React from 'react'
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import AboutIconLink from './components/AboutIconLink'
import AboutPage from './pages/AboutPage'
// 不是default export 所以要加{}在外
import { FeedbackProvider } from './context/FeedbackContext'

function App() {

    return (
      <FeedbackProvider>
        <Router>
          <Header />
            <div className='contaimer'>
              <Routes>
              <Route exact path='/' element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              }>
              </Route>
              <Route path='/about' element={<AboutPage />} />
              </Routes>
              <AboutIconLink />
            </div>
        </Router> 
      </FeedbackProvider>
    )
}

export default App;