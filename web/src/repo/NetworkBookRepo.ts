import BookRepo from './BookRepo'
import Book from '../dto/Book'
import FetchWrapper from './FetchWrapper'
import HttpMethod from './HttpMethod'

class NetworkBookRepo implements BookRepo {
  private fetchWrapper: FetchWrapper

  constructor(fetchWrapper: FetchWrapper) {
    this.fetchWrapper = fetchWrapper
  }

  getAll(): Promise<Book[]> {
    const options = {
      method: HttpMethod.GET,
      credentials: 'include'
    }

    return this.fetchWrapper.fetchJson('/books', options)
  }
}

export default NetworkBookRepo
