import NetworkBookRepo from './NetworkBookRepo'
import BookDto from '../../../DTO/BookDto'
import {SpyRestClient, StubRestClient} from '../restclient/RestClientDoubles'
import NewBookDto from '../../../DTO/NewBookDto'
import IntDto from '../../../DTO/IntDto'

describe('NetworkBookRepo', () => {
  describe('getAll', () => {
    test('makes correct request', () => {
      const fetchWrapper = new SpyRestClient()
      const repo = new NetworkBookRepo(fetchWrapper)

      repo.getAll()

      expect(fetchWrapper.fetchJson_arg_path[0]).toEqual('/books')
      expect(fetchWrapper.fetchJson_arg_options[0]).toEqual({credentials: 'include', method: 'GET'})
    })

    test('handles response', async () => {
      const fetchWrapper = new StubRestClient()
      const repo = new NetworkBookRepo(fetchWrapper)

      const books = await repo.getAll()

      expect(books.length).toEqual(1)
      expect(books[0]).toEqual(new BookDto('BookDto 1'))
    })
  })

  describe('create', () => {
    test('makes correct request', () => {
      const fetchWrapper = new SpyRestClient()
      const repo = new NetworkBookRepo(fetchWrapper)

      repo.create(new NewBookDto('new book'))

      expect(fetchWrapper.fetchJson_arg_path[0]).toEqual('/books')
      const expectedOptions = {
        credentials: 'include',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: '{\"title\":\"new book\"}'
      }
      expect(fetchWrapper.fetchJson_arg_options[0]).toEqual(expectedOptions)
    })

    test('handles response', async () => {
      const fetchWrapper = new StubRestClient()
      fetchWrapper.fetchJson_response = new IntDto(1)
      const repo = new NetworkBookRepo(fetchWrapper)

      const bookId = await repo.create(new NewBookDto('new book'))

      expect(bookId).toEqual(new IntDto(1))
    })
  })
})