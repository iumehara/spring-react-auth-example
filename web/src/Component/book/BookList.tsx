import React, {useEffect, useState} from 'react'
import BookRepo from '../../Service/repo/book/BookRepo'
import BookDto from '../../DTO/BookDto'
import MBRouter from '../../Service/router/MBRouter'

type BookListProps = {
  repo: BookRepo,
  router: MBRouter
}

function BookList(props: BookListProps) {
  const [books, setBooks] = useState(Array<BookDto>())

  useEffect(() => {
    props.repo.getAll()
      .then(books => setBooks(books))
  }, [props.repo])

  return (
    <div>
      {
        books.map((book, i) => <BookView key={i} book={book}/>)
      }
    </div>
  )
}

type BookViewProps = {
  book: BookDto
}

const BookView = (props: BookViewProps) => (
  <div>
    <div className='title'>{props.book.title}</div>
  </div>
)


export default BookList