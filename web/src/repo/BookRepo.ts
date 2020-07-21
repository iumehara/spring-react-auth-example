import Book from '../dto/Book'

interface BookRepo {
  getAll(): Promise<Book[]>
}

export default BookRepo