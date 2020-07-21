import BookRepo from './BookRepo'
import Book from '../dto/Book'
import FetchWrapper from './FetchWrapper'

class NetworkBookRepo implements BookRepo {
  private fetchWrapper: FetchWrapper

  constructor(fetchWrapper: FetchWrapper) {
    this.fetchWrapper = fetchWrapper
  }

  getAll(): Promise<Book[]> {
    return this.fetchWrapper.fetchJson('/books', {})
  }
}

export default NetworkBookRepo
