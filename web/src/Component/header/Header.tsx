import React, {useEffect, useState} from 'react'
import './Header.scss'
import AuthRepo from '../../Service/repo/auth/AuthRepo'
import MBRouter from '../../Service/router/MBRouter'

type HeaderProps = {
  children: React.ReactNode,
  authRepo: AuthRepo,
  router: MBRouter
}

function Header(props: HeaderProps) {
  const [username, setUsername] = useState()

  useEffect(() => {
    props.authRepo.currentUsername()
      .then((username) => setUsername(username))
      .catch(() => props.router.goToLoginPage())
  }, [props.authRepo, props.router])

  const logoutClicked = () => {
    props.authRepo.logout()
      .then(() => props.router.goToLoginPage())
  }

  if (username === undefined) {
    return <div className='empty-header'/>
  }

  return (
    <div>
      <div className='Header'>
        <div className='title'>MyBooks</div>
        <div className='user-settings'>
          <div className='username'>{username}</div>
          <div className='logout' onClick={() => logoutClicked()}>
            Log Out
          </div>
        </div>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default Header