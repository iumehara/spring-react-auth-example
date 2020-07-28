import BookRepo from './BookRepo'
import BookDto from '../../../DTO/BookDto'
import FetchWrapper from '../fetch/FetchWrapper'
import HttpMethod from '../fetch/HttpMethod'
import NewBookDto from '../../../DTO/NewBookDto'
import IntDto from '../../../DTO/IntDto'

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

  create(newBook: NewBookDto): Promise<IntDto> {
    const path = '/books'
    const options = {
      method: HttpMethod.POST,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBook)
    }

    return this.fetchWrapper
      .fetchJson(path, options)
  }
}

export default NetworkBookRepo
