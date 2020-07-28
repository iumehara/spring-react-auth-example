import BookRepo from '../../Service/repo/book/BookRepo'
import MBRouter from '../../Service/router/MBRouter'
import React, {FormEvent, useState} from 'react'
import NewBookDto from '../../DTO/NewBookDto'

type NewBookProps = {
  repo: BookRepo
  router: MBRouter
}

function NewBook(props: NewBookProps) {
  const [title, setTitle] = useState()

  const formSubmitted = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    props.repo.create(new NewBookDto(title))
      .then(() => props.router.goToBookListPage())
  }

  return (
    <div className='NewBook'>
      <form onSubmit={e => formSubmitted(e)}>
        <div className='title'>
          <label>title</label>
          <input type='text' onChange={e => setTitle(e.target.value)}/>
        </div>
        <button type='submit'>CREATE</button>
      </form>
    </div>
  )
}

export default NewBook