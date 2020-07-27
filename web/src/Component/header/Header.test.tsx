import React from 'react'
import {render, waitForElement} from '@testing-library/react'
import AuthRepo from '../../Service/repo/AuthRepo'
import UserDto from '../../DTO/UserDto'
import BooleanDto from '../../DTO/BooleanDto'
import Header from './Header'
import userEvent from '@testing-library/user-event'
import {SpyMBRouter} from '../../Service/router/MBRouterDoubles'

class StubAuthRepo implements AuthRepo {
  login(username: string, password: string): Promise<UserDto> {
    return Promise.resolve(new UserDto(''));
  }

  currentUsername(): Promise<string> {
    return Promise.resolve('Amy');
  }

  logout(): Promise<BooleanDto> {
    return Promise.resolve(new BooleanDto(true));
  }
}

describe('Header', () => {
  test('displays username', async () => {
    const repo = new StubAuthRepo()
    const router = new SpyMBRouter()


    const renderedHeader = render(
      <Header authRepo={repo} router={router}>
        <div/>
      </Header>
    )
    await waitForElement(() => renderedHeader.getByText('Amy'))


    const usernameDiv = await renderedHeader.container.querySelector('.user-settings .username')
    expect(usernameDiv).toHaveTextContent('Amy')
  })

  test('displays children', async () => {
    const repo = new StubAuthRepo()
    const router = new SpyMBRouter()


    const renderedHeader = render(
      <Header authRepo={repo} router={router}>
        <div className='child'>Child</div>
      </Header>
    )
    await waitForElement(() => renderedHeader.getByText('Child'))


    const childDiv = renderedHeader.container.querySelector('.child')
    expect(childDiv).toHaveTextContent('Child')
  })

  test('logs out', async () => {
    const repo = new StubAuthRepo()
    const router = new SpyMBRouter()


    const renderedHeader = render(
      <Header authRepo={repo} router={router}>
        <div className='child'>Child</div>
      </Header>
    )
    await waitForElement(() => renderedHeader.getByText('Child'))

    await userEvent.click(renderedHeader.container.querySelector('.logout')!)

    expect(router.goToLoginPage_wasCalled).toBe(true)
  })
})
