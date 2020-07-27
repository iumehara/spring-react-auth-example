import React, {FormEvent, useState} from 'react'
import AuthRepo from '../repo/AuthRepo'
import MBRouter from '../router/MBRouter'
import './Login.scss'

type LoginProps = {
  repo: AuthRepo,
  router: MBRouter
}

function Login(props: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const formSubmitted = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    props.repo.login(username, password)
      .then(user => props.router.goToBookListPage())
  }

  return (
    <div className='Login'>
      <div className='header'>MyBooks</div>
      <form onSubmit={e => formSubmitted(e)}>
        <div className='content'>
        <div className='title'>Login</div>
        <div className='field username'>
          <label htmlFor='username'>Username</label>
          <input id='username' type='text' onChange={e => setUsername(e.target.value)}/>
        </div>
        <div className='field password'>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' onChange={e => setPassword(e.target.value)}/>
        </div>
        <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login