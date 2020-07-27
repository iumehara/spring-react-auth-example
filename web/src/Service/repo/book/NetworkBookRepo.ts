import BookRepo from './BookRepo'
import BookDto from '../../../DTO/BookDto'
import FetchWrapper from '../fetch/FetchWrapper'
import HttpMethod from '../fetch/HttpMethod'

class NetworkBookRepo implements BookRepo {
  private fetchWrapper: FetchWrapper

  constructor(fetchWrapper: FetchWrapper) {
    this.fetchWrapper = fetchWrapper
  }

  getAll(): Promise<BookDto[]> {
    const options = {
      method: HttpMethod.GET,
      credentials: 'include'
    }

    return this.fetchWrapper.fetchJson('/books', options)
  }
}

export default NetworkBookRepo
