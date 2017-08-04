import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'
import './App.css'

class Test extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }




  componentDidMount(){
    let booksByCategory = []

    BooksAPI.getAll().then((books) => {
      books.filter((book) => {
        if(booksByCategory[book.shelf]){
           booksByCategory[book.shelf]= booksByCategory[book.shelf].concat([book])
        } else {
          booksByCategory[book.shelf] = []
          booksByCategory[book.shelf].push(book)
        }
      })
      this.setState({books: booksByCategory})
    })
  }

  const booksList = () => {
    let books = this.state.books,
        arr = []
    for(let book in books ){
      arr.push(<ListBooks category="currentlyReading" books={book} />)
    }
    return arr
  }

  render() {

    console.log('is Array' + Array.isArray(books))
    // books.map(book => console.log(book))
    // console.log(books['read'])
    return (
        <Route exact path='/' render={() => (
          <div>
            { booksList() }
          </div>
        )} />
    )
  }
}

export default Test
