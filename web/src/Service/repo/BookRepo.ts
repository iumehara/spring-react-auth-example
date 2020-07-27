import BookDto from '../../DTO/BookDto'

interface BookRepo {
  getAll(): Promise<BookDto[]>
}

export default BookRepo