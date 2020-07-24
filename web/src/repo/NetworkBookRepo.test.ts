import NetworkBookRepo from './NetworkBookRepo'
import FetchWrapper from './FetchWrapper'
import Book from '../dto/Book'

class SpyFetchWrapper implements FetchWrapper {
  fetchJson_arg_path: string = ""
  fetchJson_arg_options: any = {}

  fetchJson(path: string, options: {}): Promise<any> {
    this.fetchJson_arg_path = path
    this.fetchJson_arg_options = options

    return Promise.resolve([]);
  }
}

class StubFetchWrapper implements FetchWrapper {
  fetchJson(path: string, options: {}): Promise<any> {
    return Promise.resolve([new Book('Book 1')]);
  }
}

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
      expect(books[0]).toEqual(new Book('Book 1'))
    })
  })
})