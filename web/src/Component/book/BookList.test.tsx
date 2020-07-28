import BookRepo from '../../Service/repo/book/BookRepo'
import BookDto from '../../DTO/BookDto'
import {render, waitForElement} from '@testing-library/react'
import BookList from './BookList'
import React from 'react'
import {SpyMBRouter} from '../../Service/router/MBRouterDoubles'
import NewBookDto from '../../DTO/NewBookDto'
import IntDto from '../../DTO/IntDto'
import userEvent from '@testing-library/user-event'

class StubBookRepo implements BookRepo {
  getAll_returnValue = Promise.resolve(
    [new BookDto('Moby Dick'),
      new BookDto('To Kill a Mockingbird')]
  )

  getAll(): Promise<BookDto[]> {
    return this.getAll_returnValue
  }

  create(newBook: NewBookDto): Promise<IntDto> {
    return Promise.resolve(new IntDto(1))
  }
}

describe('BookList', () => {
  it('displays books on load', async () => {
    const repo = new StubBookRepo()


    const renderedBookList = render(<BookList repo={repo} router={new SpyMBRouter()}/>)
    await waitForElement(() => renderedBookList.getByText('Moby Dick'))


    const titles = renderedBookList.container.querySelectorAll('.BookView .title')
    expect(titles.item(0)).toHaveTextContent('Moby Dick')
    expect(titles.item(1)).toHaveTextContent('To Kill a Mockingbird')
  })

  it('redirects to login page if books are not loaded', async () => {
    const repo = new StubBookRepo()
    repo.getAll_returnValue = Promise.reject('could not load books')
    const router = new SpyMBRouter()


    const renderedBookList = render(<BookList repo={repo} router={router}/>)
    await waitForElement(() => renderedBookList.getByText('Books'))


    expect(router.goToLoginPage_wasCalled).toBe(true)
  })

  it('redirects to new book page if button is clicked', async () => {
    const repo = new StubBookRepo()
    const router = new SpyMBRouter()
    const renderedBookList = render(<BookList repo={repo} router={router}/>)
    await waitForElement(() => renderedBookList.getByText('Moby Dick'))


    const addbutton = renderedBookList.container.querySelector('button.add')!
    await userEvent.click(addbutton)


    expect(router.goToNewBookPage_wasCalled).toBe(true)
  })
})