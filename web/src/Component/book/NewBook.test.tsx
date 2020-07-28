import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import NewBook from './NewBook'
import BookRepo from '../../Service/repo/book/BookRepo'
import NewBookDto from '../../DTO/NewBookDto'
import IntDto from '../../DTO/IntDto'
import BookDto from '../../DTO/BookDto'
import {SpyMBRouter} from '../../Service/router/MBRouterDoubles'
import userEvent from '@testing-library/user-event'

class SpyBookRepo implements BookRepo {
  getAll_wasCalled = false
  create_arg_newBook: NewBookDto | null = null

  getAll(): Promise<BookDto[]> {
    this.getAll_wasCalled = true
    return Promise.resolve([new BookDto('book')])
  }

  create(newBook: NewBookDto): Promise<IntDto> {
    this.create_arg_newBook = newBook
    return Promise.resolve(new IntDto(1));
  }
}

describe('NewBook', () => {
  test('submits data from form and redirect to book list page', async() => {
    const spyBookRepo = new SpyBookRepo()
    const router = new SpyMBRouter()
    const renderedNewBook = render(<NewBook repo={spyBookRepo} router={router}/>)

    const titleInput = renderedNewBook.container.querySelector('.title input')!
    fireEvent.change(titleInput, {target: { value: 'Huckleberry Finn'}})

    const submitButton = renderedNewBook.container.querySelector('button')!
    await userEvent.click(submitButton)

    expect(spyBookRepo.create_arg_newBook).toEqual(new NewBookDto('Huckleberry Finn'))
    expect(router.goToBookListPage_wasCalled).toBe(true)
  })
})