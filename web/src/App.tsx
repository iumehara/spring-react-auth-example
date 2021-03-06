import React from 'react'
import './App.scss'
import BookList from './Component/book/BookList'
import NetworkRestClient from './Service/repo/restclient/NetworkRestClient'
import NetworkBookRepo from './Service/repo/book/NetworkBookRepo'
import Login from './Component/login/Login'
import NetworkAuthRepo from './Service/repo/auth/NetworkAuthRepo'
import DefaultMBRouter from './Service/router/DefaultMBRouter'
import {Route, Router, Switch} from 'react-router-dom'
import {createBrowserHistory, History, LocationState} from 'history'
import LocalStorageRepo from './Service/repo/auth/LocalStorageRepo'
import Header from './Component/header/Header'
import NewBook from './Component/book/NewBook'
import BrowserFetchWrapper from './Service/wrapper/BrowserFetchWrapper'
import BrowserDocumentWrapper from './Service/wrapper/BrowserDocumentWrapper'

function App() {
  const browserHistory: History<LocationState> = createBrowserHistory()
  const mbRouter = new DefaultMBRouter(browserHistory)
  const restClient = new NetworkRestClient(new BrowserFetchWrapper(), new BrowserDocumentWrapper())
  const bookRepo = new NetworkBookRepo(restClient)

  const localStorageRepo = new LocalStorageRepo()
  const authRepo = new NetworkAuthRepo(restClient, localStorageRepo)

  return (
    <div className='App'>
      <Router history={browserHistory}>
        <Switch>
          <Route path='/login'>
            <Login repo={authRepo} router={mbRouter}/>
          </Route>
          <Route path='/books/new'>
            <Header authRepo={authRepo} router={mbRouter}>
              <NewBook repo={bookRepo} router={mbRouter}/>
            </Header>
          </Route>
          <Route path='/books'>
            <Header authRepo={authRepo} router={mbRouter}>
              <BookList repo={bookRepo} router={mbRouter}/>
            </Header>
          </Route>
          <Route path='/'>
            <Header authRepo={authRepo} router={mbRouter}>
              <BookList repo={bookRepo} router={mbRouter}/>
            </Header>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
