import BookRepo from '../../Service/repo/BookRepo'
import BookDto from '../../DTO/BookDto'
import {render, waitForElement} from '@testing-library/react'
import BookList from './BookList'
import React from 'react'
import {SpyMBRouter} from '../../Service/router/MBRouterDoubles'

class StubBookRepo implements BookRepo {
  getAll(): Promise<BookDto[]> {
    return Promise.resolve(
      [new BookDto('Moby Dick'),
        new BookDto('To Kill a Mockingbird')]
    )
  }
}

describe('BookList', () => {
  it('displays books on load', async () => {
    const repo = new StubBookRepo()

    const renderedBookList = render(<BookList repo={repo} router={new SpyMBRouter()}/>)
    await waitForElement(() => renderedBookList.getByText('Moby Dick'))

    const titles = renderedBookList.container.querySelectorAll('.title')
    expect(titles.item(0)).toHaveTextContent('Moby Dick')
    expect(titles.item(1)).toHaveTextContent('To Kill a Mockingbird')
  })
})