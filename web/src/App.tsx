import React from 'react'
import './App.css'
import BookList from './book/BookList'
import BrowserFetchWrapper from './repo/BrowserFetchWrapper'
import NetworkBookRepo from './repo/NetworkBookRepo'
import Login from './login/Login'
import NetworkAuthRepo from './repo/NetworkAuthRepo'
import DefaultMBRouter from './router/DefaultMBRouter'
import {Route, Router, Switch} from 'react-router-dom'
import {createBrowserHistory, History, LocationState} from 'history'

function App() {
  const browserHistory: History<LocationState> = createBrowserHistory()
  const mbRouter = new DefaultMBRouter(browserHistory)

  const fetchWrapper = new BrowserFetchWrapper()
  const bookRepo = new NetworkBookRepo(fetchWrapper)
  const authRepo = new NetworkAuthRepo(fetchWrapper)

  return (
    <div className='App'>
      <Router history={browserHistory}>
        <Switch>
          <Route path='/login'>
            <Login repo={authRepo} router={mbRouter}/>
          </Route>
          <Route path='/books'>
            <BookList repo={bookRepo} authRepo={authRepo} router={mbRouter}/>
          </Route>
          <Route path='/'>
            <BookList repo={bookRepo} authRepo={authRepo} router={mbRouter}/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
