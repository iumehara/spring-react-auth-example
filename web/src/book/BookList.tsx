import React, {useEffect, useState} from 'react'
import BookRepo from '../repo/BookRepo'
import Book from '../dto/Book'

type BookListProps = {
  repo: BookRepo
}

function BookList(props: BookListProps) {
  const [books, setBooks] = useState(Array<Book>())

  useEffect(() => {
    props.repo.getAll()
      .then(books => setBooks(books))
  }, [props.repo])

  return (
    <div>
      <h1>MyBooks</h1>

      <div>
        {
          books.map((book, i) => <BookView key={i} book={book}/>)
        }
      </div>
    </div>
  )
}

type BookViewProps = {
  book: Book
}

const BookView = (props: BookViewProps) => (
  <div>
    <div className='title'>{props.book.title}</div>
  </div>
)


export default BookList