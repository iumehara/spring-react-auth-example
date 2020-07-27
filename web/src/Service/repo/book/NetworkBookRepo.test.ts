import NetworkBookRepo from './NetworkBookRepo'
import BookDto from '../../../DTO/BookDto'
import {SpyFetchWrapper, StubFetchWrapper} from '../fetch/FetchWrapperDoubles'


describe('NetworkBookRepo', () => {
  describe('getAll', () => {
    test('makes correct request', () => {
      const fetchWrapper = new SpyFetchWrapper()
      const repo = new NetworkBookRepo(fetchWrapper)


      repo.getAll()


      expect(fetchWrapper.fetchJson_arg_path).toEqual('/books')
      expect(fetchWrapper.fetchJson_arg_options).toEqual({credentials: 'include', method: 'GET'})
    })

    test('handles response', async () => {
      const fetchWrapper = new StubFetchWrapper()
      const repo = new NetworkBookRepo(fetchWrapper)


      const books = await repo.getAll()


      expect(books.length).toEqual(1)
      expect(books[0]).toEqual(new BookDto('BookDto 1'))
    })
  })
})