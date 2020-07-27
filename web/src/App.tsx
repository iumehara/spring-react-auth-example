import React from 'react'
import './App.scss'
import BookList from './Component/book/BookList'
import BrowserFetchWrapper from './Service/repo/BrowserFetchWrapper'
import NetworkBookRepo from './Service/repo/NetworkBookRepo'
import Login from './Component/login/Login'
import NetworkAuthRepo from './Service/repo/NetworkAuthRepo'
import DefaultMBRouter from './Service/router/DefaultMBRouter'
import {Route, Router, Switch} from 'react-router-dom'
import {createBrowserHistory, History, LocationState} from 'history'
import LocalStorageRepo from './Service/repo/LocalStorageRepo'

function App() {
  const browserHistory: History<LocationState> = createBrowserHistory()
  const mbRouter = new DefaultMBRouter(browserHistory)

  const fetchWrapper = new BrowserFetchWrapper()
  const bookRepo = new NetworkBookRepo(fetchWrapper)

  const localStorageRepo = new LocalStorageRepo()
  const authRepo = new NetworkAuthRepo(fetchWrapper, localStorageRepo)

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
