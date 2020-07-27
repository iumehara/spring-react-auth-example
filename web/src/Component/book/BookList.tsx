import React, {useEffect, useState} from 'react'
import BookRepo from '../../Service/repo/BookRepo'
import BookDto from '../../DTO/BookDto'
import AuthRepo from '../../Service/repo/AuthRepo'
import MBRouter from '../../Service/router/MBRouter'

type BookListProps = {
  repo: BookRepo,
  authRepo: AuthRepo,
  router: MBRouter
}

function BookList(props: BookListProps) {
  const [books, setBooks] = useState(Array<BookDto>())

  useEffect(() => {
    props.repo.getAll()
      .then(books => setBooks(books))
  }, [props.repo])

  const logoutClicked = () => {
    props.authRepo.logout()
      .then(response => props.router.goToLoginPage())
  }

  return (
    <div>
      <div onClick={() => logoutClicked()}>logout</div>
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
  book: BookDto
}

const BookView = (props: BookViewProps) => (
  <div>
    <div className='title'>{props.book.title}</div>
  </div>
)


export default BookList