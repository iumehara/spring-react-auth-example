import React from 'react'
import {render, waitForElement} from '@testing-library/react'
import Header from './Header'
import userEvent from '@testing-library/user-event'
import {SpyMBRouter} from '../../Service/router/MBRouterDoubles'
import {StubAuthRepo} from '../../Service/repo/auth/AuthRepoDoubles'

describe('Header', () => {
  test('title redirects to book list page', async() => {
    const repo = new StubAuthRepo()
    const router = new SpyMBRouter()
    const renderedHeader = render(
      <Header authRepo={repo} router={router}>
        <div/>
      </Header>
    )
    await waitForElement(() => renderedHeader.getByText('Amy'))


    await userEvent.click(renderedHeader.container.querySelector('.title')!)


    expect(router.goToBookListPage_wasCalled).toBe(true)
  })

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

  test('displays children if logged in', async () => {
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

  test('does not display children if logged out', () => {
    const repo = new StubAuthRepo()
    repo.currentUsername_returnValue = Promise.reject('')
    const router = new SpyMBRouter()


    const renderedHeader = render(
      <Header authRepo={repo} router={router}>
        <div className='child'>Child</div>
      </Header>
    )

    const emptyHeader = renderedHeader.container.querySelector('.empty-header')
    expect(emptyHeader).toBeInTheDocument()
    const childDiv = renderedHeader.container.querySelector('.child')
    expect(childDiv).not.toBeInTheDocument()
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

  test('redirects to login page if not logged in', async() => {
    const repo = new StubAuthRepo()
    repo.currentUsername_returnValue = Promise.reject('not logged in')
    const router = new SpyMBRouter()


    const renderedHeader = render(
      <Header authRepo={repo} router={router}>
        <div className='child'>Child</div>
      </Header>
    )
    await waitForElement(() => renderedHeader.container.querySelector('.empty-header'))


    expect(router.goToLoginPage_wasCalled).toBe(true)

  })
})
