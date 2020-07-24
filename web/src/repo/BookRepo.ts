import BookDto from '../dto/BookDto'

interface BookRepo {
  getAll(): Promise<BookDto[]>
}

export default BookRepo