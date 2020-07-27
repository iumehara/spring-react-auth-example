import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Login from './Login'
import AuthRepo from '../../Service/repo/AuthRepo'
import UserDto from '../../DTO/UserDto'
import MBRouter from '../../Service/router/MBRouter'
import userEvent from '@testing-library/user-event'

class SpyAuthRepo implements AuthRepo {
  login_arg_username: string = ''
  login_arg_password: string = ''

  login(username: string, password: string): Promise<UserDto> {
    this.login_arg_username = username
    this.login_arg_password = password

    return Promise.resolve(new UserDto(''));
  }
}

class SpyMBRouter implements MBRouter {
  goToBookListPage_wasCalled = false
  goToLoginPage_wasCalled = false

  goToBookListPage(): void {
    this.goToBookListPage_wasCalled = true
  }

  goToLoginPage(): void {
    this.goToLoginPage_wasCalled = true
  }
}

describe('Login', () => {
  test('submits username and password and redirects', async() => {
    const repo = new SpyAuthRepo()
    const router = new SpyMBRouter()

    const renderedLoginPage = render(<Login repo={repo} router={router}/>)

    const usernameInput = renderedLoginPage.container.querySelector('.username input')!
    fireEvent.change(usernameInput, {target: {value: 'user1'}})

    const passwordInput = renderedLoginPage.container.querySelector('.password input')!
    fireEvent.change(passwordInput, {target: {value: 'secret1'}})

    const submitButton = renderedLoginPage.container.querySelector('button')!
    await userEvent.click(submitButton)

    expect(repo.login_arg_username).toEqual('user1')
    expect(repo.login_arg_password).toEqual('secret1')
    expect(router.goToBookListPage_wasCalled).toBe(true)
  })
})