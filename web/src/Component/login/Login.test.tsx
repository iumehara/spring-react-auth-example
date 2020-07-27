import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import Login from './Login'
import AuthRepo from '../../Service/repo/auth/AuthRepo'
import UserDto from '../../DTO/UserDto'
import userEvent from '@testing-library/user-event'
import BooleanDto from '../../DTO/BooleanDto'
import {SpyMBRouter} from '../../Service/router/MBRouterDoubles'

class SpyAuthRepo implements AuthRepo {
  login_arg_username: string = ''
  login_arg_password: string = ''

  login(username: string, password: string): Promise<UserDto> {
    this.login_arg_username = username
    this.login_arg_password = password

    return Promise.resolve(new UserDto(''));
  }

  currentUsername(): Promise<string> {
    return Promise.resolve('');
  }

  logout(): Promise<BooleanDto> {
    return Promise.resolve(new BooleanDto(true));
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