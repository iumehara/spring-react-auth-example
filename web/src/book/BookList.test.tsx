import BookRepo from '../repo/BookRepo'
import Book from '../dto/Book'
import {render, waitForElement} from '@testing-library/react'
import BookList from './BookList'
import React from 'react'

class StubBookRepo implements BookRepo {
  getAll(): Promise<Book[]> {
    return Promise.resolve(
      [new Book('Moby Dick'),
        new Book('To Kill a Mockingbird')]
    )
  }
}

describe('BookList', () => {
  it('', async () => {
    const repo = new StubBookRepo()

    const renderedBookList = render(<BookList repo={repo}/>)
    await waitForElement(() => renderedBookList.getByText('Moby Dick'))

    const titles = renderedBookList.container.querySelectorAll('.title')
    expect(titles.item(0)).toHaveTextContent('Moby Dick')
    expect(titles.item(1)).toHaveTextContent('To Kill a Mockingbird')
  })
})