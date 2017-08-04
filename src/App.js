import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  updateBookShelf = (book, shelf) => {
    book.shelf = shelf
    this.setState( state => ({
      books: state.books.filter( b => b.id !== book.id).concat([book])
    }))
  }

  filterBooksBy = (bookList = [], filterBy) => {
    return bookList.filter( book => book.shelf === filterBy)
  }
  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  render() {
    const books = this.state.books,
          currentlyReading = this.filterBooksBy(books, 'currentlyReading'),
          wantToRead = this.filterBooksBy(books, 'wantToRead'),
          read = this.filterBooksBy(books, 'read')

    return (
      <div className="app">
        <Route exact path='/' render={( { history }) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  key="currentlyReading"
                  category="Currently Reading"
                  books={currentlyReading}
                  onChangeShelf={this.updateBookShelf}
                />
                <BookShelf
                  key="wantToRead"
                  category="Want To Read"
                  books={wantToRead}
                  onChangeShelf={this.updateBookShelf}
                />
                <BookShelf
                  key="read"
                  category="Read"
                  books={read}
                  onChangeShelf={this.updateBookShelf}
                />
              </div>
            </div>
          </div>
        )} />
        <Route
          exact
          path="/search"
          render={() =>
            <SearchBooks
              myBooks={books}
              onChangeShelf={this.updateBookShelf}
            />}
        />
      </div>
    )
  }
}

export default BooksApp
