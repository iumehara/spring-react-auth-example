import React, {useEffect, useState} from 'react'
import BookRepo from '../../Service/repo/book/BookRepo'
import BookDto from '../../DTO/BookDto'
import MBRouter from '../../Service/router/MBRouter'
import './BookList.scss'
import bookIcon from './book-icon.svg'

type BookListProps = {
  repo: BookRepo,
  router: MBRouter
}

function BookList(props: BookListProps) {
  const [books, setBooks] = useState(Array<BookDto>())

  useEffect(() => {
    props.repo.getAll()
      .then(books => setBooks(books))
      .catch(() => props.router.goToLoginPage())
  }, [props.repo, props.router])

  const goToNewBookPage = () => {
    props.router.goToNewBookPage()
  }

  return (
    <div className='BookList'>
      <div className='header'>
        <div className='title'>Books</div>
        <button className='add' onClick={() => goToNewBookPage()}>＋</button>
      </div>
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
  <div className='BookView'>
    <img src={bookIcon} alt='book-icon' />
    <div className='content'>
      <div className='title'>{props.book.title}</div>
    </div>
  </div>
)


export default BookList