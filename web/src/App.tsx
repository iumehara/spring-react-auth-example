import React from 'react'
import './App.css'
import BookList from './book/BookList'
import BrowserFetchWrapper from './repo/BrowserFetchWrapper'
import NetworkBookRepo from './repo/NetworkBookRepo'

function App() {
  const fetchWrapper = new BrowserFetchWrapper()
  const bookRepo = new NetworkBookRepo(fetchWrapper)

  return (
    <div className='App'>
      <BookList repo={bookRepo}/>
    </div>
  )
}

export default App
