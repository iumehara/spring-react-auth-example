import BookDto from '../../../DTO/BookDto'
import NewBookDto from '../../../DTO/NewBookDto'
import IntDto from '../../../DTO/IntDto'

interface BookRepo {
  getAll(): Promise<BookDto[]>

  create(newBook: NewBookDto): Promise<IntDto>
}

export default BookRepo