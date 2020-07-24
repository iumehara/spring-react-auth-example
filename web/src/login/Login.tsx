import React, {FormEvent, useState} from 'react'
import AuthRepo from '../repo/AuthRepo'
import MBRouter from '../router/MBRouter'

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
    <form onSubmit={e => formSubmitted(e)}>
      <div className='username'>
        <div>username</div>
        <input onChange={e => setUsername(e.target.value)}/>
      </div>
      <div className='password'>
        <div>password</div>
        <input type='password' onChange={e => setPassword(e.target.value)}/>
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login